import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        logout();
        navigate("/",{replace: true});
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* Logo y enlaces de navegación */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img src="/logo.png" alt="Logo" style={{ width: 40 }} />
                    <Button component={Link} to="/" color="inherit">Inicio</Button>
                    <Button component={Link} to="/eventos" color="inherit">Eventos</Button>
                    <Button component={Link} to="/sobre-nosotros" color="inherit">Sobre nosotros</Button>
                </Box>

                {/* Autenticación */}
                {usuario ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Mensaje de saludo */}
                        <Typography>Hola, {usuario.nombre}</Typography>

                        {/* Opción dinámica según el tipo de usuario */}
                        {usuario.nombre === "Administrador" ? (
                            <Button color="inherit" component={Link} to="/admin">
                                Administración
                            </Button>
                        ) : (
                            <Button color="inherit" component={Link} to="/perfil">
                                Mi perfil
                            </Button>
                        )}

                        <Button color="inherit" variant="outlined" onClick={handleCerrarSesion}>
                            Cerrar sesión
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button color="inherit" component={Link} to="/login">Iniciar sesión</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/registro">
                            Registrarse
                        </Button>
                    </Box>
                )}

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
