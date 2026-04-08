// FilesListSection.tsx
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Download, Eye, Play, Pause, FileText, FileSpreadsheet, File, User } from 'lucide-react';
import { FileItem } from "../_hooks/useFilesHook";
import { FileViewer } from './FileItem';
import { Button } from '@/components/ui/button';

const FileAttachment = ({ file, onPreview }: { file: FileItem; onPreview?: (file: FileItem) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const getFileExtension = () => file.name.split('.').pop()?.toUpperCase() || '';

  // Images
  if (file.type.startsWith('image/')) {
    return (
      <div className="bg-vaLightGray/10 border shadow-sm rounded-xl overflow-hidden flex">
        <div>
          <div className="w-auto h-24 bg-vaPrimary/5 shadow-sm">
            <Image 
              src={file.url} 
              alt={file.name} 
              width={500}
              height={500}
              className="object-cover size-full" 
            />
          </div>      
        </div>
        <div className="px-4 py-2 space-y-1">
          <p className="font-medium text-sm truncate">{file.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-vaTextPrimary">{formatFileSize(file.size)}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-vaTextPrimary">{getFileExtension()}</span>
            {file.uploadedBy && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary flex items-center"> <User className='size-4 text-vaLightGray' /> {file.uploadedBy}</span></>}
            {file.uploadedAt && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary">{formatDate(file.uploadedAt)}</span></>}
          </div>
          <div className="flex gap-2">
            {onPreview && (
              <Button onClick={() => onPreview(file)} variant={"outline"} size={"sm"}>
                <Eye className="size-4 mr-2" /> Prévisualiser
              </Button>
            )}
            <Button onClick={handleDownload} variant={"outline"} size={"sm"}>
              <Download className="size-4 mr-2" /> Télécharger
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Audios
  if (file.type.startsWith('audio/')) {
    return (
      <div className="p-4 border bg-vaLightGray/10 shadow-sm rounded-xl">
        <div className="flex items-center gap-4">
          <Button onClick={handlePlayPause} className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 shadow-md" size={"icon"}>
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </Button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <span className="text-xs text-vaTextPrimary">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="relative h-1 bg-purple-200 rounded-full overflow-hidden">
              <div className="absolute h-full bg-purple-600 rounded-full" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }} />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-vaTextPrimary">{formatFileSize(file.size)}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-vaTextPrimary">{getFileExtension()}</span>
              {file.duration && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary">{file.duration}</span></>}
              {file.uploadedBy && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary flex items-center"> <User className='size-4 text-vaLightGray' /> {file.uploadedBy}</span></>}
              {file.uploadedAt && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary">{formatDate(file.uploadedAt)}</span></>}
            </div>
          </div>
          <div className="flex gap-2">
            {onPreview && (
              <Button onClick={() => onPreview(file)} variant={"outline"} size={"icon"}>
                <Eye className="size-4" />
              </Button>
            )}
            <Button onClick={handleDownload} variant={"outline"} size={"icon"}>
              <Download className="size-4" />
            </Button>
          </div>
        </div>
        <audio 
          ref={audioRef} 
          src={file.url} 
          onTimeUpdate={handleTimeUpdate} 
          onLoadedMetadata={handleLoadedMetadata} 
          onEnded={() => setIsPlaying(false)} 
          className="hidden" 
        />
      </div>
    );
  }

  // Documents (PDF, Word, Excel)
  const getDocIcon = () => {
    if (file.name.match(/\.(doc|docx)$/i)) return <FileText className="size-8 text-blue-600" />;
    if (file.name.match(/\.(xls|xlsx)$/i)) return <FileSpreadsheet className="size-8 text-green-600" />;
    return <FileText className="size-8 text-red-600" />;
  };

  const getDocType = () => {
    if (file.name.match(/\.(doc|docx)$/i)) return 'DOCX';
    if (file.name.match(/\.(xls|xlsx)$/i)) return 'XLSX';
    return 'PDF';
  };

  return (
    <div className="bg-vaLightGray/10 rounded-xl border p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-vaLightGray/20 rounded-xl">{getDocIcon()}</div>
        <div className="flex-1">
          <p className="font-medium text-sm truncate">{file.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-vaTextPrimary">{formatFileSize(file.size)}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-vaTextPrimary">{getDocType()}</span>
            {file.uploadedBy && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary flex items-center"> <User className='size-4 text-vaLightGray' /> {file.uploadedBy}</span></>}
            {file.uploadedAt && <><span className="text-xs text-gray-400">•</span><span className="text-xs text-vaTextPrimary">{formatDate(file.uploadedAt)}</span></>}
          </div>
        </div>
        <div className="flex gap-2">
          {onPreview && (
            <Button onClick={() => onPreview(file)} variant={"outline"} size={"sm"}>
              <Eye className='size-4 mr-2 ' /> Prévisualiser
            </Button>
          )}
          <Button onClick={handleDownload} variant={"outline"} size={"sm"}>
            <Download className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const FilesListSection = ({ files }: { files: FileItem[] }) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8 text-vaTextPrimary">
        Aucun fichier disponible
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {files.map((file, index) => (
          <FileAttachment 
            key={index} 
            file={file} 
            onPreview={setSelectedFile} 
          />
        ))}
      </div>
      
      {/* FileViewer pour la prévisualisation en grand écran */}
      <FileViewer 
        file={selectedFile} 
        isOpen={!!selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
    </>
  );
};