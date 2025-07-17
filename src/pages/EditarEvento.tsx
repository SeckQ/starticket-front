import { useForm } from "react-hook-form";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {apiEventos} from "../services/api.ts";

interface EventoEditable {
    nombre: string;
    tipoEvento: string;
    fecha: string;
    cantidadMaximaAsistentes: number;
    estado: string;
    organizadorId: number;
}

const EditarEvento = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(true);
    const { register, handleSubmit, setValue } = useForm<EventoEditable>();

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                //const res = await axios.get(`${import.meta.env.VITE_API_EVENTOS}/${id}`);
                const res = await apiEventos.get(`/${id}`);
                const evento = res.data;

                setValue("nombre", evento.nombre);
                setValue("tipoEvento", evento.tipoEvento);
                setValue("fecha", evento.fecha);
                setValue("cantidadMaximaAsistentes", evento.cantidadMaximaAsistentes);
                setValue("estado", evento.estado);
                setValue("organizadorId", evento.organizador.organizadorId);
                setCargando(false);
            } catch (err) {
                console.error("Error al cargar el evento", err);
                alert("No se pudo cargar el evento");
                navigate("/perfil");
            }
        };

        fetchEvento();
    }, [id, setValue, navigate]);

    const onSubmit = async (data: EventoEditable) => {
        try {
            //await axios.put(`${import.meta.env.VITE_API_EVENTOS}/${id}`, data);
            await apiEventos.put(`/${id}`, data);
            alert("Evento actualizado correctamente");
            navigate("/perfil");
        } catch (error) {
            console.error("Error al actualizar evento", error);
            alert("No se pudo actualizar el evento");
        }
    };

    if (cargando) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography>Cargando evento...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Editar evento
            </Typography>

            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField label="Nombre del evento" {...register("nombre")} />

                <TextField label="Tipo de evento" select {...register("tipoEvento")}>
                    <MenuItem value="Concierto">Concierto</MenuItem>
                    <MenuItem value="Conferencia">Conferencia</MenuItem>
                    <MenuItem value="Taller">Taller</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                </TextField>

                <TextField
                    label="Fecha"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fecha")}
                />

                <TextField
                    label="Cantidad máxima de asistentes"
                    type="number"
                    {...register("cantidadMaximaAsistentes")}
                />

                <TextField label="Estado" select {...register("estado")}>
                    <MenuItem value="Programado">Programado</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                </TextField>

                <Button variant="contained" color="primary" type="submit">
                    Guardar cambios
                </Button>
            </Box>
        </Container>
    );
};

export default EditarEvento;
