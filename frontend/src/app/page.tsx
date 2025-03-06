import CardList from "@/shared/components/ui/card-list";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/bookgif.gif" width={500} height={500} alt="Fig de Personas Agarrando un libro" className="w-full" unoptimized/>
      <CardList />
    </>
  );
}
