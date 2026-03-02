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
    ventasMensuales, ventasPorCategoria, topVendedores,
    ventasPorRegion, detalleVentas, filtrosVentas
} from '../data/ventas'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1']

export default function VentasDashboard() {
    const [periodo, setPeriodo] = useState('Anual')
    const [region, setRegion] = useState('Todas')
    const [categoria, setCategoria] = useState('Todas')
    const [vendedor, setVendedor] = useState('Todos')

    const activeFilters = useMemo(() => {
        const f = []
        if (periodo !== 'Anual') f.push({ key: 'periodo', label: 'Período', value: periodo })
        if (region !== 'Todas') f.push({ key: 'region', label: 'Región', value: region })
        if (categoria !== 'Todas') f.push({ key: 'categoria', label: 'Categoría', value: categoria })
        if (vendedor !== 'Todos') f.push({ key: 'vendedor', label: 'Vendedor', value: vendedor })
        return f
    }, [periodo, region, categoria, vendedor])

    const handleRemoveFilter = (key) => {
        if (key === 'periodo') setPeriodo('Anual')
        if (key === 'region') setRegion('Todas')
        if (key === 'categoria') setCategoria('Todas')
        if (key === 'vendedor') setVendedor('Todos')
    }

    // Filter detail data first — compute chart data from filtered details
    const filteredDetalle = useMemo(() => {
        let data = detalleVentas
        if (region !== 'Todas') data = data.filter(d => d.region === region)
        if (categoria !== 'Todas') data = data.filter(d => d.categoria === categoria)
        if (vendedor !== 'Todos') data = data.filter(d => d.vendedor === vendedor)
        return data
    }, [region, categoria, vendedor])

    // Line chart: period filter
    const filteredMensuales = useMemo(() => {
        let data = ventasMensuales
        if (periodo === 'Trimestre 1') data = data.slice(0, 3)
        else if (periodo === 'Trimestre 2') data = data.slice(3, 6)
        else if (periodo === 'Trimestre 3') data = data.slice(6, 9)
        else if (periodo === 'Trimestre 4') data = data.slice(9, 12)

        // If region/category/vendor filter is set, scale the values proportionally
        if (region !== 'Todas' || categoria !== 'Todas' || vendedor !== 'Todos') {
            const totalOriginal = detalleVentas.reduce((s, d) => s + d.total, 0)
            const totalFiltered = filteredDetalle.reduce((s, d) => s + d.total, 0)
            const ratio = totalOriginal > 0 ? totalFiltered / totalOriginal : 1
            data = data.map(m => ({
                ...m,
                ventas: Math.round(m.ventas * ratio),
                transacciones: Math.round(m.transacciones * ratio),
            }))
        }
        return data
    }, [periodo, filteredDetalle, region, categoria, vendedor])

    // Bar chart: category — filtered by region/vendedor
    const filteredCategorias = useMemo(() => {
        if (region === 'Todas' && vendedor === 'Todos' && categoria === 'Todas') return ventasPorCategoria
        let cats = ventasPorCategoria
        if (categoria !== 'Todas') cats = cats.filter(c => c.categoria === categoria)
        // Simulate proportional filtering effect
        if (region !== 'Todas' || vendedor !== 'Todos') {
            const ratio = filteredDetalle.length / detalleVentas.length
            cats = cats.map(c => ({ ...c, ventas: Math.round(c.ventas * ratio) }))
        }
        return cats
    }, [region, vendedor, categoria, filteredDetalle])

    // Bar chart: vendedores — filtered by region
    const filteredVendedores = useMemo(() => {
        let data = topVendedores
        if (region !== 'Todas') data = data.filter(v => v.region === region)
        if (vendedor !== 'Todos') data = data.filter(v => v.nombre === vendedor)
        return data
    }, [region, vendedor])

    // Pie chart: regiones — filtered by region selection
    const filteredRegiones = useMemo(() => {
        if (region === 'Todas') return ventasPorRegion
        return ventasPorRegion.filter(r => r.region === region)
    }, [region])

    const totalVentas = filteredMensuales.reduce((s, m) => s + m.ventas, 0)
    const totalTransacciones = filteredMensuales.reduce((s, m) => s + m.transacciones, 0)
    const ticketPromedio = totalTransacciones > 0 ? (totalVentas / totalTransacciones) : 0

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'cliente', label: 'Cliente' },
        { key: 'producto', label: 'Producto' },
        { key: 'cantidad', label: 'Cant.' },
        {
            key: 'total', label: 'Total',
            render: (v) => `$${v.toLocaleString('es-EC', { minimumFractionDigits: 2 })}`
        },
        { key: 'vendedor', label: 'Vendedor' },
        { key: 'region', label: 'Región' },
    ]

    return (
        <>
            <Header title="Dashboard de Ventas" subtitle="Análisis completo del desempeño comercial" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Período" value={periodo} onChange={setPeriodo} options={filtrosVentas.periodos} />
                    <FilterSelect label="Región" value={region} onChange={setRegion} options={filtrosVentas.regiones} />
                    <FilterSelect label="Categoría" value={categoria} onChange={setCategoria} options={filtrosVentas.categorias} />
                    <FilterSelect label="Vendedor" value={vendedor} onChange={setVendedor} options={filtrosVentas.vendedores} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="📈" iconColor="cyan" label="Ventas Totales" value={`$${(totalVentas / 1000).toFixed(1)}K`} change={12.5} changeType="positive" />
                    <KPICard icon="🎫" iconColor="purple" label="Ticket Promedio" value={`$${ticketPromedio.toFixed(0)}`} change={3.2} changeType="positive" />
                    <KPICard icon="🔄" iconColor="green" label="Transacciones" value={totalTransacciones.toLocaleString()} change={8.7} changeType="positive" />
                    <KPICard icon="📊" iconColor="amber" label="Crecimiento" value="+15.2%" change={15.2} changeType="positive" />
                </div>

                <div className="charts-grid">
                    <ChartCard title="Tendencia de Ventas" subtitle="Ventas vs Meta mensual">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredMensuales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="ventas" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} name="Ventas" />
                                <Line type="monotone" dataKey="meta" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Meta" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Ventas por Categoría" subtitle="Distribución por línea de producto">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredCategorias} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(v) => `$${v / 1000}K`} />
                                <YAxis type="category" dataKey="categoria" width={85} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Bar dataKey="ventas" radius={[0, 4, 4, 0]} name="Ventas">
                                    {filteredCategorias.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Top Vendedores" subtitle="Ranking por ventas totales">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredVendedores}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" angle={-20} textAnchor="end" height={60} interval={0} tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Bar dataKey="ventas" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Ventas" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Distribución por Región" subtitle="Participación en ventas totales">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={filteredRegiones}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    dataKey="ventas"
                                    nameKey="region"
                                    label={({ region, porcentaje }) => `${region} ${porcentaje}%`}
                                >
                                    {filteredRegiones.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Detalle de Ventas" columns={columns} data={filteredDetalle} />
            </div>
        </>
    )
}
