import Navbar from './components/Navbar';
import AppRoutes from "./routes/Routes";
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <>
            <Navbar />
            <AppRoutes />
            <Footer/>
        </>
    );
}

export default App;