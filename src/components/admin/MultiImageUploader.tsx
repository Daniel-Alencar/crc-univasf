"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

import {
  IMAGE_ACCEPT_ATTR,
  MAX_IMAGE_SIZE_MB,
  MediaFolder,
  removeImage,
  uploadImage,
} from "@/lib/supabase/storage";
import { createUploaderClient } from "./ImageUploader";

interface MultiImageUploaderProps {
  folder: MediaFolder;
  entityId: string;
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  compact?: boolean;
}

export default function MultiImageUploader({
  folder,
  entityId,
  value,
  onChange,
  label,
  compact = false,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ver comentário em ImageUploader: só limpamos o que subiu nesta sessão.
  const sessionUploads = useRef<Set<string>>(new Set());
  const supabase = createUploaderClient();

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setProgress({ done: 0, total: files.length });

    const uploaded: string[] = [];
    const failures: string[] = [];

    for (const file of files) {
      try {
        const url = await uploadImage(supabase, { folder, entityId, file });
        uploaded.push(url);
        sessionUploads.current.add(url);
      } catch (err) {
        failures.push(`${file.name}: ${err instanceof Error ? err.message : "falhou"}`);
      } finally {
        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }
    }

    if (uploaded.length > 0) onChange([...value, ...uploaded]);
    if (failures.length > 0) setError(failures.join(" | "));

    setUploading(false);
    setProgress({ done: 0, total: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = async (index: number) => {
    const url = value[index];
    onChange(value.filter((_, i) => i !== index));

    if (sessionUploads.current.has(url)) {
      sessionUploads.current.delete(url);
      await removeImage(supabase, url);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT_ATTR}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        disabled={uploading}
        className={`w-full flex flex-col items-center justify-center gap-1 border border-dashed rounded-lg transition-colors ${
          compact ? "px-4 py-4" : "px-4 py-8"
        } ${
          dragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-slate-600 bg-slate-700/30 hover:bg-slate-700/50"
        }`}
      >
        {uploading ? (
          <Loader2 size={compact ? 18 : 24} className="text-blue-400 animate-spin" />
        ) : (
          <ImagePlus size={compact ? 18 : 24} className="text-slate-400" />
        )}
        <span className="text-sm text-slate-300">
          {uploading
            ? `Enviando ${progress.done}/${progress.total}...`
            : "Clique ou arraste imagens (pode selecionar várias)"}
        </span>
        {!compact && (
          <span className="text-xs text-slate-500">
            JPG, PNG, WEBP, GIF ou AVIF — até {MAX_IMAGE_SIZE_MB} MB cada
          </span>
        )}
      </button>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      {value.length > 0 && (
        <div
          className={`mt-4 grid gap-3 ${
            compact
              ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          }`}
        >
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group aspect-square">
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border border-slate-700"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
