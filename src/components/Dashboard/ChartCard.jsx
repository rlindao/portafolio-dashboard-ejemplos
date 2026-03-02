export default function ChartCard({ title, subtitle, children }) {
    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div>
                    <div className="chart-card-title">{title}</div>
                    {subtitle && <div className="chart-card-subtitle">{subtitle}</div>}
                </div>
            </div>
            {children}
        </div>
    )
}
