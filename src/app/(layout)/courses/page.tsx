import React from "react";
import Link from "next/link";
import AosWrapper from "@/components/AosWrapper";
import BubbleParticles from "@/components/Particles/BubbleParticles";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, PlayCircle, Clock } from "lucide-react";

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      course_videos (count)
    `)
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <BubbleParticles />
      </div>

      <AosWrapper>
        <div className="container mx-auto px-6 py-8 relative z-10">
          {/* Header */}
          <div className="mb-10 text-center" data-aos="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Cursos do CRC UNIVASF
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Acesse gratuitamente nossos cursos em vídeo e desenvolva novas habilidades.
            </p>
          </div>

          {/* Courses Grid */}
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Link
                  href={`/courses/${course.id}`}
                  key={course.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-orange-400 to-yellow-400 overflow-hidden">
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen size={64} className="text-white opacity-70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <PlayCircle size={52} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    </div>
                    {course.category && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-200 line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400 border-t pt-3">
                      <div className="flex items-center gap-1">
                        <PlayCircle size={15} />
                        <span>
                          {course.course_videos?.[0]?.count ?? 0} vídeo(s)
                        </span>
                      </div>
                      {course.duration_hours && (
                        <div className="flex items-center gap-1">
                          <Clock size={15} />
                          <span>{course.duration_hours}h de conteúdo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow" data-aos="fade-up">
              <BookOpen size={64} className="mx-auto text-orange-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Nenhum curso disponível</h2>
              <p className="text-gray-500">Em breve novos cursos serão adicionados. Volte em breve!</p>
            </div>
          )}
        </div>
      </AosWrapper>
    </div>
  );
}
