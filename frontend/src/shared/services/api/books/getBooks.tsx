const URLMOCKDATA = './mockData.json';
// const URLGETBOOKS = "https://equipo-s21-05-m-webapp.onrender.com/books";

export const getBooks = async () => {
    try {
        const response = await fetch(URLMOCKDATA);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};