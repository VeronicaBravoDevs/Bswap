import { Book } from "@/app/interface/book"

interface ExchangeModalProps {
    book : Book ;
    onClose : () => void;
}



export default function  ExchangeModal ( {book, onClose } : ExchangeModalProps ) {
    const handleSendEmail = () => {
        alert(`Correo enviado a ${book.userId}`);
        onClose();         
    };

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Solicitud de intercambio</h2>
                <p className="mb-6">¿Deseas solicitar el intercambio del libro <strong>{book.title}</strong>?</p>
                
                <div className="mt-4 flex gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSendEmail}>Enviar Solicitd</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
                </div>

            </div>

        </div>
    );
}