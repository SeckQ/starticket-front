import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {apiOrganizadores} from "../services/api.ts";

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
}

const EditarOrganizador = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<OrganizadorForm>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizador = async () => {
            try {
                //const res = await axios.get(`${import.meta.env.VITE_API_ORGANIZADORES}/${id}`);
                const res = await apiOrganizadores.get(`/${id}`);
                const data = res.data;

                // Setear valores en el formulario
                setValue("email", data.email);
                setValue("cantidadAsistentes", data.cantidadAsistentes);
                setValue("estado", data.estado);
                setValue("persona.identificacion", data.persona.identificacion);
                setValue("persona.nombre", data.persona.nombre);
                setValue("persona.genero", data.persona.genero);
                setValue("persona.edad", data.persona.edad);
                setValue("persona.direccion", data.persona.direccion);
                setValue("persona.telefono", data.persona.telefono);
            } catch (err) {
                console.error("Error al cargar organizador:", err);
                alert("No se pudo cargar el organizador");
                navigate("/admin");
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizador();
    }, [id, setValue, navigate]);

    const onSubmit = async (data: OrganizadorForm) => {
        try {
            //await axios.put(`${import.meta.env.VITE_API_ORGANIZADORES}/${id}`, data);
            await apiOrganizadores.put(`/${id}`, data);
            alert("Organizador actualizado correctamente");
            navigate("/admin");
        } catch (err) {
            console.error("Error al actualizar organizador:", err);
            alert("No se pudo actualizar el organizador");
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography>Cargando organizador...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Editar Organizador
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
            >
                <TextField label="Email" {...register("email")} />
                <TextField
                    label="Cantidad de asistentes"
                    type="number"
                    InputProps={{ readOnly: true }}
                    {...register("cantidadAsistentes")}
                />
                <TextField label="Estado" select {...register("estado")}>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                </TextField>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    Datos personales
                </Typography>
                <TextField label="Identificación" {...register("persona.identificacion")} />
                <TextField label="Nombre" {...register("persona.nombre")} />
                <TextField label="Género" select {...register("persona.genero")}>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
                <TextField label="Edad" type="number" {...register("persona.edad")} />
                <TextField label="Dirección" {...register("persona.direccion")} />
                <TextField label="Teléfono" {...register("persona.telefono")} />

                <Button variant="contained" type="submit">
                    Guardar cambios
                </Button>
            </Box>
        </Container>
    );
};

export default EditarOrganizador;
