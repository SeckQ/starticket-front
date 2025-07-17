import Slider from "react-slick";
import {Box, Container, Typography, Card, CardContent, CardActions, Button, CardMedia} from "@mui/material";
import {useEffect, useState} from "react";
import type {Evento} from "../types/types";
import { Link } from "react-router-dom";
import Grid from '@mui/material/GridLegacy';
import {apiEventos} from "../services/api.ts";


const Inicio = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);

    useEffect(() => {
        //axios.get<Evento[]>(`${import.meta.env.VITE_API_EVENTOS}`)
        apiEventos.get<Evento[]>("")
            .then(res => setEventos(res.data))
            .catch(err => console.error("Error al cargar eventos:", err));
    }, []);

    const eventosVisibles = mostrarTodos ? eventos : eventos.slice(0, 3);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            {/* Carrusel */}
            <Slider {...sliderSettings}>
                <Box component="img" src="/img1.jpg" alt="slide1" sx={{ width: "100%", height: "400px", objectFit: "fill" }} />
                <Box component="img" src="/img2.jpg" alt="slide2" sx={{ width: "100%", height: "400px", objectFit: "fill" }} />
                <Box component="img" src="/img3.jpg" alt="slide3" sx={{ width: "100%", height: "400px", objectFit: "fill" }} />
            </Slider>

            <Container sx={{ mt: 4 }}>
                {/* Descripción */}
                <Typography variant="h4" gutterBottom>
                    Sobre nuestra organización
                </Typography>
                <Typography variant="body1">
                    Somos una organización dedicada a la planificación y gestión de eventos para comunidades académicas, culturales y profesionales.
                    Nuestro sistema permite registrar asistencias, organizar eventos y brindar reportes en tiempo real para todos los participantes.
                </Typography>

                {/* Listado de eventos */}
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    Próximos eventos
                </Typography>
                <Grid container spacing={3}>
                    {eventosVisibles.map(evento => (
                        <Grid item xs={12} md={4} key={evento.numeroEvento}>
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

                {/* Botón mostrar más */}
                {!mostrarTodos && eventos.length > 3 && (
                    <Box textAlign="center" mt={3}>
                        <Button variant="outlined" onClick={() => setMostrarTodos(true)}>
                            Mostrar más eventos
                        </Button>
                    </Box>
                )}
            </Container>
        </>
    );
};

export default Inicio;
