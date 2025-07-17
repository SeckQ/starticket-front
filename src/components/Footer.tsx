import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 5,
                py: 2,
                px: 2,
                backgroundColor: "#1976d2",
                color: "#fff",
                textAlign: "center",
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Sistema de Gestión de Asistencias. Todos los derechos reservados.
            </Typography>
        </Box>
    );
};

export default Footer;
