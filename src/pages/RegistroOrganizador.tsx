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
import {apiAuth, apiOrganizadores} from "../services/api.ts";


interface Persona {
    identificacion: string;
    nombre: string;
    genero: string;
    edad: number;
    direccion: string;
    telefono: string;
}

interface OrganizadorForm {
    email: string;
    cantidadAsistentes: number;
    estado: string;
    persona: Persona;
    username: string;
    password: string;
}

const RegistroOrganizador = () => {
    const { register, handleSubmit, reset } = useForm<OrganizadorForm>();
    const navigate = useNavigate();

    const onSubmit = async (data: OrganizadorForm) => {
        try {
            // 1. Registrar organizador
            const organizadorBody = {
                email: data.email,
                cantidadAsistentes: 0,
                estado: data.estado,
                persona: data.persona,
            };

            await apiOrganizadores.post("", organizadorBody);

            // 2. Registrar usuario
            const authBody = {
                username: data.username,
                password: data.password,
                rol: "organizador",
                identificacionPersona: data.persona.identificacion,
            };

            await apiAuth.post("/register", authBody);

            alert("Organizador y usuario registrados correctamente");
            reset();
            navigate("/admin");
        } catch (error) {
            console.error("Error al registrar organizador o usuario", error);
            alert("Ocurrió un error durante el registro");
        }
    };


    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Registro de Organizador
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
            >
                {/* Datos de contacto */}
                <TextField label="Email" {...register("email")} />
                <TextField
                    label="Cantidad de asistentes"
                    type="number"
                    defaultValue={0}
                    InputProps={{ readOnly: true }}
                    {...register("cantidadAsistentes")}
                />
                <TextField label="Estado" select defaultValue="Activo" {...register("estado")}>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                </TextField>

                <Typography variant="h6" sx={{ mt: 2 }}>Datos personales</Typography>
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

                <Typography variant="h6">Datos de acceso</Typography>
                <TextField label="Usuario" {...register("username")} />
                <TextField label="Contraseña" type="password" {...register("password")} />

                <Button variant="contained" color="primary" type="submit">
                    Registrar Organizador
                </Button>
            </Box>
        </Container>
    );
};

export default RegistroOrganizador;
