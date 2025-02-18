
import { IconType } from 'react-icons';

export type NavLink = {
  href: string;
  label: string;
  icon?: IconType;
};

type NavigationLinksProps = {
  variant: 'header' | 'footer';/* para reusar el menu en header y footer */
  className?: string;
  linkClassName?: string;
  showIcons?: boolean;/* iconos solo en footer */
  links?: NavLink[];
};
/* enlaces externos redes sociales */
const isExternalLink = (href: string) => {
  return href.startsWith('http') || href.includes('instagram.com') || href.includes('whatsapp.com') || href.includes('telegram.org');
};

export const NavigationLinks = ({ 
  variant, 
  className, 
  linkClassName,
  showIcons = variant === 'footer',
  links = []
}: NavigationLinksProps) => {
  return (
    <nav className={className}>
      <ul className={variant === 'footer' ? 'grid grid-cols-2 gap-2' : ''}>
        {links.map((link) => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className={`${linkClassName} ${showIcons && isExternalLink(link.href) ? 'flex items-center gap-2' : ''}`}
              target={isExternalLink(link.href) ? "_blank" : "_self"}
              rel={isExternalLink(link.href) ? "noopener noreferrer" : ""}
            >
              {link.icon && showIcons && isExternalLink(link.href) && <link.icon className="text-lg" />}
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};