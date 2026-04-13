import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CourseEditForm from "./CourseEditForm";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Curso</h1>
      <CourseEditForm course={course} />
    </div>
  );
}
