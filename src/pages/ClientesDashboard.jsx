import { useState, useMemo } from 'react'
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import Header from '../components/Layout/Header'
import KPICard from '../components/Dashboard/KPICard'
import FilterBar, { FilterSelect } from '../components/Dashboard/FilterBar'
import ChartCard from '../components/Dashboard/ChartCard'
import DataTable from '../components/Dashboard/DataTable'
import {
    evolucionCartera, segmentacionClientes, topClientes,
    frecuenciaCompra, filtrosClientes
} from '../data/clientes'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b']

export default function ClientesDashboard() {
    const [segmento, setSegmento] = useState('Todos')
    const [region, setRegion] = useState('Todas')
    const [antiguedad, setAntiguedad] = useState('Todas')

    const activeFilters = useMemo(() => {
        const f = []
        if (segmento !== 'Todos') f.push({ key: 'segmento', label: 'Segmento', value: segmento })
        if (region !== 'Todas') f.push({ key: 'region', label: 'Región', value: region })
        if (antiguedad !== 'Todas') f.push({ key: 'antiguedad', label: 'Antigüedad', value: antiguedad })
        return f
    }, [segmento, region, antiguedad])

    const handleRemoveFilter = (key) => {
        if (key === 'segmento') setSegmento('Todos')
        if (key === 'region') setRegion('Todas')
        if (key === 'antiguedad') setAntiguedad('Todas')
    }

    // Filter clientes list
    const filteredClientes = useMemo(() => {
        let data = topClientes
        if (segmento !== 'Todos') data = data.filter(c => c.segmento === segmento)
        if (region !== 'Todas') data = data.filter(c => c.region === region)
        return data
    }, [segmento, region])

    // Pie chart: segmentation filtered
    const filteredSegmentacion = useMemo(() => {
        if (segmento === 'Todos') return segmentacionClientes
        return segmentacionClientes.filter(s => s.segmento === segmento)
    }, [segmento])

    // Line chart: cartera evolution — scale by filter ratio
    const filteredCartera = useMemo(() => {
        if (segmento === 'Todos' && region === 'Todas') return evolucionCartera
        const ratio = topClientes.length > 0 ? filteredClientes.length / topClientes.length : 1
        return evolucionCartera.map(m => ({
            ...m,
            activos: Math.round(m.activos * ratio),
            nuevos: Math.max(1, Math.round(m.nuevos * ratio)),
            perdidos: Math.max(0, Math.round(m.perdidos * ratio)),
        }))
    }, [segmento, region, filteredClientes])

    // Histogram: purchase frequency — scale
    const filteredFrecuencia = useMemo(() => {
        if (segmento === 'Todos' && region === 'Todas') return frecuenciaCompra
        const ratio = topClientes.length > 0 ? filteredClientes.length / topClientes.length : 1
        return frecuenciaCompra.map(f => ({
            ...f,
            cantidad: Math.max(1, Math.round(f.cantidad * ratio)),
        }))
    }, [filteredClientes, segmento, region])

    const lastCartera = filteredCartera[filteredCartera.length - 1]
    const prevCartera = filteredCartera[filteredCartera.length - 2]
    const retencion = prevCartera.activos > 0 ? ((lastCartera.activos - lastCartera.perdidos) / prevCartera.activos * 100).toFixed(1) : '0'
    const ticketPromedio = filteredSegmentacion.reduce((sum, s) => sum + s.ticketPromedio * s.cantidad, 0)
        / Math.max(1, filteredSegmentacion.reduce((sum, s) => sum + s.cantidad, 0))

    const clienteColumns = [
        { key: 'nombre', label: 'Cliente' },
        { key: 'compras', label: 'Compras Totales', render: (v) => `$${v.toLocaleString()}` },
        { key: 'frecuencia', label: 'Frecuencia', render: (v) => `${v} compras` },
        {
            key: 'segmento', label: 'Segmento',
            render: (v) => (
                <span className={`status-badge ${v === 'Premium' ? 'success' : v === 'Corporativo' ? 'warning' : ''}`}
                    style={v === 'PYME' ? { background: 'rgba(99,102,241,0.1)', color: '#818cf8' } : undefined}>
                    {v}
                </span>
            )
        },
        { key: 'region', label: 'Región' },
    ]

    return (
        <>
            <Header title="Dashboard de Clientes" subtitle="Segmentación, retención y comportamiento de compra" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Segmento" value={segmento} onChange={setSegmento} options={filtrosClientes.segmentos} />
                    <FilterSelect label="Región" value={region} onChange={setRegion} options={filtrosClientes.regiones} />
                    <FilterSelect label="Antigüedad" value={antiguedad} onChange={setAntiguedad} options={filtrosClientes.antiguedad} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="👥" iconColor="cyan" label="Clientes Activos" value={lastCartera.activos} change={4.2} changeType="positive" />
                    <KPICard icon="🎫" iconColor="purple" label="Ticket Promedio" value={`$${ticketPromedio.toFixed(0)}`} change={2.8} changeType="positive" />
                    <KPICard icon="🔄" iconColor="green" label="Retención" value={`${retencion}%`} change={1.5} changeType="positive" />
                    <KPICard icon="🌟" iconColor="amber" label="Nuevos (Dic)" value={lastCartera.nuevos} change={12.0} changeType="positive" />
                </div>

                <div className="charts-grid">
                    <ChartCard title="Evolución de Cartera" subtitle="Clientes activos, nuevos y perdidos">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredCartera}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="activos" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 3 }} name="Activos" />
                                <Line type="monotone" dataKey="nuevos" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="Nuevos" />
                                <Line type="monotone" dataKey="perdidos" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} name="Perdidos" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Segmentación de Clientes" subtitle="Distribución por tipo de cliente">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={filteredSegmentacion}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={100}
                                    dataKey="cantidad"
                                    nameKey="segmento"
                                    label={({ segmento, porcentaje }) => `${segmento} ${porcentaje}%`}
                                >
                                    {filteredSegmentacion.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => `${v} clientes`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Top Clientes por Compras" subtitle="Ranking por volumen de compras">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredClientes} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(v) => `$${v / 1000}K`} />
                                <YAxis type="category" dataKey="nombre" width={110} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Bar dataKey="compras" radius={[0, 4, 4, 0]} name="Compras">
                                    {filteredClientes.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Frecuencia de Compra" subtitle="Distribución por número de compras">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredFrecuencia}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rango" tick={{ fontSize: 11 }} />
                                <YAxis />
                                <Tooltip formatter={(v) => `${v} clientes`} />
                                <Bar dataKey="cantidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Clientes" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Detalle de Clientes" columns={clienteColumns} data={filteredClientes} />
            </div>
        </>
    )
}
