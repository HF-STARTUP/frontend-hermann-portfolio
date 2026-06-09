export async function downloadFileFromUrl(
  url: string,
  filename: string,
): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Échec du téléchargement");
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    const link = window.document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }
}
