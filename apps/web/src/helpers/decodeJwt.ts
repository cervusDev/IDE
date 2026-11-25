
export interface IUserDecode {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
}

export const decodeJwt = (token: string): IUserDecode | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    
    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.id || decoded.sub,
      name: decoded.name,
      email: decoded.email,
      is_active: decoded.is_active ?? decoded.isActive ?? true,
    };
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
};