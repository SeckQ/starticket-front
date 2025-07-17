import { Container, Typography, Box, Divider } from "@mui/material";

const SobreNosotros = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Sobre Nosotros
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" paragraph>
                Somos una organización dedicada a la planificación, gestión y control de eventos
                dirigidos a comunidades académicas, profesionales y sociales. Nuestro objetivo es
                facilitar el registro de participantes, el monitoreo de asistencia y la evaluación
                de resultados en tiempo real.
            </Typography>

            <Typography variant="body1" paragraph>
                A través de nuestra plataforma, ofrecemos herramientas digitales para organizadores
                de eventos, asistentes y entidades interesadas en obtener métricas claras sobre
                participación y logística.
            </Typography>

            <Typography variant="body1" paragraph>
                Nuestro equipo está formado por profesionales comprometidos con la innovación
                tecnológica, la accesibilidad de la información y el desarrollo de soluciones
                que aporten valor a la gestión de eventos en múltiples sectores.
            </Typography>

            <Box mt={4}>
                <Typography variant="h6">Misión</Typography>
                <Typography variant="body2">
                    Facilitar la gestión de eventos y el control de asistencia a través de soluciones tecnológicas eficientes.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h6">Visión</Typography>
                <Typography variant="body2">
                    Ser una plataforma líder en gestión de eventos y asistencia, reconocida por su confiabilidad y facilidad de uso.
                </Typography>
            </Box>
        </Container>
    );
};

export default SobreNosotros;
