import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, FileSpreadsheet, X, Download, File } from 'lucide-react';
import Image from 'next/image';
import { FileItem } from '../_hooks/useFilesHook';
import { DialogMainBody } from '@/components/display/DialogMainBody';

interface FileViewerProps {
    file: FileItem | null;
    isOpen: boolean;
    onClose: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, isOpen, onClose }) => {
    if (!file) return null;

    const renderOfficePreview = () => {
        const isWord = file.type.includes('word') || file.name.match(/\.(doc|docx)$/i);
        const isExcel = file.type.includes('sheet') || file.name.match(/\.(xls|xlsx)$/i);

        // Utilisation de Google Docs Viewer pour Word et Excel
        const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(file.url)}&embedded=true`;

        return (
            <iframe
                src={googleDocsUrl}
                className="w-full h-[80vh] rounded-lg"
                title={file.name}
            />
        );
    };

    const renderPreview = () => {
        if (file.type.startsWith('image/')) {
            return (
                <div className="relative flex items-center justify-center bg-black/5 rounded-lg overflow-auto min-h-[400px]">
                    <Image
                        src={file.url}
                        alt={file.name}
                        width={800}
                        height={600}
                        className="object-contain"
                    />
                </div>
            );
        }

        if (file.type === 'application/pdf') {
            return (
                <iframe
                    src={`${file.url}#toolbar=0`}
                    className="w-full h-[70vh] rounded-lg"
                    title={file.name}
                />
            );
        }

        if (file.type.includes('word') || file.type.includes('excel') ||
            file.name.match(/\.(doc|docx|xls|xlsx)$/i)) {
            return renderOfficePreview();
        }

        return (
            <div className="flex flex-col items-center gap-6 p-12 bg-gray-50 rounded-lg">
                {file.type.includes('word') ? <FileText className="size-16 text-blue-600" /> :
                    file.type.includes('excel') ? <FileSpreadsheet className="size-16 text-green-600" /> :
                        <File className="size-16 text-gray-400" />}
                <p className="text-center text-gray-600">Aperçu non disponible</p>
                <a href={file.url} download className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    <Download className="size-4" /> Télécharger
                </a>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        {file.type.includes('word') ? <FileText className="size-5 text-blue-600" /> :
                            file.type.includes('excel') ? <FileSpreadsheet className="size-5 text-green-600" /> :
                                <FileText className="size-5" />}
                        <div>
                            <DialogTitle>{file.name}</DialogTitle>
                            <p className="text-xs text-gray-500">{file.uploadedBy && `Par ${file.uploadedBy}`}</p>
                        </div>
                    </div>                  
                </DialogHeader>
                <DialogMainBody className='max-h-[95dvh]'>
                    {renderPreview()}
                </DialogMainBody>
            </DialogContent>
        </Dialog>
    );
};

export { FileViewer };