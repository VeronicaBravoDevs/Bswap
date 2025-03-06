import { User } from "@/app/interface/user";
 

const getUsers = async () : Promise<User[]> => {
    try { const res = await fetch("https://equipo-s21-05-m-webapp.onrender.com/users")
        if (!res.ok) 
            { throw new Error (`Error fetching users: ${res.status} ${res.statusText}`) }
        const {data} = await res.json();
        console.log("✅ ~ getUser ~ data:", data);
        return data ?? [];
    } catch(error) {
        console.error("❌ ~ getUsers ~ error:", error);
        return[]
    }
}

const getUsersById = async (userId: string)  => {
    try { const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/users/${userId}`)
        if (!res.ok) 
            { throw new Error (`Error fetching users: ${res.status} ${res.statusText}`) }
        const {data} = await res.json();
        console.log("✅ ~ getUserById ~ data:", data);
        return data ?? [];
    } catch(error) {
        console.error("❌ ~ getUsersByid ~ error:", error);
        return[]
    }
}

const setUser = async (user : User)  => {
    try { 
        const res = await fetch("https://equipo-s21-05-m-webapp.onrender.com/users",
        {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(user),}
     );
        const response = await res.json();
        console.log("✅ ~ setUser ~ response:", response);

        return response;

    } catch(error) {
        console.error("❌ ~ setUser ~ error:", error);
        return null;
    }
}

const deleteUser = async (userId: string) => {
    try{
        const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/users/${userId}`, { method: "DELETE",  });
    const response = await res.json();
    console.log("✅ ~ deleteUser ~ response:", response);
    return response;
    }catch(error) {
      console.error("❌ ~ deleteUser ~ error:", error);
      return null; } }

  const updateUser = async (user: User) => {
    try{
        const res = await fetch(`https://equipo-s21-05-m-webapp.onrender.com/users/${user.id}`,  { method: "PUT", headers: {"Content-Type": "application/json",},
      body: JSON.stringify(user),
    });
    const response = await res.json(); 
    console.log("✅ ~ updateUser ~ response:", response);
    return response;
    }catch(error) {console.error("❌ ~ updateUser ~ error:", error);
    return null; } };

    export const userServices = {
        getUsers,
        getUsersById,
        setUser,
        deleteUser,
        updateUser
      };