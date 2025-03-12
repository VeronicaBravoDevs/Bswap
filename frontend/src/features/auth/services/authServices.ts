import { LoginCredentials, User } from "../types/auth.types";

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
  //  const response = await fetch("/mock/mockDataUser.json");
  // se debe modificar fetch a API_URL/login cuanto este endpoint

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });


    //if (!response.ok) throw new Error("Error al obtener datos del mock");

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error al iniciar sesion");
    }
    
    //const users = await response.json();
    const data = await response.json();

    localStorage.setItem("authToken", data.token);

    return data.user;
  } catch(error) {
    console.error("Error al loguear", error);
    throw new Error("Error al iniciar sesion")
  } };

 //   const userSearch = users.find((u: any) => u.email === credentials.email);
 //   if (!userSearch) throw new Error("Usuario no encontrado");
    
    //const token = generateMockJwt(user);
   // const { token, ...user } = await response.json();
   
    
    //const { password_hash, ...userWithoutPassword } = user;
    //return userWithoutPassword;
   // return user; 
  //} catch {
   // throw new Error("Error al iniciar sesión");  }};

//const generateMockJwt = (user: any): string => {
//  return btoa(JSON.stringify({ user, exp: Date.now() + 3600000 }));
//};



export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("authToken");
      }
      throw new Error("Usuario no autenticado");
    }

    return await response.json();
  } catch (error){
    console.error("Error al obtener el usuario actual", error);
    return null;
  }
};

//Nuevo usuario
export const registerUser = async (userData: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error al registrar usuario");
    }
    
    const data = await response.json();
    
    
    localStorage.setItem("authToken", data.token);
    
    return data.user;
  } catch (error) {
    console.error("Error en registro:", error);
    throw new Error("Error al registrar usuario");
  }
};

