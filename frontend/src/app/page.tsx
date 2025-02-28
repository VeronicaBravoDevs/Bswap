import CardList from "@/shared/components/ui/card-list";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/bookgif.gif" width={500} height={500} alt="Fig de Personas Agarrando un libro" className="w-full" />

      <CardList />

      <h2 className="text-2xl font-bold bg-red-100">Welcome to Bswap</h2>
    </>
  );
}
