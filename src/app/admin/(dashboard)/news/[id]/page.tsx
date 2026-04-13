import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (id === "new") {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Nova Notícia</h1>
        <NewsForm />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!news) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Notícia</h1>
      <NewsForm initialData={news} />
    </div>
  );
}
