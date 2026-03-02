import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar'
import Home from './pages/Home'
import VentasDashboard from './pages/VentasDashboard'
import RentabilidadDashboard from './pages/RentabilidadDashboard'
import ClientesDashboard from './pages/ClientesDashboard'
import ProductosDashboard from './pages/ProductosDashboard'
import FlujoCajaDashboard from './pages/FlujoCajaDashboard'
import ProduccionDashboard from './pages/ProduccionDashboard'

export default function App() {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ventas" element={<VentasDashboard />} />
                    <Route path="/rentabilidad" element={<RentabilidadDashboard />} />
                    <Route path="/clientes" element={<ClientesDashboard />} />
                    <Route path="/productos" element={<ProductosDashboard />} />
                    <Route path="/flujo-caja" element={<FlujoCajaDashboard />} />
                    <Route path="/produccion" element={<ProduccionDashboard />} />
                </Routes>
            </main>
        </div>
    )
}
