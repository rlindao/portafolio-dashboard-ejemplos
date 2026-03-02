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

    // Period filter for main chart
    const filteredFlujo = useMemo(() => {
        let data = flujoMensual
        if (periodo === 'Trimestral') data = data.filter((_, i) => i % 3 === 2) // Q-end months
        else if (periodo === 'Semestral') data = data.filter((_, i) => i === 5 || i === 11)
        return data
    }, [periodo])

    // Type filter for bar chart
    const filteredFlujoByType = useMemo(() => {
        return filteredFlujo.map(m => {
            if (tipo === 'Ingresos') return { ...m, egresos: 0 }
            if (tipo === 'Egresos') return { ...m, ingresos: 0 }
            return m
        })
    }, [filteredFlujo, tipo])

    // Saldo trend filtered by period
    const filteredSaldo = useMemo(() => {
        let data = tendenciaSaldo
        if (periodo === 'Trimestral') data = data.filter((_, i) => i % 3 === 2)
        else if (periodo === 'Semestral') data = data.filter((_, i) => i === 5 || i === 11)
        return data
    }, [periodo])

    // Gastos: if tipo=Ingresos, empty; if tipo=Egresos, full
    const filteredGastos = useMemo(() => {
        if (tipo === 'Ingresos') return []
        return composicionGastos
    }, [tipo])

    const lastMonth = flujoMensual[flujoMensual.length - 1]
    const saldoActual = tendenciaSaldo[tendenciaSaldo.length - 1].saldo

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
