import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import VideoEditForm from "./VideoEditForm";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string; videoId: string }>;
}) {
  const { id: courseId, videoId } = await params;
  const supabase = await createClient();

  const { data: video } = await supabase
    .from("course_videos")
    .select("*")
    .eq("id", videoId)
    .single();

  if (!video) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Vídeo</h1>
      <VideoEditForm video={video} courseId={courseId} />
    </div>
  );
}
