import { LoginCredentials, User } from "../types/auth.types";

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await fetch("/mock/mockDataUser.json");
    if (!response.ok) throw new Error("Error al obtener datos del mock");
    
    const users = await response.json();
    const user = users.find((u: any) => u.email === credentials.email);
    if (!user) throw new Error("Usuario no encontrado");
    
    const token = generateMockJwt(user);
    localStorage.setItem("authToken", token);
    
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch {
    throw new Error("Error al iniciar sesión");
  }
};

const generateMockJwt = (user: any): string => {
  return btoa(JSON.stringify({ user, exp: Date.now() + 3600000 }));
};

// se debe modificar fetch a API_URL/login cuanto este endpoint
