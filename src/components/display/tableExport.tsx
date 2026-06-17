import { Column } from "./CustomTableDisplay";

function resolveExportValue<T extends Record<string, any>>(
    row: T,
    col: Column<T>
): string | number {
    if (col.exportValue) return col.exportValue(row);

    if (typeof col.accessor === "function") {
        // accessor custom sans exportValue fourni : cellule vide à l'export
        return "";
    }

    const raw = row[col.accessor as keyof T];
    if (raw === null || raw === undefined) return "";
    if (typeof raw === "string" || typeof raw === "number") return raw;
    return String(raw);
}

function buildExportRows<T extends Record<string, any>>(
    data: T[],
    columns: Column<T>[]
): { headers: string[]; rows: (string | number)[][] } {
    const headers = columns.map((c) => c.header);
    const rows = data.map((row) => columns.map((col) => resolveExportValue(row, col)));
    return { headers, rows };
}

// ─────────────────────────────────────────────
// EXCEL (.xlsx)
// ─────────────────────────────────────────────

export async function exportToExcel<T extends Record<string, any>>(
    data: T[],
    columns: Column<T>[],
    fileName: string = "export"
) {
    const XLSX = await import("xlsx");
    const { headers, rows } = buildExportRows(data, columns);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // largeur de colonne approximative basée sur le header + contenu
    worksheet["!cols"] = headers.map((header, idx) => {
        const maxContentLength = Math.max(
            header.length,
            ...rows.map((r) => String(r[idx] ?? "").length)
        );
        return { wch: Math.min(Math.max(maxContentLength + 2, 10), 50) };
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// ─────────────────────────────────────────────
// PDF
// ─────────────────────────────────────────────

export async function exportToPdf<T extends Record<string, any>>(
    data: T[],
    columns: Column<T>[],
    fileName: string = "export",
    title?: string
) {
    const { default: jsPDF } = await import("jspdf");
    await import("jspdf-autotable");

    const { headers, rows } = buildExportRows(data, columns);

    const isLandscape = headers.length > 6;
    const doc = new jsPDF({ orientation: isLandscape ? "landscape" : "portrait" });

    if (title) {
        doc.setFontSize(14);
        doc.text(title, 14, 15);
    }

    // @ts-ignore — jspdf-autotable étend l'instance jsPDF au runtime
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: title ? 22 : 10,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [24, 95, 165], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [244, 247, 254] },
        margin: { left: 10, right: 10 },
    });

    doc.save(`${fileName}.pdf`);
}

// ─────────────────────────────────────────────
// WORD (.docx)
// ─────────────────────────────────────────────

export async function exportToWord<T extends Record<string, any>>(
    data: T[],
    columns: Column<T>[],
    fileName: string = "export",
    title?: string
) {
    const {
        Document,
        Packer,
        Table,
        TableRow,
        TableCell,
        Paragraph,
        TextRun,
        WidthType,
        HeadingLevel,
        AlignmentType,
    } = await import("docx");
    const { saveAs } = await import("file-saver");

    const { headers, rows } = buildExportRows(data, columns);

    const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map(
            (header) =>
                new TableCell({
                    width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
                    shading: { fill: "185FA5" },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({ text: header, bold: true, color: "FFFFFF" }),
                            ],
                        }),
                    ],
                })
        ),
    });

    const dataRows = rows.map(
        (row) =>
            new TableRow({
                children: row.map(
                    (cell) =>
                        new TableCell({
                            width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
                            children: [new Paragraph({ text: String(cell) })],
                        })
                ),
            })
    );

    const children: any[] = [];

    if (title) {
        children.push(
            new Paragraph({
                text: title,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.LEFT,
            })
        );
    }

    children.push(
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...dataRows],
        })
    );

    const doc = new Document({
        sections: [{ children }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${fileName}.docx`);
}

// ─────────────────────────────────────────────
// Dispatcher unique à brancher sur exportConfig.onExport
// ─────────────────────────────────────────────

export type ExportFormat = "excel" | "pdf" | "word";

export interface RunTableExportOptions<T extends Record<string, any>> {
    format: ExportFormat;
    data: T[];
    columns: Column<T>[];
    fileName?: string;
    title?: string;
}

export async function runTableExport<T extends Record<string, any>>({
    format,
    data,
    columns,
    fileName = "export",
    title,
}: RunTableExportOptions<T>) {
    if (format === "excel") return exportToExcel(data, columns, fileName);
    if (format === "pdf") return exportToPdf(data, columns, fileName, title);
    if (format === "word") return exportToWord(data, columns, fileName, title);
}