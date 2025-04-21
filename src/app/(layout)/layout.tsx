
import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/public/assets/logo.png';
import Footer from '@/components/Footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center text-2xl font-bold">
            <Image src={Logo} alt='crc univasf'/>
          </div>
        </div>
        
        <nav className="
          bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-3 shadow-lg"
        >
          <ul className="flex justify-center space-x-8 text-white font-semibold">
            <li>
              <Link href="/" className="text-blue-300 hover:text-blue-500">
                Início
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gray-200">
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-200">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/staff" className="hover:text-gray-200">
                Equipe CRC
              </Link>
            </li>
            <li>
              <Link href="/galery" className="hover:text-gray-200">
                Galeria
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Informações de contato
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {children}

      <Footer />
    </>
  );
}
