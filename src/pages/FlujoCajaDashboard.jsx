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
import { flujoMensual, tendenciaSaldo, composicionGastos, proyeccion30Dias, movimientosRecientes, filtrosFlujoCaja } from '../data/flujoCaja'

const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6']

export default function FlujoCajaDashboard() {
    const [periodo, setPeriodo] = useState('Mensual')
    const [tipo, setTipo] = useState('Todos')
    const [cuenta, setCuenta] = useState('Todas')

    const activeFilters = useMemo(() => {
        const f = []
        if (periodo !== 'Mensual') f.push({ key: 'periodo', label: 'Período', value: periodo })
        if (tipo !== 'Todos') f.push({ key: 'tipo', label: 'Tipo', value: tipo })
        if (cuenta !== 'Todas') f.push({ key: 'cuenta', label: 'Cuenta', value: cuenta })
        return f
    }, [periodo, tipo, cuenta])

    const handleRemoveFilter = (key) => {
        if (key === 'periodo') setPeriodo('Mensual')
        if (key === 'tipo') setTipo('Todos')
        if (key === 'cuenta') setCuenta('Todas')
    }

    const filteredMovimientos = useMemo(() => {
        let data = movimientosRecientes
        if (tipo !== 'Todos') data = data.filter(m => tipo === 'Ingresos' ? m.tipo === 'Ingreso' : m.tipo === 'Egreso')
        if (cuenta !== 'Todas') data = data.filter(m => m.cuenta === cuenta)
        return data
    }, [tipo, cuenta])

    const filteredFlujo = useMemo(() => {
        let data = flujoMensual
        if (periodo === 'Trimestral') data = data.filter((_, i) => i % 3 === 2)
        else if (periodo === 'Semestral') data = data.filter((_, i) => i === 5 || i === 11)
        return data
    }, [periodo])

    const filteredFlujoByType = useMemo(() => {
        return filteredFlujo.map(m => {
            if (tipo === 'Ingresos') return { ...m, egresos: 0 }
            if (tipo === 'Egresos') return { ...m, ingresos: 0 }
            return m
        })
    }, [filteredFlujo, tipo])

    const filteredSaldo = useMemo(() => {
        let data = tendenciaSaldo
        if (periodo === 'Trimestral') data = data.filter((_, i) => i % 3 === 2)
        else if (periodo === 'Semestral') data = data.filter((_, i) => i === 5 || i === 11)
        return data
    }, [periodo])

    const filteredGastos = useMemo(() => {
        if (tipo === 'Ingresos') return []
        return composicionGastos
    }, [tipo])

    const lastMonth = flujoMensual[flujoMensual.length - 1]
    const saldoActual = tendenciaSaldo[tendenciaSaldo.length - 1].saldo

    // Computed gauge values
    const totalIngresos = filteredFlujo.reduce((s, m) => s + m.ingresos, 0)
    const totalEgresos = filteredFlujo.reduce((s, m) => s + m.egresos, 0)
    const ratioLiquidez = totalEgresos > 0 ? (totalIngresos / totalEgresos) : 0
    const dso = 42 // Demo: Days Sales Outstanding

    const movColumns = [
        { key: 'id', label: 'ID' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'concepto', label: 'Concepto' },
        { key: 'tipo', label: 'Tipo', render: (v) => <span className={`status-badge ${v === 'Ingreso' ? 'success' : 'danger'}`}>{v}</span> },
        { key: 'monto', label: 'Monto', render: (v) => <span style={{ color: v >= 0 ? 'var(--accent-tertiary)' : 'var(--accent-danger)', fontWeight: 600 }}>{v >= 0 ? '+' : ''}${Math.abs(v).toLocaleString('es-EC', { minimumFractionDigits: 2 })}</span> },
        { key: 'cuenta', label: 'Cuenta' },
    ]

    return (
        <>
            <Header title="Dashboard de Flujo de Caja" subtitle="Ingresos, egresos, saldo y proyecciones" />
            <div className="page-content">
                <FilterBar activeFilters={activeFilters} onRemoveFilter={handleRemoveFilter}>
                    <FilterSelect label="Período" value={periodo} onChange={setPeriodo} options={filtrosFlujoCaja.periodos} />
                    <FilterSelect label="Tipo" value={tipo} onChange={setTipo} options={filtrosFlujoCaja.tipos} />
                    <FilterSelect label="Cuenta" value={cuenta} onChange={setCuenta} options={filtrosFlujoCaja.cuentas} />
                </FilterBar>

                <div className="kpi-grid">
                    <KPICard icon="🏦" iconColor="cyan" label="Saldo Actual" value={`$${(saldoActual / 1000).toFixed(1)}K`} change={14.3} changeType="positive" />
                    <KPICard icon="📥" iconColor="green" label="Ingresos (Dic)" value={`$${(lastMonth.ingresos / 1000).toFixed(1)}K`} change={9.4} changeType="positive" />
                    <KPICard icon="📤" iconColor="red" label="Egresos (Dic)" value={`$${(lastMonth.egresos / 1000).toFixed(1)}K`} change={6.7} changeType="negative" />
                    <KPICard icon="🔮" iconColor="purple" label="Proyección 30d" value={`$${((saldoActual + 15000) / 1000).toFixed(1)}K`} change={8.3} changeType="positive" />
                </div>

                {/* Gauge section */}
                <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <ChartCard title="Días Calle (DSO)" subtitle="Promedio de días para cobrar">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={dso}
                                min={0}
                                max={90}
                                target={30}
                                label={`${dso} Días`}
                                sublabel="DSO Actual"
                                targetLabel="Target: 30 Días"
                                size={240}
                            />
                        </div>
                    </ChartCard>

                    <ChartCard title="Ratio de Liquidez" subtitle="Ingresos / Egresos (meta > 1.0)">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={ratioLiquidez * 100}
                                min={0}
                                max={200}
                                target={100}
                                label={ratioLiquidez.toFixed(2)}
                                sublabel="Ratio Corriente"
                                targetLabel="Meta: ≥ 1.00"
                                size={240}
                                colors={[
                                    { stop: 0, color: '#ef4444' },
                                    { stop: 0.35, color: '#f97316' },
                                    { stop: 0.5, color: '#f59e0b' },
                                    { stop: 0.6, color: '#10b981' },
                                    { stop: 0.8, color: '#10b981' },
                                    { stop: 1, color: '#06b6d4' },
                                ]}
                            />
                        </div>
                    </ChartCard>

                    <ChartCard title="Cobertura de Caja" subtitle="Meses de operación cubiertos">
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
                            <GaugeChart
                                value={3.8}
                                min={0}
                                max={12}
                                target={3}
                                label="3.8"
                                sublabel="Meses Cubiertos"
                                targetLabel="Mínimo: 3 meses"
                                unit=" meses"
                                size={240}
                                colors={[
                                    { stop: 0, color: '#ef4444' },
                                    { stop: 0.15, color: '#f97316' },
                                    { stop: 0.25, color: '#f59e0b' },
                                    { stop: 0.4, color: '#10b981' },
                                    { stop: 0.7, color: '#10b981' },
                                    { stop: 1, color: '#06b6d4' },
                                ]}
                            />
                        </div>
                    </ChartCard>
                </div>

                <div className="charts-grid">
                    <ChartCard title="Flujo Mensual" subtitle="Ingresos vs Egresos por mes">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={filteredFlujoByType}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="ingresos" fill="#10b981" radius={[4, 4, 0, 0]} name="Ingresos" />
                                <Bar dataKey="egresos" fill="#ef4444" radius={[4, 4, 0, 0]} name="Egresos" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Tendencia de Saldo" subtitle="Evolución del saldo acumulado">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={filteredSaldo}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                                <Line type="monotone" dataKey="saldo" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} name="Saldo" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Composición de Gastos" subtitle="Distribución por categoría">
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie data={filteredGastos.length ? filteredGastos : [{ tipo: 'Sin datos', porcentaje: 100 }]} cx="50%" cy="50%" innerRadius={55} outerRadius={100} dataKey="porcentaje" nameKey="tipo" label={({ tipo, porcentaje }) => filteredGastos.length ? `${tipo} ${porcentaje}%` : ''}>
                                    {(filteredGastos.length ? filteredGastos : [{}]).map((_, i) => <Cell key={i} fill={filteredGastos.length ? COLORS[i % COLORS.length] : '#334155'} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `${v}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Proyección 30 Días" subtitle="Flujo proyectado vs real">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={proyeccion30Dias}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dia" />
                                <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                                <Tooltip formatter={(v) => v !== null ? `$${v.toLocaleString()}` : 'Pendiente'} />
                                <Legend />
                                <Bar dataKey="proyectado" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Proyectado" />
                                <Bar dataKey="real" fill="#10b981" radius={[4, 4, 0, 0]} name="Real" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <DataTable title="Movimientos Recientes" columns={movColumns} data={filteredMovimientos} />
            </div>
        </>
    )
}
