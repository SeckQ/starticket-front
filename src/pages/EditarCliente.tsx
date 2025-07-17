import { useForm } from "react-hook-form";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {apiClientes} from "../services/api.ts";

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
}

const EditarCliente = () => {
    const { id } = useParams(); // id del cliente
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<ClienteForm>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                //const res = await axios.get(`${import.meta.env.VITE_API_CLIENTES}/${id}`);
                const res = await apiClientes.get(`/${id}`);
                const cliente = res.data;

                // Setear campos del formulario
                setValue("persona.identificacion", cliente.persona.identificacion);
                setValue("persona.nombre", cliente.persona.nombre);
                setValue("persona.genero", cliente.persona.genero);
                setValue("persona.edad", cliente.persona.edad);
                setValue("persona.direccion", cliente.persona.direccion);
                setValue("persona.telefono", cliente.persona.telefono);
                setValue("categoria", cliente.categoria);
                setValue("estado", cliente.estado);
            } catch (err) {
                console.error("Error al cargar cliente:", err);
                alert("No se pudo cargar el cliente");
                navigate("/admin");
            } finally {
                setLoading(false);
            }
        };

        fetchCliente();
    }, [id, setValue, navigate]);

    const onSubmit = async (data: ClienteForm) => {
        try {
            //await axios.put(`${import.meta.env.VITE_API_CLIENTES}/${id}`, data);
            await apiClientes.put(`/${id}`, data);
            alert("Cliente actualizado correctamente");
            navigate("/admin");
        } catch (err) {
            console.error("Error al actualizar cliente:", err);
            alert("No se pudo actualizar el cliente");
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
                <Typography>Cargando cliente...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Editar Cliente
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
            >
                <Typography variant="h6">Datos personales</Typography>
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

                <Typography variant="h6">Datos del cliente</Typography>
                <TextField label="Categoría" {...register("categoria")} />
                <TextField label="Estado" select {...register("estado")}>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                </TextField>

                <Button variant="contained" type="submit">
                    Guardar cambios
                </Button>
            </Box>
        </Container>
    );
};

export default EditarCliente;
