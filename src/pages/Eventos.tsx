import { useEffect, useState } from "react";
import type {Evento} from "../types/types";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/GridLegacy";
import {apiEventos} from "../services/api.ts";

const Eventos = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        //axios
        apiEventos
            .get("")
            .then((res) => setEventos(res.data))
            .catch((err) => console.error("Error al cargar eventos:", err));
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Todos los eventos
            </Typography>
            <Grid container spacing={3}>
                {eventos.map((evento: Evento) => (
                    <Grid item xs={12} sm={6} md={4} key={evento.numeroEvento}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="160"
                                image="/evento-default.jpg"
                                alt="Imagen del evento"
                            />
                            <CardContent>
                                <Typography variant="h6">{evento.nombre}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tipo: {evento.tipoEvento}
                                </Typography>
                                <Typography variant="body2">Fecha: {evento.fecha}</Typography>
                                <Typography variant="body2">
                                    Cupos disponibles: {evento.cuposDisponibles}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    component={Link}
                                    to={`/eventos/${evento.numeroEvento}`}
                                >
                                    Ver más
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {eventos.length === 0 && (
                <Box mt={3}>
                    <Typography variant="body1" color="text.secondary">
                        No hay eventos disponibles.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Eventos;
