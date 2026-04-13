import React from "react";
import GalleryForm from "@/components/admin/GalleryForm";

export default function NewGalleryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Nova Categoria de Galeria</h1>
        <p className="text-slate-400 mt-1">Crie uma nova categoria e adicione seções de fotos para a galeria pública.</p>
      </div>

      <GalleryForm />
    </div>
  );
}
