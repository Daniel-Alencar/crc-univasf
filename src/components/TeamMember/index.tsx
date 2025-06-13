import Image from "next/image"
import { FaLinkedin } from "react-icons/fa"
import { SiGmail } from "react-icons/si"

import Lattes from '@/public/assets/logo lattes.png'

interface TeamMemberProps {
  name: string
  occupation: string
  projectRole: string | undefined
  linkedinUrl: string | undefined
  emailUrl: string
  lattesUrl: string | undefined
  imageUrl: string
}

export default function TeamMember({
  name,
  occupation,
  projectRole,
  linkedinUrl,
  emailUrl,
  imageUrl,
  lattesUrl
}: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
      <div className="flex items-start space-x-4">
        <div className="">
        <Image
          src={imageUrl || "/placeholder.svg?height=80&width=80"}
          alt={`Foto de ${name}`}
          width={100}
          height={100}
          className="w-[100px] h-[140px] rounded-lg object-cover"
        />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>

          <p className="text-sm text-gray-700 mb-1">{occupation}</p>

          <p className="text-sm text-blue-600 mb-3">{projectRole}</p>

          <div className="flex space-x-2">
            <a
              href={emailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label={`Email de ${name}`}
            >
              <SiGmail size={20} />
            </a>

            {
              linkedinUrl &&
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={`LinkedIn de ${name}`}
              >
                <FaLinkedin size={20} />
              </a>
            }

            {
              lattesUrl &&
              <a
                href={lattesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-red-500 hover:text-red-700 transition-colors
                    flex justify-center items-center
                "
                aria-label={`Lattes de ${name}`}
              >
                <Image alt="Lattes logo" src={Lattes} width={14} />
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
