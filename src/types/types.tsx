// Persona
export interface Persona {
    identificacion: string;
    nombre: string;
    genero: string;
    edad: number;
    direccion: string;
    telefono: string;
}

// Cliente
export interface Cliente {
    clienteId: number;
    categoria: string;
    estado: string;
    historialEventos: string[];
    persona: Persona;
}

// Organizador
export interface Organizador {
    organizadorId: number;
    email: string;
    cantidadAsistentes: number;
    estado: string;
    persona: Persona;
}

// Evento
export interface Evento {
    numeroEvento: number;
    nombre: string;
    tipoEvento: string;
    fecha: string; // formato ISO: YYYY-MM-DD
    cantidadMaximaAsistentes: number;
    cuposDisponibles: number;
    estado: string;
    organizador: Organizador;
}

// Asistencia
export interface Asistencia {
    asistenciaId: number;
    fecha: string; // formato ISO: YYYY-MM-DD
    cantidadPersonas: number;
    totalAsistencias: number;
    cuposDisponibles: number;
    cliente: Cliente;
    evento: Evento;
}