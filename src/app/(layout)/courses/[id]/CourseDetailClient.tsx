"use client";

import React, { useState } from "react";
import { PlayCircle, ChevronRight, BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CourseVideo {
  id: string;
  title: string;
  description: string | null;
  youtube_video_id: string;
  duration_minutes: number | null;
  display_order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  category: string | null;
  duration_hours: number | null;
  course_videos: CourseVideo[];
}

export default function CourseDetailClient({ course }: { course: Course }) {
  const videos = course.course_videos ?? [];
  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(
    videos.length > 0 ? videos[0] : null
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="bg-white border-b px-6 py-3">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar para Cursos
        </Link>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Course title */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            {course.category && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {course.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2 text-base max-w-3xl">{course.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <span className="flex items-center gap-1"><PlayCircle size={15} /> {videos.length} vídeo(s)</span>
            {course.duration_hours && (
              <span className="flex items-center gap-1"><Clock size={15} /> {course.duration_hours}h de conteúdo</span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video player */}
          <div className="flex-1">
            {activeVideo ? (
              <div>
                <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-black" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    key={activeVideo.id}
                    src={`https://www.youtube.com/embed/${activeVideo.youtube_video_id}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="mt-4 bg-white rounded-xl p-5 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{activeVideo.title}</h2>
                  {activeVideo.description && (
                    <p className="text-gray-500 text-sm mt-2">{activeVideo.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow h-80 text-gray-400">
                <BookOpen size={56} className="mb-4 text-orange-200" />
                <p className="text-lg font-medium">Nenhum vídeo disponível para este curso.</p>
              </div>
            )}
          </div>

          {/* Playlist sidebar */}
          {videos.length > 0 && (
            <aside className="w-full lg:w-80 xl:w-96 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-400 px-5 py-4">
                  <h3 className="text-white font-bold text-lg">
                    Aulas do Curso
                  </h3>
                  <p className="text-white/80 text-sm">{videos.length} vídeo(s)</p>
                </div>
                <ul className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                  {videos.map((video, index) => {
                    const isActive = activeVideo?.id === video.id;
                    return (
                      <li key={video.id}>
                        <button
                          onClick={() => setActiveVideo(video)}
                          className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-150 ${
                            isActive
                              ? "bg-orange-50 border-l-4 border-orange-500"
                              : "hover:bg-gray-50 border-l-4 border-transparent"
                          }`}
                        >
                          <span
                            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                              isActive
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {isActive ? (
                              <PlayCircle size={14} />
                            ) : (
                              index + 1
                            )}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-semibold leading-snug ${
                                isActive ? "text-orange-600" : "text-gray-700"
                              }`}
                            >
                              {video.title}
                            </p>
                            {video.duration_minutes && (
                              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <Clock size={11} />
                                {video.duration_minutes} min
                              </p>
                            )}
                          </div>
                          {!isActive && (
                            <ChevronRight size={16} className="shrink-0 text-gray-300 mt-0.5" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
