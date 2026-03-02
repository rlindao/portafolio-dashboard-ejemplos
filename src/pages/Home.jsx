import { useNavigate } from 'react-router-dom'
import Header from '../components/Layout/Header'

const dashboards = [
    {
        path: '/ventas',
        icon: '📊',
        iconColor: 'rgba(6, 182, 212, 0.15)',
        title: 'Ventas',
        description: 'Monitoree ventas totales, ticket promedio, tendencias por región y desempeño de vendedores en tiempo real.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '4' },
        ],
    },
    {
        path: '/rentabilidad',
        icon: '💰',
        iconColor: 'rgba(139, 92, 246, 0.15)',
        title: 'Rentabilidad',
        description: 'Analice márgenes brutos, utilidad neta, ROI y desglose de costos por línea de producto.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '3' },
        ],
    },
    {
        path: '/clientes',
        icon: '👥',
        iconColor: 'rgba(16, 185, 129, 0.15)',
        title: 'Clientes',
        description: 'Segmente su cartera, identifique clientes top, tasa de retención y evolución mensual.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '3' },
        ],
    },
    {
        path: '/productos',
        icon: '📦',
        iconColor: 'rgba(245, 158, 11, 0.15)',
        title: 'Productos',
        description: 'Clasificación ABC, rotación, productos estrella y análisis de rentabilidad vs volumen.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '4' },
        ],
    },
    {
        path: '/flujo-caja',
        icon: '💵',
        iconColor: 'rgba(16, 185, 129, 0.15)',
        title: 'Flujo de Caja',
        description: 'Controle ingresos vs egresos, saldo acumulado, composición de gastos y proyecciones.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '3' },
        ],
    },
    {
        path: '/produccion',
        icon: '🏭',
        iconColor: 'rgba(239, 68, 68, 0.15)',
        title: 'Producción (MRP)',
        description: 'Órdenes de producción, eficiencia por línea, materiales críticos, defectos y capacidad.',
        stats: [
            { label: 'KPIs', value: '4' },
            { label: 'Gráficos', value: '4' },
            { label: 'Filtros', value: '3' },
        ],
    },
]

export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <Header title="Optima Consultoría" subtitle="Dashboard Portfolio Demo" />
            <div className="page-content">
                <div className="home-hero">
                    <div className="home-hero-tag">
                        <span className="header-badge-dot"></span>
                        BI & Analítica de Datos
                    </div>
                    <h1>
                        Su negocio en<br />
                        <span className="gradient-text">una sola pantalla</span>
                    </h1>
                    <p>
                        Transforme datos dispersos en decisiones inteligentes.
                        Dashboards interactivos que revelan la rentabilidad real
                        de su empresa.
                    </p>
                    <div className="home-hero-quote">
                        "El gráfico excelente es el que da al espectador el mayor
                        número de ideas en el menor tiempo."
                        <br />
                        <strong style={{ color: 'var(--text-secondary)', fontStyle: 'normal' }}>— Edward Tufte</strong>
                    </div>
                </div>

                <div className="dashboard-preview-grid">
                    {dashboards.map(db => (
                        <div
                            key={db.path}
                            className="dashboard-preview-card"
                            onClick={() => navigate(db.path)}
                        >
                            <div
                                className="dashboard-preview-icon"
                                style={{ background: db.iconColor }}
                            >
                                {db.icon}
                            </div>
                            <h3>{db.title}</h3>
                            <p>{db.description}</p>
                            <div className="preview-stats">
                                {db.stats.map(s => (
                                    <div key={s.label} className="preview-stat-item">
                                        <strong>{s.value}</strong>
                                        {s.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
