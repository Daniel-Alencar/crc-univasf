import CourseImage from '@/public/assets/rapid_access/courses.png';
import FormationImage from '@/public/assets/rapid_access/formations.png';
import NewsImage from '@/public/assets/rapid_access/news.png';
import ContactImage from '@/public/assets/rapid_access/Contact.png';
import DigitalPointImage from '@/public/assets/rapid_access/DigitalPoint.png';
import MakerColonyImage from '@/public/assets/rapid_access/MakerColony.png';

export const rapidAccessMenu = [
  {
    name: "Cursos",
    image: CourseImage,
    link: "https://crc.univasf.edu.br/courses/"
  },
  {
    name: "Colônia Maker",
    image: MakerColonyImage,
    link: "#"
  },
  {
    name: "Notícias",
    image: NewsImage,
    link: "http://localhost:3000/news"// mudar pro padrão depois quando estiver pronto
  },
  {
    name: "Formaturas",
    image: FormationImage,
    link: "#"
  },
  {
    name: "Ponto digital",
    image: DigitalPointImage,
    link: "#"
  },
  {
    name: "Contato",
    image: ContactImage,
    link: "mailto:crc@univasf.edu.br"
  },
];