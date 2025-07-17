import { useForm } from "react-hook-form";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {apiEventos, apiOrganizadores} from "../services/api.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {useEffect, useState} from "react";

interface NuevoEvento {
    nombre: string;
    tipoEvento: string;
    fecha: string;
    cantidadMaximaAsistentes: number;
    estado: string;
}

const CrearEvento = () => {
    const { register, handleSubmit } = useForm<NuevoEvento>();
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [organizadorId, setOrganizadorId] = useState<number | null>(null);


    useEffect(() => {
        const cargarOrganizador = async () => {
            console.log(usuario?.identificacion)
            try {
                const res = await apiOrganizadores.get(`/identificacion/${usuario?.identificacion}`);
                setOrganizadorId(res.data.organizadorId);
            } catch (err) {
                console.error("No se pudo obtener el organizador:", err);
            }
        };

        if (usuario?.rol === "organizador") {
            cargarOrganizador();
        }
    }, [usuario]);

    const onSubmit = async (data: NuevoEvento) => {
        try {
            const body = {
                nombre: data.nombre,
                tipoEvento: data.tipoEvento,
                fecha: data.fecha,
                cantidadMaximaAsistentes: data.cantidadMaximaAsistentes,
                estado: data.estado,
                organizadorId: organizadorId
            };

            await apiEventos.post("", body);
            alert("Evento creado correctamente");
            navigate("/perfil");
        } catch (err) {
            console.error("Error al crear evento", err);
            alert("No se pudo crear el evento");
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Crear nuevo evento
            </Typography>

            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label="Nombre del evento"
                    {...register("nombre", { required: true })}
                />
                <TextField
                    label="Tipo de evento"
                    select
                    {...register("tipoEvento", { required: true })}
                >
                    <MenuItem value="Concierto">Concierto</MenuItem>
                    <MenuItem value="Conferencia">Conferencia</MenuItem>
                    <MenuItem value="Taller">Taller</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
                <TextField
                    label="Fecha"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fecha", { required: true })}
                />
                <TextField
                    label="Cantidad máxima de asistentes"
                    type="number"
                    {...register("cantidadMaximaAsistentes", { required: true, min: 1 })}
                />
                <TextField
                    label="Estado"
                    select
                    defaultValue="Programado"
                    {...register("estado", { required: true })}
                >
                    <MenuItem value="Programado">Programado</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                    <MenuItem value="Finalizado">Finalizado</MenuItem>
                </TextField>

                <Button variant="contained" color="primary" type="submit">
                    Crear evento
                </Button>
            </Box>
        </Container>
    );
};

export default CrearEvento;
