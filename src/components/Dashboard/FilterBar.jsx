export default function FilterBar({ children, activeFilters = [], onRemoveFilter }) {
    return (
        <>
            <div className="filter-bar">
                <div className="filter-bar-label">
                    🔍 Filtros
                </div>
                {children}
            </div>
            {activeFilters.length > 0 && (
                <div className="filter-chips">
                    {activeFilters.map((filter, i) => (
                        <span key={i} className="filter-chip">
                            {filter.label}: {filter.value}
                            <button onClick={() => onRemoveFilter(filter.key)}>✕</button>
                        </span>
                    ))}
                </div>
            )}
        </>
    )
}

export function FilterSelect({ label, value, onChange, options }) {
    return (
        <div className="filter-group">
            <label>{label}</label>
            <select
                className="filter-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}
