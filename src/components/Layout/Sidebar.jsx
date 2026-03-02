import { NavLink } from 'react-router-dom'

const navItems = [
    { to: '/', icon: '🏠', label: 'Inicio' },
]

const dashboardItems = [
    { to: '/ventas', icon: '📊', label: 'Ventas' },
    { to: '/rentabilidad', icon: '💰', label: 'Rentabilidad' },
    { to: '/clientes', icon: '👥', label: 'Clientes' },
    { to: '/productos', icon: '📦', label: 'Productos' },
    { to: '/flujo-caja', icon: '💵', label: 'Flujo de Caja' },
    { to: '/produccion', icon: '🏭', label: 'Producción (MRP)' },
]

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">O</div>
                <div className="sidebar-brand-text">
                    <h2>Optima</h2>
                    <span>Consultoría BI</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-section-label">Navegación</div>
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <span className="sidebar-link-icon">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}

                <div className="sidebar-section-label">Dashboards</div>
                {dashboardItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <span className="sidebar-link-icon">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <strong>Roberto Lindao Guevara</strong>
                <div>info@optimaconsultoria.com</div>
                <div style={{ marginTop: 4, opacity: 0.7 }}>Demo v1.0 • Datos de ejemplo</div>
            </div>
        </aside>
    )
}
