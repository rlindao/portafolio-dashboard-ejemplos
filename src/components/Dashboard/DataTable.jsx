import { useState, useMemo } from 'react'

export default function DataTable({ title, columns, data, pageSize = 8 }) {
    const [sortKey, setSortKey] = useState(null)
    const [sortDir, setSortDir] = useState('asc')
    const [page, setPage] = useState(0)

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortDir('asc')
        }
    }

    const sorted = useMemo(() => {
        if (!sortKey) return data
        return [...data].sort((a, b) => {
            const aVal = a[sortKey]
            const bVal = b[sortKey]
            if (typeof aVal === 'number') return sortDir === 'asc' ? aVal - bVal : bVal - aVal
            return sortDir === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal))
        })
    }, [data, sortKey, sortDir])

    const totalPages = Math.ceil(sorted.length / pageSize)
    const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

    return (
        <div className="data-table-container">
            <div className="data-table-header">
                <div className="data-table-title">{title}</div>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                    {data.length} registros
                </span>
            </div>
            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={sortKey === col.key ? 'sorted' : ''}
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label} {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map((row, i) => (
                            <tr key={i}>
                                {columns.map(col => (
                                    <td key={col.key}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--space-md) var(--space-lg)',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: 'var(--font-xs)', color: 'var(--text-muted)'
                }}>
                    <span>Página {page + 1} de {totalPages}</span>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        <button
                            className="filter-btn filter-btn-ghost"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            style={{ opacity: page === 0 ? 0.3 : 1 }}
                        >
                            ← Anterior
                        </button>
                        <button
                            className="filter-btn filter-btn-ghost"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            style={{ opacity: page >= totalPages - 1 ? 0.3 : 1 }}
                        >
                            Siguiente →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
