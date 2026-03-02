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
import GaugeChart from '../components/Dashboard/GaugeChart'
import {
    ordenesProduccion, eficienciaLineas, materialesCriticos,
    defectosPorTipo, capacidadUtilizacion, ordenesPendientes, filtrosProduccion
} from '../data/produccion'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

export default function ProduccionDashboard() {
    const [linea, setLinea] = useState('Todas')
    const [estadoOrden, setEstadoOrden] = useState('Todos')
    const [periodo, setPeriodo] = useState('Anual')

    const activeFilters = useMemo(() => {
        const f = []
        if (linea !== 'Todas') f.push({ key: 'linea', label: 'Línea', value: linea })
        if (estadoOrden !== 'Todos') f.push({ key: 'estado', label: 'Estado', value: estadoOrden })
        if (periodo !== 'Anual') f.push({ key: 'periodo', label: 'Período', value: periodo })
        return f
    }, [linea, estadoOrden, periodo])

    const handleRemoveFilter = (key) => {
        if (key === 'linea') setLinea('Todas')
        if (key === 'estado') setEstadoOrden('Todos')
        if (key === 'periodo') setPeriodo('Anual')
    }

    const filteredOrdenes = useMemo(() => {
        let data = ordenesPendientes
        if (linea !== 'Todas') data = data.filter(o => o.linea === linea)
        if (estadoOrden !== 'Todos') data = data.filter(o => o.estado === estadoOrden)
        return data
    }, [linea, estadoOrden])

    const filteredProduccionMensual = useMemo(() => {
        let data = ordenesProduccion
        if (periodo === 'Q1') data = data.slice(0, 3)
        else if (periodo === 'Q2') data = data.slice(3, 6)
        else if (periodo === 'Q3') data = data.slice(6, 9)
        else if (periodo === 'Q4') data = data.slice(9, 12)
        if (linea !== 'Todas') {
            const lineData = eficienciaLineas.find(l => l.linea === linea)
            const ratio = lineData ? lineData.eficiencia / 100 : 0.5
            data = data.map(m => ({
                ...m,
                planificadas: Math.round(m.planificadas * ratio * 0.3),
                ejecutadas: Math.round(m.ejecutadas * ratio * 0.3),
                completadas: Math.round(m.completadas * ratio * 0.3),
            }))
        }
        return data
    }, [periodo, linea])

    const filteredEficiencia = useMemo(() => {
        if (linea === 'Todas') return eficienciaLineas
        return eficienciaLineas.filter(l => l.linea === linea)
    }, [linea])

    const filteredCapacidad = useMemo(() => {
        let data = capacidadUtilizacion
        if (periodo === 'Q1') data = data.slice(0, 3)
        else if (periodo === 'Q2') data = data.slice(3, 6)
        else if (periodo === 'Q3') data = data.slice(6, 9)
        else if (periodo === 'Q4') data = data.slice(9, 12)
        return data
    }, [periodo])

    const totalPlan = filteredProduccionMensual.reduce((s, m) => s + m.planificadas, 0)
    const totalComp = filteredProduccionMensual.reduce((s, m) => s + m.completadas, 0)
    const cumplimiento = totalPlan > 0 ? ((totalComp / totalPlan) * 100) : 0
    const eficienciaPromedio = filteredEficiencia.length > 0
        ? (filteredEficiencia.reduce((s, l) => s + l.eficiencia, 0) / filteredEficiencia.length) : 0
    const matCriticos = materialesCriticos.filter(m => m.estado === 'Crítico').length
    const defectoRate = filteredEficiencia.length > 0
        ? (filteredEficiencia.reduce((s, l) => s + l.defectos, 0) / filteredEficiencia.length) : 0

    const ordenColumns = [
        { key: 'id', label: 'OP' },
        { key: 'producto', label: 'Producto' },
        { key: 'cantidad', label: 'Cantidad' },
        { key: 'linea', label: 'Línea' },
        { key: 'fechaInicio', label: 'Inicio' },
        { key: 'fechaFin', label: 'Fin' },
        {
            key: 'estado', label: 'Estado',
            render: (v) => <span className={`status-badge ${v === 'Completada' ? 'success' : v === 'En Proceso' ? 'warning' : ''}`}
                style={v === 'Planificada' ? { background: 'rgba(99,102,241,0.1)', color: '#818cf8' } : undefined}>{v}</span>
        },
        {
            key: 'progreso', label: 'Progreso',
            render: (v) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 6, borderRadius: 3, background: 'var(--border-color)', overflow: 'hidden' }}>
                        <div style={{ width: `${v}%`, height: '100%', borderRadius: 3, background: v === 100 ? '#10b981' : v > 50 ? '#06b6d4' : '#f59e0b', transition: 'width 0.5s ease' }} />
                    </div>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>{v}%</span>
                </div>
            )
        },
    ]

    return (
        <>
            <Header title="Dashboard de Producción (MRP)" subtitle="Planificación, eficiencia y control de calidad" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Línea" value={linea} onChange={setLinea} options={filtrosProduccion.lineas} />
                    <FilterSelect label="Estado OP" value={estadoOrden} onChange={setEstadoOrden} options={filtrosProduccion.estados} />
                    <FilterSelect label="Período" value={periodo} onChange={setPeriodo} options={filtrosProduccion.periodos} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="🏭" iconColor="cyan" label="Cumplimiento" value={`${cumplimiento.toFixed(1)}%`} change={3.2} changeType="positive" />
                    <KPICard icon="⚡" iconColor="purple" label="Eficiencia Prom." value={`${eficienciaPromedio.toFixed(1)}%`} change={1.8} changeType="positive" />
                    <KPICard icon="⚠️" iconColor="red" label="Materiales Críticos" value={matCriticos} change={2} changeType="negative" />
                    <KPICard icon="📋" iconColor="green" label="OPs Activas" value={filteredOrdenes.filter(o => o.estado !== 'Completada').length} change={5.0} changeType="positive" />
                </div>

                {/* Gauge section */}
                <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <ChartCard title="Cumplimiento de Plan" subtitle="Órdenes completadas vs planificadas">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={cumplimiento}
                                min={0}
                                max={100}
                                target={95}
                                label={`${cumplimiento.toFixed(1)}%`}
                                sublabel="Plan Completado"
                                targetLabel="Meta: 95%"
                                size={240}
                                colors={[
                                    { stop: 0, color: '#ef4444' },
                                    { stop: 0.5, color: '#f59e0b' },
                                    { stop: 0.7, color: '#f59e0b' },
                                    { stop: 0.85, color: '#10b981' },
                                    { stop: 1, color: '#06b6d4' },
                                ]}
                            />
                        </div>
                    </ChartCard>

                    <ChartCard title="Eficiencia General" subtitle="Eficiencia promedio de líneas activas">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={eficienciaPromedio}
                                min={0}
                                max={100}
                                target={90}
                                label={`${eficienciaPromedio.toFixed(1)}%`}
                                sublabel="Eficiencia OEE"
                                targetLabel="Meta: 90%"
                                size={240}
                                colors={[
                                    { stop: 0, color: '#ef4444' },
                                    { stop: 0.5, color: '#f59e0b' },
                                    { stop: 0.7, color: '#f59e0b' },
                                    { stop: 0.85, color: '#10b981' },
                                    { stop: 1, color: '#06b6d4' },
                                ]}
                            />
                        </div>
                    </ChartCard>

                    <ChartCard title="Tasa de Defectos" subtitle="Porcentaje promedio de defectos">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={defectoRate}
                                min={0}
                                max={5}
                                target={1.5}
                                label={`${defectoRate.toFixed(1)}%`}
                                sublabel="Tasa Defectos"
                                targetLabel="Meta: < 1.5%"
                                size={240}
                            />
                        </div>
                    </ChartCard>
                </div>

                <div className="charts-grid">
                    <ChartCard title="Órdenes de Producción" subtitle="Planificadas, ejecutadas y completadas">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredProduccionMensual}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="planificadas" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Planificadas" />
                                <Line type="monotone" dataKey="ejecutadas" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3 }} name="Ejecutadas" />
                                <Line type="monotone" dataKey="completadas" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Completadas" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Eficiencia por Línea" subtitle="Porcentaje de eficiencia operativa">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredEficiencia}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="linea" />
                                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                <Tooltip formatter={(v, name) => name === 'Eficiencia %' ? `${v}%` : v} />
                                <Bar dataKey="eficiencia" radius={[4, 4, 0, 0]} name="Eficiencia %">
                                    {filteredEficiencia.map((e, i) => <Cell key={i} fill={e.eficiencia >= 90 ? '#10b981' : e.eficiencia >= 85 ? '#06b6d4' : '#f59e0b'} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Defectos por Tipo" subtitle="Distribución de no conformidades">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie data={defectosPorTipo} cx="50%" cy="50%" innerRadius={55} outerRadius={100} dataKey="cantidad" nameKey="tipo" label={({ tipo, porcentaje }) => `${tipo} ${porcentaje}%`}>
                                    {defectosPorTipo.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `${v} defectos`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Utilización de Capacidad" subtitle="% de capacidad instalada utilizada">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredCapacidad}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
                                <Tooltip formatter={(v) => `${v}%`} />
                                <Line type="monotone" dataKey="capacidad" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} fill="rgba(6,182,212,0.1)" name="Capacidad %" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Órdenes de Producción" columns={ordenColumns} data={filteredOrdenes} />
            </div>
        </>
    )
}
