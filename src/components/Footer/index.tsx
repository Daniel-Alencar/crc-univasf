import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#112C4D] text-white py-2 h-14 flex justify-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-6 text-sm">
          <span>Patrocinador 1</span>
          <span>Patrocinador 2</span>
          <span>Patrocinador 3</span>
          <span>Patrocinador 4</span>
        </div>
        <div className="flex gap-4 text-xl">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-gray-300" />
          </a>
          <a href="mailto:email@example.com" target="_blank" rel="noopener noreferrer">
            <SiGmail className="hover:text-gray-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
