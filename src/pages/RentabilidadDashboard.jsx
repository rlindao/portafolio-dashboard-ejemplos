import { useState, useMemo } from 'react'
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import Header from '../components/Layout/Header'
import KPICard from '../components/Dashboard/KPICard'
import FilterBar, { FilterSelect } from '../components/Dashboard/FilterBar'
import ChartCard from '../components/Dashboard/ChartCard'
import DataTable from '../components/Dashboard/DataTable'
import {
    rentabilidadMensual, margenPorProducto, desgloseCostos,
    comparativaPeriodos, filtrosRentabilidad
} from '../data/rentabilidad'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

export default function RentabilidadDashboard() {
    const [periodo, setPeriodo] = useState('Anual')
    const [linea, setLinea] = useState('Todas')
    const [centro, setCentro] = useState('Todos')

    const activeFilters = useMemo(() => {
        const f = []
        if (periodo !== 'Anual') f.push({ key: 'periodo', label: 'Período', value: periodo })
        if (linea !== 'Todas') f.push({ key: 'linea', label: 'Línea', value: linea })
        if (centro !== 'Todos') f.push({ key: 'centro', label: 'Centro', value: centro })
        return f
    }, [periodo, linea, centro])

    const handleRemoveFilter = (key) => {
        if (key === 'periodo') setPeriodo('Anual')
        if (key === 'linea') setLinea('Todas')
        if (key === 'centro') setCentro('Todos')
    }

    // Map product categories for product line filter
    const productLineMap = {
        'Electrónica': ['Laptops', 'Monitores', 'Teclados'],
        'Ropa': ['Camisetas'],
        'Alimentos': ['Aceites'],
        'Hogar': ['Sábanas'],
        'Deportes': ['Equipo Gym'],
        'Salud': ['Vitaminas'],
    }

    const filteredMensual = useMemo(() => {
        let data = rentabilidadMensual
        if (periodo === 'Q1') data = data.slice(0, 3)
        else if (periodo === 'Q2') data = data.slice(3, 6)
        else if (periodo === 'Q3') data = data.slice(6, 9)
        else if (periodo === 'Q4') data = data.slice(9, 12)

        if (linea !== 'Todas') {
            const lineProducts = productLineMap[linea] || []
            const totalProducts = margenPorProducto.length
            const matchCount = margenPorProducto.filter(p => lineProducts.includes(p.producto)).length
            const ratio = totalProducts > 0 ? matchCount / totalProducts : 1
            data = data.map(m => ({
                ...m,
                ingresos: Math.round(m.ingresos * ratio),
                costos: Math.round(m.costos * ratio),
            }))
        }
        return data
    }, [periodo, linea])

    const filteredProductos = useMemo(() => {
        if (linea === 'Todas') return margenPorProducto
        const lineProducts = productLineMap[linea] || []
        return margenPorProducto.filter(p => lineProducts.includes(p.producto))
    }, [linea])

    const filteredCostos = useMemo(() => {
        if (centro === 'Todos') return desgloseCostos
        const centroMap = {
            'Operaciones': ['Costo de Ventas', 'Logística'],
            'Administración': ['Admin & TI', 'Personal'],
            'Comercial': ['Marketing'],
            'Logística': ['Logística'],
        }
        const tipos = centroMap[centro] || []
        return desgloseCostos.filter(c => tipos.includes(c.tipo))
    }, [centro])

    const filteredComparativa = useMemo(() => {
        if (linea === 'Todas') return comparativaPeriodos
        const lineProducts = productLineMap[linea] || []
        const ratio = lineProducts.length / margenPorProducto.length
        return comparativaPeriodos.map(p => ({
            ...p,
            ingresos: Math.round(p.ingresos * ratio),
            utilidad: Math.round(p.utilidad * ratio),
        }))
    }, [linea])

    const totalIngresos = filteredMensual.reduce((s, m) => s + m.ingresos, 0)
    const totalCostos = filteredMensual.reduce((s, m) => s + m.costos, 0)
    const utilidadNeta = totalIngresos - totalCostos
    const margenBruto = totalIngresos > 0 ? ((utilidadNeta / totalIngresos) * 100).toFixed(1) : 0

    const prodColumns = [
        { key: 'producto', label: 'Producto' },
        { key: 'ingresos', label: 'Ingresos', render: (v) => `$${v.toLocaleString()}` },
        { key: 'costo', label: 'Costo', render: (v) => `$${v.toLocaleString()}` },
        {
            key: 'margen', label: 'Margen',
            render: (v) => (
                <span className={`status-badge ${v >= 40 ? 'success' : v >= 30 ? 'warning' : 'danger'}`}>
                    {v}%
                </span>
            )
        },
    ]

    return (
        <>
            <Header title="Dashboard de Rentabilidad" subtitle="Márgenes, costos y retorno de inversión" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Período" value={periodo} onChange={setPeriodo} options={filtrosRentabilidad.periodos} />
                    <FilterSelect label="Línea de Producto" value={linea} onChange={setLinea} options={filtrosRentabilidad.lineasProducto} />
                    <FilterSelect label="Centro de Costo" value={centro} onChange={setCentro} options={filtrosRentabilidad.centrosCosto} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="📊" iconColor="cyan" label="Margen Bruto" value={`${margenBruto}%`} change={2.3} changeType="positive" />
                    <KPICard icon="💎" iconColor="purple" label="Utilidad Neta" value={`$${(utilidadNeta / 1000).toFixed(1)}K`} change={8.1} changeType="positive" />
                    <KPICard icon="🎯" iconColor="green" label="ROI" value="184%" change={5.4} changeType="positive" />
                    <KPICard icon="💸" iconColor="amber" label="Costo Total" value={`$${(totalCostos / 1000).toFixed(1)}K`} change={3.2} changeType="negative" />
                </div>

                <div className="charts-grid">
                    <ChartCard title="Tendencia de Rentabilidad" subtitle="Ingresos y costos mensuales">
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={filteredMensual}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Legend />
                                <Area type="monotone" dataKey="ingresos" stroke="#06b6d4" fill="rgba(6,182,212,0.15)" strokeWidth={2} name="Ingresos" />
                                <Area type="monotone" dataKey="costos" stroke="#ef4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} name="Costos" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Margen por Producto" subtitle="Top productos por margen de ganancia">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredProductos}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="producto" angle={-20} textAnchor="end" height={60} interval={0} tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={(v) => `${v}%`} />
                                <Tooltip formatter={(v, name) => name === 'Margen %' ? `${v}%` : `$${v.toLocaleString()}`} />
                                <Bar dataKey="margen" radius={[4, 4, 0, 0]} name="Margen %">
                                    {filteredProductos.map((entry, i) => (
                                        <Cell key={i} fill={entry.margen >= 50 ? '#10b981' : entry.margen >= 35 ? '#06b6d4' : '#f59e0b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Desglose de Costos" subtitle="Composición del gasto total">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={filteredCostos}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={100}
                                    dataKey="porcentaje"
                                    nameKey="tipo"
                                    label={({ tipo, porcentaje }) => `${tipo} ${porcentaje}%`}
                                >
                                    {filteredCostos.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v) => `${v}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Comparativa por Períodos" subtitle="Ingresos y utilidad Q1-Q4">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredComparativa}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="periodo" tick={{ fontSize: 11 }} />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="ingresos" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Ingresos" />
                                <Bar dataKey="utilidad" fill="#10b981" radius={[4, 4, 0, 0]} name="Utilidad" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Rentabilidad por Producto" columns={prodColumns} data={filteredProductos} />
            </div>
        </>
    )
}
