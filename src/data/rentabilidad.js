// Datos de ejemplo para el Dashboard de Rentabilidad
export const rentabilidadMensual = [
    { mes: 'Ene', ingresos: 42500, costos: 28900, margen: 32 },
    { mes: 'Feb', ingresos: 38900, costos: 27200, margen: 30 },
    { mes: 'Mar', ingresos: 51200, costos: 33800, margen: 34 },
    { mes: 'Abr', ingresos: 47800, costos: 31700, margen: 34 },
    { mes: 'May', ingresos: 53400, costos: 34700, margen: 35 },
    { mes: 'Jun', ingresos: 49100, costos: 33400, margen: 32 },
    { mes: 'Jul', ingresos: 58700, costos: 37100, margen: 37 },
    { mes: 'Ago', ingresos: 62300, costos: 38900, margen: 38 },
    { mes: 'Sep', ingresos: 56800, costos: 36900, margen: 35 },
    { mes: 'Oct', ingresos: 64100, costos: 39500, margen: 38 },
    { mes: 'Nov', ingresos: 71500, costos: 42900, margen: 40 },
    { mes: 'Dic', ingresos: 78200, costos: 45700, margen: 42 },
];

export const margenPorProducto = [
    { producto: 'Laptops', ingresos: 125000, costo: 78500, margen: 37 },
    { producto: 'Monitores', ingresos: 68000, costo: 42800, margen: 37 },
    { producto: 'Camisetas', ingresos: 45000, costo: 18000, margen: 60 },
    { producto: 'Aceites', ingresos: 38000, costo: 28500, margen: 25 },
    { producto: 'Sábanas', ingresos: 32000, costo: 19200, margen: 40 },
    { producto: 'Equipo Gym', ingresos: 28000, costo: 19600, margen: 30 },
    { producto: 'Vitaminas', ingresos: 24000, costo: 9600, margen: 60 },
    { producto: 'Teclados', ingresos: 21000, costo: 12600, margen: 40 },
];

export const desgloseCostos = [
    { tipo: 'Costo de Ventas', valor: 285600, porcentaje: 45 },
    { tipo: 'Personal', valor: 158700, porcentaje: 25 },
    { tipo: 'Logística', valor: 82400, porcentaje: 13 },
    { tipo: 'Marketing', val: 57200, porcentaje: 9 },
    { tipo: 'Admin & TI', valor: 38100, porcentaje: 6 },
    { tipo: 'Otros', valor: 12700, porcentaje: 2 },
];

export const comparativaPeriodos = [
    { periodo: 'Q1 2024', ingresos: 118400, utilidad: 35500 },
    { periodo: 'Q2 2024', ingresos: 135200, utilidad: 43300 },
    { periodo: 'Q3 2024', ingresos: 158800, utilidad: 54600 },
    { periodo: 'Q4 2024', ingresos: 192300, utilidad: 71200 },
    { periodo: 'Q1 2025', ingresos: 132600, utilidad: 42100 },
    { periodo: 'Q2 2025', ingresos: 150300, utilidad: 50500 },
    { periodo: 'Q3 2025', ingresos: 177800, utilidad: 63400 },
    { periodo: 'Q4 2025', ingresos: 213800, utilidad: 82100 },
];

export const filtrosRentabilidad = {
    periodos: ['Anual', 'Q1', 'Q2', 'Q3', 'Q4'],
    lineasProducto: ['Todas', 'Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes', 'Salud'],
    centrosCosto: ['Todos', 'Operaciones', 'Administración', 'Comercial', 'Logística'],
};
