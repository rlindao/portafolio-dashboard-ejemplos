// Datos de ejemplo para el Dashboard de Clientes
export const evolucionCartera = [
    { mes: 'Ene', activos: 320, nuevos: 18, perdidos: 5 },
    { mes: 'Feb', activos: 333, nuevos: 22, perdidos: 9 },
    { mes: 'Mar', activos: 346, nuevos: 25, perdidos: 12 },
    { mes: 'Abr', activos: 355, nuevos: 19, perdidos: 10 },
    { mes: 'May', activos: 368, nuevos: 28, perdidos: 15 },
    { mes: 'Jun', activos: 374, nuevos: 16, perdidos: 10 },
    { mes: 'Jul', activos: 389, nuevos: 30, perdidos: 15 },
    { mes: 'Ago', activos: 401, nuevos: 24, perdidos: 12 },
    { mes: 'Sep', activos: 412, nuevos: 20, perdidos: 9 },
    { mes: 'Oct', activos: 428, nuevos: 26, perdidos: 10 },
    { mes: 'Nov', activos: 445, nuevos: 32, perdidos: 15 },
    { mes: 'Dic', activos: 462, nuevos: 28, perdidos: 11 },
];

export const segmentacionClientes = [
    { segmento: 'Premium', cantidad: 58, porcentaje: 13, ticketPromedio: 1850 },
    { segmento: 'Corporativo', cantidad: 92, porcentaje: 20, ticketPromedio: 1200 },
    { segmento: 'PYME', cantidad: 168, porcentaje: 36, ticketPromedio: 680 },
    { segmento: 'Retail', cantidad: 144, porcentaje: 31, ticketPromedio: 320 },
];

export const topClientes = [
    { nombre: 'Empresa ABC', compras: 45200, frecuencia: 24, segmento: 'Premium', region: 'Costa' },
    { nombre: 'MegaTech', compras: 38700, frecuencia: 18, segmento: 'Corporativo', region: 'Sierra' },
    { nombre: 'Distribuidora XYZ', compras: 32100, frecuencia: 36, segmento: 'Premium', region: 'Costa' },
    { nombre: 'TechStore', compras: 28400, frecuencia: 15, segmento: 'Corporativo', region: 'Sierra' },
    { nombre: 'SuperMax', compras: 25600, frecuencia: 48, segmento: 'Premium', region: 'Costa' },
    { nombre: 'HomeDecor', compras: 21300, frecuencia: 12, segmento: 'Corporativo', region: 'Oriente' },
    { nombre: 'FitGym', compras: 18900, frecuencia: 20, segmento: 'PYME', region: 'Sierra' },
    { nombre: 'FarmaVida', compras: 16200, frecuencia: 24, segmento: 'PYME', region: 'Costa' },
    { nombre: 'Modas El Rey', compras: 14800, frecuencia: 10, segmento: 'PYME', region: 'Sierra' },
    { nombre: 'Bodega Andina', compras: 12500, frecuencia: 30, segmento: 'Retail', region: 'Oriente' },
];

export const frecuenciaCompra = [
    { rango: '1-2 veces', cantidad: 95 },
    { rango: '3-5 veces', cantidad: 142 },
    { rango: '6-10 veces', cantidad: 108 },
    { rango: '11-20 veces', cantidad: 72 },
    { rango: '21+ veces', cantidad: 45 },
];

export const filtrosClientes = {
    segmentos: ['Todos', 'Premium', 'Corporativo', 'PYME', 'Retail'],
    regiones: ['Todas', 'Costa', 'Sierra', 'Oriente', 'Insular'],
    antiguedad: ['Todas', '< 1 año', '1-3 años', '3-5 años', '5+ años'],
};
