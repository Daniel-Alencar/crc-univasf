"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  table: string;
  id: string;
}

export default function DeleteButton({ table, id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    setLoading(true);
    
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir item");
      setLoading(false);
      return;
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}
