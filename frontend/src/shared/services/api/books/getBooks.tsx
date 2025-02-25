export const getBooks = async () => {
  try {
    const res = await fetch("https://equipo-s21-05-m-webapp.onrender.com/books");

    if (!res.ok) {
      throw new Error(`Error fetching books: ${res.status} ${res.statusText}`);
    }

    const { data } = await res.json();

    console.log("✅ ~ getBooks ~ data:", data);

    return data ?? [];
  } catch (error) {
    console.error("❌ ~ getBooks ~ error:", error);
    return [];
  }
};
