const URLMOCKDATA = "/mock/mockData.json";
// const URLGETBOOKS = "https://equipo-s21-05-m-webapp.onrender.com/books";

export const getBooks = async () => {
    try {
        const response = await fetch(URLMOCKDATA);
        if (!response.ok) throw new Error("No se cargan libros correctamente")
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener libros", error)
        return[];
    }
    };