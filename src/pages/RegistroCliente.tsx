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
import {apiAuth, apiClientes} from "../services/api.ts";

interface Persona {
    identificacion: string;
    nombre: string;
    genero: string;
    edad: number;
    direccion: string;
    telefono: string;
}

interface ClienteForm {
    persona: Persona;
    categoria: string;
    estado: string;
    username: string;
    password: string;
}

const RegistroCliente = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<ClienteForm>();

    const onSubmit = async (data: ClienteForm) => {
        try {
            // 1. Crear cliente
            const clienteBody = {
                persona: data.persona,
                categoria: data.categoria,
                estado: data.estado,
            };

            //await axios.post(`${import.meta.env.VITE_API_CLIENTES}`, data);
            await apiClientes.post("", clienteBody);

            // 2. Crear usuario en auth-service
            const usuarioBody = {
                username: data.username,
                password: data.password,
                rol: "cliente",
                identificacionPersona: data.persona.identificacion,
            };

            await apiAuth.post("/register", usuarioBody);

            alert("Cliente y usuario registrados correctamente");
            reset();
            navigate("/login");
        } catch (error) {
            console.error("Error al registrar cliente o usuario", error);
            alert("Ocurrió un error durante el registro");
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Registro de Cliente
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
            >
                {/* Persona */}
                <Typography variant="h6">Datos personales</Typography>
                <TextField label="Identificación" {...register("persona.identificacion")} />
                <TextField label="Nombre" {...register("persona.nombre")} />
                <TextField label="Género" select defaultValue="" {...register("persona.genero")}>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
                <TextField label="Edad" type="number" {...register("persona.edad")} />
                <TextField label="Dirección" {...register("persona.direccion")} />
                <TextField label="Teléfono" {...register("persona.telefono")} />

                {/* Cliente */}
                <Typography variant="h6">Datos del cliente</Typography>
                <TextField label="Categoría" {...register("categoria")} />
                <TextField label="Estado" select defaultValue="Activo" {...register("estado")}>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                </TextField>

                <Typography variant="h6">Datos de acceso</Typography>
                <TextField label="Usuario" {...register("username")} />
                <TextField
                    label="Contraseña"
                    type="password"
                    {...register("password")}
                />

                <Button variant="contained" color="primary" type="submit">
                    Registrarse
                </Button>
            </Box>
        </Container>
    );
};

export default RegistroCliente;
