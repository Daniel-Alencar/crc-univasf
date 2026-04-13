"use client"

import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function FloatButton() {
  return (
    <Link href={"https://crc.univasf.edu.br/courses/"}>
      <div className="fixed bottom-3 right-3 z-50">
        <button
          type="button"
          className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-[#1565C0] active:scale-95 cursor-pointer"
        >
          <GraduationCap size={20} />
          <span className="font-semibold">Seja nosso aluno</span>
        </button>
      </div>
    </Link>
  )
}
