import Link from "next/link";

export default function Header() {
  return (
    <header className="flex px-8 justify-between items-center bg-white text-black py-2">
      <Link href="/">
        <h1 className="">Logo</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/reviews">Mi Biblioteca</Link>
          </li>
          <li>
            <Link href="/exchange">Intercambios</Link>
          </li>
          <li>
            <Link href="/reviews">Reseñas</Link>
          </li>
          <li>
            <Link href="/community">Comunidad</Link>
          </li>
          <li className="px-4 py-1 rounded-xl bg-blue-600 text-white">
            <Link href="/login">Acceso</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
