import { useState, useMemo } from 'react'
import {
    LineChart, Line, BarChart, Bar, ScatterChart, Scatter, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis
} from 'recharts'
import Header from '../components/Layout/Header'
import KPICard from '../components/Dashboard/KPICard'
import FilterBar, { FilterSelect } from '../components/Dashboard/FilterBar'
import ChartCard from '../components/Dashboard/ChartCard'
import DataTable from '../components/Dashboard/DataTable'
import {
    productosPorCategoria, abcProductos, tendenciaProductosEstrella,
    rentabilidadVsVolumen, filtrosProductos
} from '../data/productos'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']
const productoCategoriaMap = {
    'Laptop HP 15"': 'Electrónica', 'Monitor Dell 27"': 'Electrónica', 'Teclado MX Keys': 'Electrónica',
    'Auriculares BT': 'Electrónica', 'Mouse Ergonómico': 'Electrónica',
    'Camiseta Sport Pro': 'Ropa', 'Zapatos Cuero Italiano': 'Ropa', 'Chaqueta Outdoor': 'Ropa',
    'Aceite Oliva Premium': 'Alimentos', 'Arroz Extra': 'Alimentos',
    'Juego Sábanas 400H': 'Hogar', 'Colchón Premium': 'Hogar',
    'Set Mancuernas': 'Deportes', 'Vitamina Complex': 'Salud', 'Proteína Whey': 'Salud',
}

