import axios from "axios";

// Función para crear instancias de Axios con interceptor de JWT
function createApiInstance(baseURL: string) {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
}

// Instancias personalizadas para cada microservicio
export const apiClientes = createApiInstance(import.meta.env.VITE_API_CLIENTES);
export const apiEventos = createApiInstance(import.meta.env.VITE_API_EVENTOS);
export const apiOrganizadores = createApiInstance(import.meta.env.VITE_API_ORGANIZADORES);
export const apiAsistencias = createApiInstance(import.meta.env.VITE_API_ASISTENCIAS);
export const apiPersonas = createApiInstance(import.meta.env.VITE_API_PERSONAS);
export const apiAuth = createApiInstance(import.meta.env.VITE_API_AUTH);
