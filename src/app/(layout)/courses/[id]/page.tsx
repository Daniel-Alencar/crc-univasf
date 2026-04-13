import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      course_videos (
        id,
        title,
        description,
        youtube_video_id,
        duration_minutes,
        display_order
      )
    `)
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!course) notFound();

  // Sort videos by display_order
  course.course_videos = (course.course_videos ?? []).sort(
    (a: { display_order: number }, b: { display_order: number }) =>
      a.display_order - b.display_order
  );

  return <CourseDetailClient course={course} />;
}
