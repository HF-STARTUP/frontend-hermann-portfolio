import React, { useState } from 'react';
import Image from 'next/image';
import { FileText, Image as ImageIcon, Music, Video, File, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FileItem {
  name: string;
  url: string;
  type: string;
  size?: number;
  duration?: string;
}

interface FilePreviewProps {
  files: FileItem[];
  initialIndex?: number;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ files, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentFile = files[currentIndex];

  const renderPreview = () => {
    if (currentFile.type.startsWith('image/')) {
      return (
        <div className="relative flex items-center justify-center bg-black rounded-lg overflow-auto min-h-[400px]">
          <Image
            src={currentFile.url}
            alt={currentFile.name}
            width={800}
            height={600}
            className="max-w-full h-auto object-contain"
            style={{ width: 'auto', height: 'auto' }}
            unoptimized={currentFile.url.startsWith('http') || currentFile.url.startsWith('blob:')}
          />
        </div>
      );
    }

    if (currentFile.type.startsWith('video/')) {
      return (
        <video controls className="w-full rounded-lg" controlsList="nodownload">
          <source src={currentFile.url} type={currentFile.type} />
        </video>
      );
    }

    if (currentFile.type.startsWith('audio/')) {
      return (
        <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
            <Music className="size-12 text-purple-600" />
          </div>
          <p className="text-lg font-semibold">{currentFile.name}</p>
          <audio controls className="w-full">
            <source src={currentFile.url} type={currentFile.type} />
          </audio>
        </div>
      );
    }

    if (currentFile.type === 'application/pdf') {
      return (
        <iframe src={`${currentFile.url}#toolbar=0`} className="w-full h-[70vh] rounded-lg" title={currentFile.name} />
      );
    }

    return (
      <div className="flex flex-col items-center gap-6 p-12 bg-gray-50 rounded-lg">
        <File className="size-16 text-gray-400" />
        <p className="text-center text-gray-600">Aperçu non disponible</p>
        <a href={currentFile.url} download className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <Download className="size-4" /> Télécharger
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <FileText className="size-5" />
            <div>
              <p className="font-semibold truncate max-w-md">{currentFile.name}</p>
              <p className="text-xs text-gray-500">
                {currentIndex + 1} / {files.length}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {renderPreview()}
        </div>

        {/* Navigation */}
        {files.length > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <button
              onClick={() => setCurrentIndex(prev => prev - 1)}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="size-4" /> Précédent
            </button>
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              disabled={currentIndex === files.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
            >
              Suivant <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;