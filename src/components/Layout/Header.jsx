import { useTheme } from '../../context/ThemeContext'

export default function Header({ title, subtitle }) {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="header">
            <div className="header-title">
                <h1>{title}</h1>
                {subtitle && <span>{subtitle}</span>}
            </div>
            <div className="header-actions">
                <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
                    <span className="theme-toggle-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
                    <span className="theme-toggle-label">{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
                <div className="header-badge">
                    <span className="header-badge-dot"></span>
                    Datos en tiempo real
                </div>
            </div>
        </header>
    )
}
