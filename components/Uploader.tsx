

import React, { useState, useRef, useCallback } from 'react';
import type { UploadedFile } from '../types';

interface UploaderProps {
  onFileSelect: (file: UploadedFile | null) => void;
  disabled?: boolean;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // remove the `data:mimeType;base64,` prefix
        resolve(result.split(',')[1]); 
    };
    reader.onerror = (error) => reject(error);
  });


export const Uploader: React.FC<UploaderProps> = ({ onFileSelect, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
        onFileSelect(null);
        setPreview(null);
        return;
    };

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please upload a JPG or PNG file.');
        onFileSelect(null);
        setPreview(null);
        return;
    }

    setError(null);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
        const base64 = await fileToBase64(file);
        onFileSelect({ file, preview: previewUrl, base64, mimeType: file.type });
    } catch (err) {
        setError('Could not process the image. Please try another one.');
        onFileSelect(null);
        setPreview(null);
    }

  }, [onFileSelect]);

  const handleAreaClick = () => {
    if (!disabled) {
        fileInputRef.current?.click();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Step 1: Upload Your Tattoo</label>
      <div
        onClick={handleAreaClick}
        className={`relative group flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg transition-colors ${disabled ? 'cursor-not-allowed bg-white/5' : 'cursor-pointer bg-brand-secondary/50 border-gray-600 hover:border-brand-accent'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png"
          className="hidden"
          disabled={disabled}
        />
        {preview ? (
          <img src={preview} alt="Tattoo preview" className="object-contain h-full w-full rounded-md" />
        ) : (
          <div className="text-center text-gray-400">
            <p>Click to upload</p>
            <p className="text-xs">JPG or PNG</p>
          </div>
        )}
        {!disabled && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <span className="text-white font-semibold">{preview ? 'Change Photo' : 'Select Photo'}</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};