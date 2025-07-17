import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Eventos from "../pages/Eventos";
import SobreNosotros from "../pages/SobreNosotros";
import EventoDetalle from "../pages/EventoDetalle";
import EditarEvento from "../pages/EditarEvento";
import Login from '../pages/Login';
import Perfil from "../pages/Perfil";
import CrearEvento from "../pages/CrearEvento.tsx";
import RegistroCliente from "../pages/RegistroCliente.tsx";
import Administracion from "../pages/Administracion.tsx";
import RegistroOrganizador from "../pages/RegistroOrganizador.tsx";
import EditarOrganizador from "../pages/EditarOrganizador.tsx";
import EditarCliente from "../pages/EditarCliente.tsx";
// import Registro from '../pages/Registro';

// Otros imports

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/eventos" element={<Eventos/>}/>
        <Route path="/sobre-nosotros" element={<SobreNosotros/>}/>
        <Route path="/eventos/:id" element={<EventoDetalle/>}/>
        <Route path="/registro" element={<RegistroCliente />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
        <Route path="/eventos/nuevo" element={<CrearEvento/>}/>
        <Route path="/eventos/editar/:id" element={<EditarEvento />} />
        <Route path="/admin" element={<Administracion/>}/>
        <Route path="/registro-organizador" element={<RegistroOrganizador/>}/>
        <Route path="/organizadores/editar/:id" element={<EditarOrganizador />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />

        {/* otros */}
    </Routes>
);


export default AppRoutes;