'use client';

import * as React from 'react';
import { Upload, X, File, ImageIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

interface FileWithPreview extends File {
  preview?: string;
}

export function FileUpload({
  onFilesChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx'],
  className,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<
    Record<string, number>
  >({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/'))
      return <ImageIcon className='h-4 w-4' />;
    if (file.type === 'application/pdf')
      return <FileText className='h-4 w-4' />;
    return <File className='h-4 w-4' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }

    const isValidType = acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.includes('*')) {
        const baseType = type.split('/')[0];
        return file.type.startsWith(baseType);
      }
      return file.type === type;
    });

    if (!isValidType) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(
        ', '
      )}`;
    }

    return null;
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: FileWithPreview[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) {
        errors.push(`Chỉ được upload ${maxFiles} file`);
        return;
      }

      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      newFiles.push(fileWithPreview);
    });

    if (errors.length > 0) {
      // In a real app, you'd show these errors in a toast or alert
      toast.error(`Lỗi: ${errors}`);
      return;
    }

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateUpload(file.name);
      });
    }
  };

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
          });
        }, 1000);
      }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className='hidden'
          disabled={disabled}
        />

        <div className='flex flex-col items-center justify-center text-center'>
          <Upload className='h-10 w-10 text-muted-foreground mb-4' />
          <p className='text-sm font-medium mb-2'>
            Drop files here or click to browse
          </p>
          <p className='text-xs text-muted-foreground mb-4'>
            Maximum {maxFiles} files, up to {formatFileSize(maxSize)} each
          </p>
          <p className='text-xs text-muted-foreground'>
            Supported: {acceptedTypes.join(', ')}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className='mt-4 space-y-2'>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className='flex items-center gap-3 p-3 bg-muted/50 rounded-lg'
            >
              <div className='flex-shrink-0'>
                {file.preview ? (
                  <img
                    src={file.preview || '/placeholder.svg'}
                    alt={file.name}
                    className='h-10 w-10 object-cover rounded'
                  />
                ) : (
                  <div className='h-10 w-10 bg-muted rounded flex items-center justify-center'>
                    {getFileIcon(file)}
                  </div>
                )}
              </div>

              <div className='flex-1 max-w-[100px]'>
                <p className='text-sm font-medium truncate'>{file.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {formatFileSize(file.size)}
                </p>

                {uploadProgress[file.name] !== undefined && (
                  <div className='mt-2'>
                    <Progress
                      value={uploadProgress[file.name]}
                      className='h-1'
                    />
                    <p className='text-xs text-muted-foreground mt-1'>
                      {Math.round(uploadProgress[file.name])}% uploaded
                    </p>
                  </div>
                )}
              </div>

              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                disabled={disabled}
                className='flex-shrink-0'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
