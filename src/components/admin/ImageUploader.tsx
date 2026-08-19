"use client";

import React, { useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ImagePlus, Loader2, RefreshCw, Trash2 } from "lucide-react";

import {
  IMAGE_ACCEPT_ATTR,
  MAX_IMAGE_SIZE_MB,
  MediaFolder,
  removeImage,
  uploadImage,
} from "@/lib/supabase/storage";

export function createUploaderClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Id usado como subpasta no bucket. Em edição é o id da própria entidade; em
 * criação, um id de rascunho estável enquanto o formulário estiver aberto.
 */
export function useMediaFolderId(entityId?: string) {
  const [draftId] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `draft-${Date.now()}`
  );

  return entityId ?? draftId;
}

interface ImageUploaderProps {
  label: string;
  folder: MediaFolder;
  entityId: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  aspect?: "square" | "video";
}

export default function ImageUploader({
  label,
  folder,
  entityId,
  value,
  onChange,
  hint,
  aspect = "video",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Só apagamos do storage o que foi enviado nesta sessão: um arquivo já salvo
  // no banco pode continuar sendo usado se o usuário desistir do formulário.
  const sessionUploads = useRef<Set<string>>(new Set());
  const supabase = createUploaderClient();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(supabase, { folder, entityId, file });
      const previous = value;

      onChange(url);
      sessionUploads.current.add(url);

      if (previous && sessionUploads.current.has(previous)) {
        sessionUploads.current.delete(previous);
        await removeImage(supabase, previous);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    const current = value;
    onChange("");

    if (current && sessionUploads.current.has(current)) {
      sessionUploads.current.delete(current);
      await removeImage(supabase, current);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT_ATTR}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={value}
            alt="Pré-visualização"
            className={`${
              aspect === "square" ? "w-32 h-32" : "w-48 h-28"
            } object-cover rounded-lg border border-slate-600 bg-slate-900`}
          />
          <div className="flex flex-col gap-2 justify-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              <span>{uploading ? "Enviando..." : "Trocar imagem"}</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 disabled:opacity-50 text-sm rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              <span>Remover</span>
            </button>
          </div>
        </div>
      ) : (
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
            handleFile(e.dataTransfer.files?.[0]);
          }}
          disabled={uploading}
          className={`w-full flex flex-col items-center justify-center gap-2 px-4 py-8 border border-dashed rounded-lg transition-colors ${
            dragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-600 bg-slate-700/30 hover:bg-slate-700/50"
          }`}
        >
          {uploading ? (
            <Loader2 size={24} className="text-blue-400 animate-spin" />
          ) : (
            <ImagePlus size={24} className="text-slate-400" />
          )}
          <span className="text-sm text-slate-300">
            {uploading ? "Enviando..." : "Clique ou arraste uma imagem"}
          </span>
          <span className="text-xs text-slate-500">
            JPG, PNG, WEBP, GIF ou AVIF — até {MAX_IMAGE_SIZE_MB} MB
          </span>
        </button>
      )}

      {hint && !error && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
