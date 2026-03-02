// Datos de ejemplo para el Dashboard de Ventas
export const ventasMensuales = [
    { mes: 'Ene', ventas: 42500, meta: 40000, transacciones: 156 },
    { mes: 'Feb', ventas: 38900, meta: 40000, transacciones: 143 },
    { mes: 'Mar', ventas: 51200, meta: 45000, transacciones: 189 },
    { mes: 'Abr', ventas: 47800, meta: 45000, transacciones: 172 },
    { mes: 'May', ventas: 53400, meta: 50000, transacciones: 201 },
    { mes: 'Jun', ventas: 49100, meta: 50000, transacciones: 184 },
    { mes: 'Jul', ventas: 58700, meta: 55000, transacciones: 218 },
    { mes: 'Ago', ventas: 62300, meta: 55000, transacciones: 234 },
    { mes: 'Sep', ventas: 56800, meta: 60000, transacciones: 211 },
    { mes: 'Oct', ventas: 64100, meta: 60000, transacciones: 245 },
    { mes: 'Nov', ventas: 71500, meta: 65000, transacciones: 268 },
    { mes: 'Dic', ventas: 78200, meta: 70000, transacciones: 295 },
];

export const ventasPorCategoria = [
    { categoria: 'Electrónica', ventas: 185400, porcentaje: 28 },
    { categoria: 'Ropa', ventas: 124600, porcentaje: 19 },
    { categoria: 'Alimentos', ventas: 98200, porcentaje: 15 },
    { categoria: 'Hogar', ventas: 85700, porcentaje: 13 },
    { categoria: 'Deportes', ventas: 72300, porcentaje: 11 },
    { categoria: 'Salud', ventas: 58900, porcentaje: 9 },
    { categoria: 'Otros', ventas: 49400, porcentaje: 5 },
];

export const topVendedores = [
    { nombre: 'María García', ventas: 98500, clientes: 45, region: 'Costa' },
    { nombre: 'Carlos López', ventas: 87200, clientes: 38, region: 'Sierra' },
    { nombre: 'Ana Martínez', ventas: 76800, clientes: 42, region: 'Costa' },
    { nombre: 'Pedro Sánchez', ventas: 71400, clientes: 35, region: 'Oriente' },
    { nombre: 'Laura Díaz', ventas: 65300, clientes: 31, region: 'Sierra' },
    { nombre: 'Juan Torres', ventas: 58900, clientes: 29, region: 'Costa' },
    { nombre: 'Sofía Herrera', ventas: 52100, clientes: 26, region: 'Sierra' },
    { nombre: 'Diego Castro', ventas: 47600, clientes: 24, region: 'Oriente' },
];

export const ventasPorRegion = [
    { region: 'Costa', ventas: 285600, porcentaje: 43 },
    { region: 'Sierra', ventas: 228400, porcentaje: 34 },
    { region: 'Oriente', ventas: 98700, porcentaje: 15 },
    { region: 'Insular', ventas: 61800, porcentaje: 8 },
];

export const detalleVentas = [
    { id: 'V-001', fecha: '2025-12-01', cliente: 'Empresa ABC', producto: 'Laptop HP', cantidad: 5, total: 4250.00, vendedor: 'María García', region: 'Costa', categoria: 'Electrónica' },
    { id: 'V-002', fecha: '2025-12-02', cliente: 'TechStore', producto: 'Monitor Dell', cantidad: 10, total: 3500.00, vendedor: 'Carlos López', region: 'Sierra', categoria: 'Electrónica' },
    { id: 'V-003', fecha: '2025-12-03', cliente: 'Distribuidora XYZ', producto: 'Camisetas Sport', cantidad: 200, total: 2800.00, vendedor: 'Ana Martínez', region: 'Costa', categoria: 'Ropa' },
    { id: 'V-004', fecha: '2025-12-04', cliente: 'Supermercado Central', producto: 'Aceite Premium', cantidad: 500, total: 3750.00, vendedor: 'Pedro Sánchez', region: 'Oriente', categoria: 'Alimentos' },
    { id: 'V-005', fecha: '2025-12-05', cliente: 'HomeDecor', producto: 'Juego de Sábanas', cantidad: 80, total: 2400.00, vendedor: 'Laura Díaz', region: 'Sierra', categoria: 'Hogar' },
    { id: 'V-006', fecha: '2025-12-06', cliente: 'FitGym', producto: 'Mancuernas Set', cantidad: 30, total: 1950.00, vendedor: 'Juan Torres', region: 'Costa', categoria: 'Deportes' },
    { id: 'V-007', fecha: '2025-12-07', cliente: 'FarmaVida', producto: 'Vitaminas Pack', cantidad: 150, total: 2250.00, vendedor: 'Sofía Herrera', region: 'Sierra', categoria: 'Salud' },
    { id: 'V-008', fecha: '2025-12-08', cliente: 'MegaTech', producto: 'Teclado Mecánico', cantidad: 45, total: 3150.00, vendedor: 'Diego Castro', region: 'Oriente', categoria: 'Electrónica' },
    { id: 'V-009', fecha: '2025-12-09', cliente: 'Modas El Rey', producto: 'Zapatos Cuero', cantidad: 60, total: 5400.00, vendedor: 'María García', region: 'Costa', categoria: 'Ropa' },
    { id: 'V-010', fecha: '2025-12-10', cliente: 'Bodega Andina', producto: 'Arroz Premium', cantidad: 1000, total: 1800.00, vendedor: 'Carlos López', region: 'Sierra', categoria: 'Alimentos' },
];

export const filtrosVentas = {
    regiones: ['Todas', 'Costa', 'Sierra', 'Oriente', 'Insular'],
    categorias: ['Todas', 'Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes', 'Salud', 'Otros'],
    vendedores: ['Todos', 'María García', 'Carlos López', 'Ana Martínez', 'Pedro Sánchez', 'Laura Díaz', 'Juan Torres', 'Sofía Herrera', 'Diego Castro'],
    periodos: ['Anual', 'Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4'],
};
