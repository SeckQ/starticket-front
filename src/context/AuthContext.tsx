import { createContext, useState, useContext, type ReactNode } from "react";

interface Usuario {
    nombre: string;
    identificacion: string;
    rol: string;
    token: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (usuario: Usuario) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const token = localStorage.getItem("token");
        const nombre = localStorage.getItem("nombre");
        const rol = localStorage.getItem("rol");
        const identificacion = localStorage.getItem("identificacion");

        if (token && nombre && rol && identificacion) {
            return { token, nombre, rol, identificacion };
        }
        return null;
    });

    const login = (usuario: Usuario) => {
        setUsuario(usuario);
        localStorage.setItem("token", usuario.token);
        localStorage.setItem("rol", usuario.rol);
        localStorage.setItem("nombre", usuario.nombre);
        localStorage.setItem("identificacion", usuario.identificacion);

    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("nombre");
        localStorage.removeItem("identificacion");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};
