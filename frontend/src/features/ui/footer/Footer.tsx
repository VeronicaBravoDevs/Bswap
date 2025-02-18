import { NavigationLinks } from '@/shared/navigation/NavigationLinks';
import { TiSocialInstagram } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";


const footerNavLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/mylibrary', label: 'Mi Biblioteca' },
  { href: '/community', label: 'Comunidad' },
  { href: '/exchange', label: 'Intercambios' },
  { href: '/reviews', label: 'Reseñas' },
  { href: 'https://instagram.com/bswap', label: 'Instagram', icon: TiSocialInstagram },
  { href: 'https://whatsapp.com/+541150502020', label: 'WhatsApp', icon: FaWhatsapp },
  { href: 'https://telegram.com/bswap', label: 'Telegram', icon: RiTelegram2Fill },
];

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-sky-500/90 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Navegación</h3>
            <NavigationLinks 
              variant="footer" 
              linkClassName="text-gray-300 hover:text-white transition-colors block py-1"
              showIcons={true}
              links={footerNavLinks}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}