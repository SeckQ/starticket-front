import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {apiAuth, apiPersonas} from "../services/api.ts";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // 1. Login en auth-service
            const res = await apiAuth.post("/login", { username, password });
            const { token, rol, identificacionPersona  } = res.data;
            //console.log("Respuesta login:", res.data);

            // 2. Obtener datos de persona
            const personaRes = await apiPersonas.get(`/${identificacionPersona }`);
            const persona = personaRes.data;

            // 3. Guardar usuario en el contexto
            login({
                token,
                rol,
                identificacion: identificacionPersona,
                nombre: persona.nombre,
            });

            // 4. Redirigir según rol
            setTimeout(() => {
                if (rol === "cliente" || rol === "organizador") {
                    navigate("/", { replace: true });
                } else if (rol === "admin" || persona.nombre === "Administrador") {
                    navigate("/admin", { replace: true });
                }
            }, 0);
        } catch (err) {
            console.error("Error de login", err);
            alert("Credenciales incorrectas o error de red.");
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>
    Iniciar sesión
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
        <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
        Iniciar sesión
    </Button>
    </Box>
    </Container>
);
};

export default Login;
