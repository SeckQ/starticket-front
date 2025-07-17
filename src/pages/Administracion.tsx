import {
    Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Cliente, Organizador, Evento, Asistencia } from "../types/types";
import { useNavigate } from "react-router-dom";
import {apiClientes, apiOrganizadores, apiEventos, apiAsistencias} from "../services/api.ts";

const Administracion = () => {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [organizadores, setOrganizadores] = useState<Organizador[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resClientes, resOrganizadores, resEventos, resAsistencias] = await Promise.all([
                    apiClientes.get(""),
                    apiOrganizadores.get(""),
                    apiEventos.get(""),
                    apiAsistencias.get(""),
                ]);
                setClientes(resClientes.data);
                setOrganizadores(resOrganizadores.data);
                setEventos(resEventos.data);
                setAsistencias(resAsistencias.data);
            } catch (err) {
                console.error("Error cargando datos de administración:", err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario?.nombre === "Administrador") {
            cargarDatos();
        }
    }, [usuario]);

    const handleEliminarOrganizador = async (organizadorId: number) => {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este organizador?");
        if (!confirmar) return;

        try {
            //await axios.delete(`${import.meta.env.VITE_API_ORGANIZADORES}/${organizadorId}`);
            await apiOrganizadores.delete(`/${organizadorId}`)
            setOrganizadores((prev) => prev.filter(o => o.organizadorId !== organizadorId));
            alert("Organizador eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar organizador:", err);
            alert("No se pudo eliminar el organizador");
        }
    };

    const handleEliminarCliente = async (clienteId: number) => {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (!confirmar) return;

        try {
            //await axios.delete(`${import.meta.env.VITE_API_CLIENTES}/${clienteId}`);
            await apiClientes.delete(`/${clienteId}`)
            setClientes((prev) => prev.filter(c => c.clienteId !== clienteId));
            alert("Cliente eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar cliente:", err);
            alert("No se pudo eliminar el cliente");
        }
    };

    const handleEliminarEvento = async (eventoId: number) => {
        const confirmar = confirm("¿Deseas eliminar este evento?");
        if (!confirmar) return;

        try {
            //await axios.delete(`${import.meta.env.VITE_API_EVENTOS}/${eventoId}`);
            await apiEventos.delete(`/${eventoId}`)
            setEventos((prev) => prev.filter(e => e.numeroEvento !== eventoId));
            alert("Evento eliminado correctamente");
        } catch (err) {
            console.error("Error al eliminar evento:", err);
            alert("No se pudo eliminar el evento");
        }
    };

    if (usuario?.rol !== "admin") {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    Acceso no autorizado.
                </Typography>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography>Cargando datos...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Panel de Administración</Typography>

            {/* CLIENTES */}
            <Box mt={4}>
                <Typography variant="h6">Clientes</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Identificación</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map(cliente => (
                                <TableRow key={cliente.clienteId}>
                                    <TableCell>{cliente.persona.nombre}</TableCell>
                                    <TableCell>{cliente.persona.identificacion}</TableCell>
                                    <TableCell>{cliente.persona.telefono}</TableCell>
                                    <TableCell>{cliente.estado}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/clientes/editar/${cliente.clienteId}`)}
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleEliminarCliente(cliente.clienteId)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* ORGANIZADORES */}
            <Box mt={4}>
                <Typography variant="h6">Organizadores</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {organizadores.map(org => (
                                <TableRow key={org.organizadorId}>
                                    <TableCell>{org.persona.nombre}</TableCell>
                                    <TableCell>{org.email}</TableCell>
                                    <TableCell>{org.persona.telefono}</TableCell>
                                    <TableCell>{org.estado}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{ mr: 1 }}
                                            onClick={() => navigate(`/organizadores/editar/${org.organizadorId}`)}
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleEliminarOrganizador(org.organizadorId)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box textAlign="right" mt={2}>
                    <Button variant="contained" color="primary" onClick={() => navigate("/registro-organizador")}>
                        Agregar nuevo organizador
                    </Button>
                </Box>
            </Box>

            {/* EVENTOS */}
            <Box mt={4}>
                <Typography variant="h6">Eventos</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventos.map(evento => (
                                <TableRow key={evento.numeroEvento}>
                                    <TableCell>{evento.nombre}</TableCell>
                                    <TableCell>{evento.tipoEvento}</TableCell>
                                    <TableCell>{evento.fecha}</TableCell>
                                    <TableCell>{evento.estado}</TableCell>
                                    <TableCell>
                                        <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => navigate(`/eventos/editar/${evento.numeroEvento}`)}>
                                            Actualizar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleEliminarEvento(evento.numeroEvento)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* ASISTENCIAS */}
            <Box mt={4}>
                <Typography variant="h6">Asistencias</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Evento</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {asistencias.map(a => (
                                <TableRow key={a.asistenciaId}>
                                    <TableCell>{a.cliente.persona.nombre}</TableCell>
                                    <TableCell>{a.evento.nombre}</TableCell>
                                    <TableCell>{a.fecha}</TableCell>
                                    <TableCell>{a.cantidadPersonas}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default Administracion;
