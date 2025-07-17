import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Divider,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
    apiClientes,
    apiOrganizadores,
    apiEventos,
} from "../services/api";
import type { Cliente, Organizador, Evento } from "../types/types";

const Perfil = () => {
    const { usuario } = useAuth();
    const [datosCliente, setDatosCliente] = useState<Cliente | null>(null);
    const [datosOrganizador, setDatosOrganizador] = useState<Organizador | null>(null);
    const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                if (!usuario || !usuario.token) return;
                console.log(usuario.rol);
                console.log(usuario.identificacion);
                console.log(usuario.token);
                if (usuario.rol === "cliente") {
                    const res = await apiClientes.get<Cliente>(`/identificacion/${usuario.identificacion}`);
                    setDatosCliente(res.data);
                } else if (usuario.rol === "organizador") {
                    const res = await apiOrganizadores.get<Organizador>(`/identificacion/${usuario.identificacion}`);
                    setDatosOrganizador(res.data);
                }
            } catch (err) {
                console.error("Error cargando perfil:", err);
            }
        };

        fetchPerfil();
    }, [usuario]);

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const res = await apiEventos.get<Evento[]>("");
                const todos = res.data;

                if (datosCliente) {
                    const eventosCliente = todos.filter(e =>
                        datosCliente.historialEventos.includes(e.numeroEvento.toString())
                    );
                    setEventosFiltrados(eventosCliente);
                } else if (datosOrganizador) {
                    const eventosOrganizador = todos.filter(e =>
                        e.organizador.organizadorId === datosOrganizador.organizadorId
                    );
                    setEventosFiltrados(eventosOrganizador);
                }
            } catch (err) {
                console.error("Error cargando eventos:", err);
            } finally {
                setLoading(false);
            }
        };

        if (datosCliente || datosOrganizador) {
            cargarEventos();
        }
    }, [datosCliente, datosOrganizador]);

    if (!usuario || !usuario.token) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    Debes iniciar sesión para acceder al perfil.
                </Typography>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography>Cargando perfil...</Typography>
            </Container>
        );
    }

    const persona = datosCliente?.persona || datosOrganizador?.persona;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Mi perfil
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {persona && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6">Datos personales</Typography>
                    <Typography>Nombre: {persona.nombre}</Typography>
                    <Typography>Identificación: {persona.identificacion}</Typography>
                    <Typography>Género: {persona.genero}</Typography>
                    <Typography>Edad: {persona.edad}</Typography>
                    <Typography>Teléfono: {persona.telefono}</Typography>
                    <Typography>Dirección: {persona.direccion}</Typography>
                </Box>
            )}

            {datosCliente && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6">Datos como Cliente</Typography>
                    <Typography>Categoría: {datosCliente.categoria}</Typography>
                    <Typography>Estado: {datosCliente.estado}</Typography>
                </Box>
            )}

            {datosOrganizador && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6">Datos como Organizador</Typography>
                    <Typography>Email: {datosOrganizador.email}</Typography>
                    <Typography>Estado: {datosOrganizador.estado}</Typography>
                    <Typography>Cantidad de asistentes: {datosOrganizador.cantidadAsistentes}</Typography>
                </Box>
            )}

            {eventosFiltrados.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        {usuario.rol === "cliente" ? "Historial de eventos" : "Eventos organizados"}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Cupos disponibles</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventosFiltrados.map((evento) => (
                                    <TableRow key={evento.numeroEvento}>
                                        <TableCell>{evento.nombre}</TableCell>
                                        <TableCell>{evento.tipoEvento}</TableCell>
                                        <TableCell>{evento.fecha}</TableCell>
                                        <TableCell>{evento.estado}</TableCell>
                                        <TableCell>{evento.cuposDisponibles}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {usuario.rol === "organizador" && (
                <Box mt={3} textAlign="right">
                    <Button variant="contained" color="primary" href="/eventos/nuevo">
                        Crear nuevo evento
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Perfil;
