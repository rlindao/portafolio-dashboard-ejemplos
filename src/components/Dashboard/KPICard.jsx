export default function KPICard({ icon, iconColor = 'cyan', label, value, change, changeType = 'positive' }) {
    return (
        <div className="kpi-card">
            <div className="kpi-card-header">
                <div className={`kpi-card-icon ${iconColor}`}>
                    {icon}
                </div>
                {change !== undefined && (
                    <span className={`kpi-card-change ${changeType}`}>
                        {changeType === 'positive' ? '▲' : '▼'} {Math.abs(change)}%
                    </span>
                )}
            </div>
            <div className="kpi-card-label">{label}</div>
            <div className="kpi-card-value">{value}</div>
        </div>
    )
}
