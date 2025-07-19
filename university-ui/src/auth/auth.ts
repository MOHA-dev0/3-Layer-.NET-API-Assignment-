import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

interface DecodedToken {
  exp: number;
  id: number;
  userName: string;
  email: string;
  role: string;
  [key: string]: any;
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
};

export const getUserInfo = (): {
  id: number;
  userName: string;
  email: string;
  role: string;
} | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decoded);
    const { id, userName, email, role } = decoded;
    return { id, userName, email, role };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
