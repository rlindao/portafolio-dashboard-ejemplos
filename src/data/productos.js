// Datos de ejemplo para el Dashboard de Productos
export const productosPorCategoria = [
    { categoria: 'Electrónica', productos: 45, ventasTotales: 185400, margenPromedio: 35 },
    { categoria: 'Ropa', productos: 120, ventasTotales: 124600, margenPromedio: 55 },
    { categoria: 'Alimentos', productos: 200, ventasTotales: 98200, margenPromedio: 22 },
    { categoria: 'Hogar', productos: 85, ventasTotales: 85700, margenPromedio: 42 },
    { categoria: 'Deportes', productos: 60, ventasTotales: 72300, margenPromedio: 38 },
    { categoria: 'Salud', productos: 90, ventasTotales: 58900, margenPromedio: 58 },
];

export const abcProductos = [
    { producto: 'Laptop HP 15"', ventas: 125000, acumulado: 18.5, clase: 'A' },
    { producto: 'Monitor Dell 27"', ventas: 68000, acumulado: 28.6, clase: 'A' },
    { producto: 'Camiseta Sport Pro', ventas: 45000, acumulado: 35.2, clase: 'A' },
    { producto: 'Aceite Oliva Premium', ventas: 38000, acumulado: 40.9, clase: 'A' },
    { producto: 'Juego Sábanas 400H', ventas: 32000, acumulado: 45.6, clase: 'A' },
    { producto: 'Set Mancuernas', ventas: 28000, acumulado: 49.8, clase: 'B' },
    { producto: 'Vitamina Complex', ventas: 24000, acumulado: 53.3, clase: 'B' },
    { producto: 'Teclado MX Keys', ventas: 21000, acumulado: 56.4, clase: 'B' },
    { producto: 'Zapatos Cuero Italiano', ventas: 19500, acumulado: 59.3, clase: 'B' },
    { producto: 'Arroz Extra', ventas: 18000, acumulado: 61.9, clase: 'B' },
    { producto: 'Auriculares BT', ventas: 16500, acumulado: 64.4, clase: 'B' },
    { producto: 'Colchón Premium', ventas: 15000, acumulado: 66.6, clase: 'B' },
    { producto: 'Proteína Whey', ventas: 13500, acumulado: 68.6, clase: 'C' },
    { producto: 'Chaqueta Outdoor', ventas: 12800, acumulado: 70.5, clase: 'C' },
    { producto: 'Mouse Ergonómico', ventas: 11200, acumulado: 72.2, clase: 'C' },
];

export const tendenciaProductosEstrella = [
    { mes: 'Ene', laptop: 8500, monitor: 4200, camiseta: 3200 },
    { mes: 'Feb', laptop: 7800, monitor: 4500, camiseta: 2900 },
    { mes: 'Mar', laptop: 10200, monitor: 5800, camiseta: 4100 },
    { mes: 'Abr', laptop: 9500, monitor: 5200, camiseta: 3800 },
    { mes: 'May', laptop: 11400, monitor: 6100, camiseta: 4500 },
    { mes: 'Jun', laptop: 10800, monitor: 5700, camiseta: 3900 },
    { mes: 'Jul', laptop: 12500, monitor: 6800, camiseta: 4200 },
    { mes: 'Ago', laptop: 13200, monitor: 7200, camiseta: 4800 },
    { mes: 'Sep', laptop: 11800, monitor: 6500, camiseta: 4300 },
    { mes: 'Oct', laptop: 14100, monitor: 7500, camiseta: 5100 },
    { mes: 'Nov', laptop: 15500, monitor: 8200, camiseta: 5800 },
    { mes: 'Dic', laptop: 17200, monitor: 9100, camiseta: 6200 },
];

export const rentabilidadVsVolumen = [
    { producto: 'Laptop HP', volumen: 520, margen: 35, ventas: 125000 },
    { producto: 'Monitor Dell', volumen: 380, margen: 37, ventas: 68000 },
    { producto: 'Camiseta Sport', volumen: 1200, margen: 60, ventas: 45000 },
    { producto: 'Aceite Premium', volumen: 2100, margen: 25, ventas: 38000 },
    { producto: 'Sábanas 400H', volumen: 280, margen: 40, ventas: 32000 },
    { producto: 'Set Mancuernas', volumen: 150, margen: 30, ventas: 28000 },
    { producto: 'Vitaminas', volumen: 850, margen: 60, ventas: 24000 },
    { producto: 'Teclado MX', volumen: 320, margen: 40, ventas: 21000 },
];

export const filtrosProductos = {
    categorias: ['Todas', 'Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes', 'Salud'],
    estados: ['Todos', 'Activo', 'Descontinuado', 'En Promoción'],
    claseABC: ['Todas', 'A', 'B', 'C'],
    rangosPrecio: ['Todos', '$0-$50', '$50-$200', '$200-$500', '$500+'],
};
