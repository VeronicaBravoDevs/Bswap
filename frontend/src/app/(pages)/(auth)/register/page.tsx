import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bswap - Registro',
  description: 'Registrate a Bswap y comienza a intercambiar tus libros en tu ciudad.', 
};

export default function Register() {
  return (
    <>
      <h2 className='font-semibold text-2xl border border-cyan-600 p-8 m-8 text-center'> FORMULARIO DE REGISTRO </h2>
    </>
  );
}