export default function ProductosDashboard() {
    const [categoria, setCategoria] = useState('Todas')
    const [estado, setEstado] = useState('Todos')
    const [claseABC, setClaseABC] = useState('Todas')
    const [rango, setRango] = useState('Todos')

    const activeFilters = useMemo(() => {
        const f = []
        if (categoria !== 'Todas') f.push({ key: 'categoria', label: 'Categoría', value: categoria })
        if (estado !== 'Todos') f.push({ key: 'estado', label: 'Estado', value: estado })
        if (claseABC !== 'Todas') f.push({ key: 'claseABC', label: 'Clase', value: claseABC })
        if (rango !== 'Todos') f.push({ key: 'rango', label: 'Precio', value: rango })
        return f
    }, [categoria, estado, claseABC, rango])

    const handleRemoveFilter = (key) => {
        if (key === 'categoria') setCategoria('Todas')
        if (key === 'estado') setEstado('Todos')
        if (key === 'claseABC') setClaseABC('Todas')
        if (key === 'rango') setRango('Todos')
    }

    const filteredABC = useMemo(() => {
        let data = abcProductos
        if (claseABC !== 'Todas') data = data.filter(p => p.clase === claseABC)
        if (categoria !== 'Todas') data = data.filter(p => productoCategoriaMap[p.producto] === categoria)
        return data
    }, [claseABC, categoria])

    const filteredCategorias = useMemo(() => {
        if (categoria === 'Todas') return productosPorCategoria
        return productosPorCategoria.filter(c => c.categoria === categoria)
    }, [categoria])

    const filteredTendencia = useMemo(() => {
        if (categoria === 'Todas') return tendenciaProductosEstrella
        const catProducts = { 'Electrónica': ['laptop', 'monitor'], 'Ropa': ['camiseta'] }
        const keys = catProducts[categoria]
        if (!keys) return tendenciaProductosEstrella.map(m => ({ mes: m.mes }))
        return tendenciaProductosEstrella.map(m => {
            const row = { mes: m.mes }
            keys.forEach(k => { row[k] = m[k] })
            return row
        })
    }, [categoria])

    const filteredScatter = useMemo(() => {
        if (categoria === 'Todas') return rentabilidadVsVolumen
        const catKw = { 'Electrónica': ['Laptop', 'Monitor', 'Teclado'], 'Ropa': ['Camiseta'], 'Alimentos': ['Aceite'], 'Hogar': ['Sábanas'], 'Deportes': ['Mancuernas'], 'Salud': ['Vitaminas'] }
        const kw = catKw[categoria] || []
        return rentabilidadVsVolumen.filter(p => kw.some(k => p.producto.includes(k)))
    }, [categoria])

    const totalProductos = filteredCategorias.reduce((s, c) => s + c.productos, 0)
    const margenPromedio = filteredCategorias.length > 0 ? (filteredCategorias.reduce((s, c) => s + c.margenPromedio, 0) / filteredCategorias.length).toFixed(1) : '0'

    const trendLines = []
    if (categoria === 'Todas' || categoria === 'Electrónica') {
        trendLines.push({ key: 'laptop', color: '#06b6d4', name: 'Laptop HP' })
        trendLines.push({ key: 'monitor', color: '#8b5cf6', name: 'Monitor Dell' })
    }
    if (categoria === 'Todas' || categoria === 'Ropa') trendLines.push({ key: 'camiseta', color: '#10b981', name: 'Camiseta Sport' })

    const abcColumns = [
        { key: 'producto', label: 'Producto' },
        { key: 'ventas', label: 'Ventas', render: (v) => `$${v.toLocaleString()}` },
        { key: 'acumulado', label: 'Acumulado', render: (v) => `${v}%` },
        { key: 'clase', label: 'Clase', render: (v) => <span className={`status-badge ${v === 'A' ? 'success' : v === 'B' ? 'warning' : 'danger'}`}>Clase {v}</span> },
    ]

    return (
        <>
            <Header title="Dashboard de Productos" subtitle="Análisis ABC, rotación y rentabilidad" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Categoría" value={categoria} onChange={setCategoria} options={filtrosProductos.categorias} />
                    <FilterSelect label="Estado" value={estado} onChange={setEstado} options={filtrosProductos.estados} />
                    <FilterSelect label="Clase ABC" value={claseABC} onChange={setClaseABC} options={filtrosProductos.claseABC} />
                    <FilterSelect label="Rango Precio" value={rango} onChange={setRango} options={filtrosProductos.rangosPrecio} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="📦" iconColor="cyan" label="Productos Activos" value={totalProductos} change={5.2} changeType="positive" />
                    <KPICard icon="🔄" iconColor="purple" label="Rotación Prom." value="4.2x" change={1.8} changeType="positive" />
                    <KPICard icon="⚠️" iconColor="red" label="Stock Crítico" value="12" change={3.1} changeType="negative" />
                    <KPICard icon="💰" iconColor="green" label="Margen Promedio" value={`${margenPromedio}%`} change={2.4} changeType="positive" />
                </div>

                <div className="charts-grid">
                    <ChartCard title="Análisis ABC" subtitle="Clasificación por contribución a ventas">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredABC}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="producto" angle={-30} textAnchor="end" height={80} interval={0} tick={{ fontSize: 10 }} />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Bar dataKey="ventas" radius={[4, 4, 0, 0]} name="Ventas">
                                    {filteredABC.map((e, i) => <Cell key={i} fill={e.clase === 'A' ? '#10b981' : e.clase === 'B' ? '#f59e0b' : '#ef4444'} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Ventas por Categoría" subtitle="Distribución del revenue">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredCategorias} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(v) => `$${v / 1000}K`} />
                                <YAxis type="category" dataKey="categoria" width={85} />
                                <Tooltip formatter={(v) => typeof v === 'number' && v > 100 ? `$${v.toLocaleString()}` : v} />
                                <Bar dataKey="ventasTotales" fill="#06b6d4" radius={[0, 4, 4, 0]} name="Ventas" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Tendencia Productos Estrella" subtitle="Evolución mensual top productos">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredTendencia}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => v != null ? `$${v.toLocaleString()}` : ''} />
                                <Legend />
                                {trendLines.map(l => <Line key={l.key} type="monotone" dataKey={l.key} stroke={l.color} strokeWidth={2} dot={{ r: 3 }} name={l.name} />)}
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Rentabilidad vs Volumen" subtitle="Posición estratégica">
                        <ResponsiveContainer width="100%" height={280}>
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="volumen" name="Volumen" />
                                <YAxis type="number" dataKey="margen" name="Margen %" tickFormatter={(v) => `${v}%`} />
                                <ZAxis type="number" dataKey="ventas" range={[60, 400]} />
                                <Tooltip content={({ payload }) => {
                                    if (!payload?.length) return null
                                    const d = payload[0].payload
                                    return (<div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>
                                        <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>{d.producto}</div>
                                        <div style={{ color: 'var(--text-secondary)' }}>Vol: {d.volumen} | Margen: {d.margen}% | ${d.ventas.toLocaleString()}</div>
                                    </div>)
                                }} />
                                <Scatter data={filteredScatter} name="Productos">
                                    {filteredScatter.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Clasificación ABC" columns={abcColumns} data={filteredABC} />
            </div>
        </>
    )
}
