import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Modal,
    TextField,
    Box,
    Button
} from "@mui/material";
import type {Evento} from "../types/types";
import Grid from "@mui/material/GridLegacy";
import { useAuth } from "../context/AuthContext";
import {apiAsistencias, apiClientes, apiEventos} from "../services/api.ts";


const EventoDetalle = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState(true);
    const fechaEvento = evento?.fecha || "";
    const { usuario } = useAuth();
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [clienteId, setClienteId] = useState<number | null>(null);

    useEffect(() => {
        const obtenerClienteId = async () => {
            if (usuario?.identificacion) {
                try {
                    //const res = await axios.get(`${import.meta.env.VITE_API_CLIENTES}/identificacion/${usuario.identificacion}`);
                    const res = await apiClientes.get(`/identificacion/${usuario.identificacion}`);
                    setClienteId(res.data.clienteId);
                } catch (err) {
                    console.warn("No se pudo obtener clienteId:", err);
                }
            }
        };

        obtenerClienteId();
    }, [usuario]);


    useEffect(() => {
        //axios
        apiEventos
            .get(`/${id}`)
            .then((res) => setEvento(res.data))
            .catch((err) => console.error("Error al cargar detalle:", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }
    const registrarAsistencia = async () => {
        if (!evento) return;
        try {
            const body = {
                fecha: fechaEvento,
                clienteId,
                eventoId: evento.numeroEvento,
                cantidadPersonas: cantidadPersonas,
            };

            //await axios.post(`${import.meta.env.VITE_API_ASISTENCIAS}`, body);
            await apiAsistencias.post("", body);
            alert("Asistencia registrada correctamente");
            setModalAbierto(false);
        } catch (err) {
            console.error("Error al registrar asistencia", err);
            alert("No se pudo registrar la asistencia");
        }
    };


    if (!evento) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    No se pudo cargar el evento.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Detalle del Evento
            </Typography>

            <Grid container spacing={4}>
                {/* Columna izquierda - info */}
                <Grid item xs={12} md={7}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h5">{evento.nombre}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Tipo:</Typography> {evento.tipoEvento}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Fecha:</Typography> {evento.fecha}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Cupos disponibles:</Typography> {evento.cuposDisponibles} / {evento.cantidadMaximaAsistentes}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Estado:</Typography> {evento.estado}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Typography variant="h6" gutterBottom>
                        Organizado por:
                    </Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>{evento.organizador.persona.nombre}</Typography>
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Email:</Typography> {evento.organizador.email}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Teléfono:</Typography> {evento.organizador.persona.telefono}
                            </Typography>
                            <Typography variant="body1">
                                <Typography component="span" sx={{ fontWeight: "bold" }}>Dirección:</Typography> {evento.organizador.persona.direccion}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Columna derecha - imagen */}
                <Grid item xs={12} md={5}>
                    <img
                        src="/evento-default.jpg"
                        alt="Imagen del evento"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                    />
                </Grid>

                {usuario && usuario.nombre !== "Administrador" && (
                    <Box mt={3}>
                        <Button variant="contained" onClick={() => setModalAbierto(true)} disabled={!clienteId}>
                            Registrar asistencia
                        </Button>
                    </Box>
                )}
            </Grid>
            <Modal open={modalAbierto} onClose={() => setModalAbierto(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: 400,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Registrar asistencia
                    </Typography>
                    <TextField
                        label="Fecha"
                        value={fechaEvento}
                        fullWidth
                        disabled
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Cantidad de personas"
                        type="number"
                        value={cantidadPersonas}
                        onChange={(e) => setCantidadPersonas(Number(e.target.value))}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Box textAlign="right">
                        <Button onClick={() => setModalAbierto(false)} sx={{ mr: 1 }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={registrarAsistencia}>
                            Confirmar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default EventoDetalle;
