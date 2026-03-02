// Datos de ejemplo para Dashboard de Producción (MRP)
export const ordenesProduccion = [
    { mes: 'Ene', planificadas: 45, ejecutadas: 42, completadas: 40 },
    { mes: 'Feb', planificadas: 48, ejecutadas: 46, completadas: 44 },
    { mes: 'Mar', planificadas: 55, ejecutadas: 52, completadas: 50 },
    { mes: 'Abr', planificadas: 50, ejecutadas: 48, completadas: 46 },
    { mes: 'May', planificadas: 58, ejecutadas: 55, completadas: 53 },
    { mes: 'Jun', planificadas: 52, ejecutadas: 50, completadas: 48 },
    { mes: 'Jul', planificadas: 62, ejecutadas: 60, completadas: 58 },
    { mes: 'Ago', planificadas: 65, ejecutadas: 63, completadas: 60 },
    { mes: 'Sep', planificadas: 58, ejecutadas: 56, completadas: 54 },
    { mes: 'Oct', planificadas: 68, ejecutadas: 65, completadas: 63 },
    { mes: 'Nov', planificadas: 72, ejecutadas: 70, completadas: 68 },
    { mes: 'Dic', planificadas: 75, ejecutadas: 72, completadas: 70 },
]

export const eficienciaLineas = [
    { linea: 'Línea A', eficiencia: 92, produccion: 12500, defectos: 1.2 },
    { linea: 'Línea B', eficiencia: 87, produccion: 10800, defectos: 2.1 },
    { linea: 'Línea C', eficiencia: 95, produccion: 14200, defectos: 0.8 },
    { linea: 'Línea D', eficiencia: 83, produccion: 9600, defectos: 3.5 },
    { linea: 'Línea E', eficiencia: 90, produccion: 11900, defectos: 1.5 },
]

export const materialesCriticos = [
    { material: 'Acero Inoxidable', stock: 2500, minimo: 3000, unidad: 'kg', estado: 'Crítico', proveedor: 'MetalPro' },
    { material: 'Polímero ABS', stock: 1800, minimo: 1000, unidad: 'kg', estado: 'OK', proveedor: 'PlastiChem' },
    { material: 'PCB Electrónico', stock: 450, minimo: 500, unidad: 'uds', estado: 'Crítico', proveedor: 'CircuitTech' },
    { material: 'Empaque Cartón', stock: 8500, minimo: 5000, unidad: 'uds', estado: 'OK', proveedor: 'EcoPack' },
    { material: 'Tornillos M4', stock: 12000, minimo: 8000, unidad: 'uds', estado: 'OK', proveedor: 'FixAll' },
    { material: 'Pintura Epoxi', stock: 120, minimo: 200, unidad: 'lt', estado: 'Crítico', proveedor: 'ColorMax' },
    { material: 'Cable UTP', stock: 3200, minimo: 2000, unidad: 'm', estado: 'OK', proveedor: 'CableTech' },
    { material: 'Resina UV', stock: 85, minimo: 150, unidad: 'lt', estado: 'Crítico', proveedor: 'ChemSupply' },
]

export const defectosPorTipo = [
    { tipo: 'Dimensional', cantidad: 32, porcentaje: 28 },
    { tipo: 'Acabado', cantidad: 25, porcentaje: 22 },
    { tipo: 'Funcional', cantidad: 18, porcentaje: 16 },
    { tipo: 'Empaque', cantidad: 15, porcentaje: 13 },
    { tipo: 'Eléctrico', cantidad: 12, porcentaje: 10 },
    { tipo: 'Otros', cantidad: 13, porcentaje: 11 },
]

export const capacidadUtilizacion = [
    { mes: 'Ene', capacidad: 78 }, { mes: 'Feb', capacidad: 82 },
    { mes: 'Mar', capacidad: 88 }, { mes: 'Abr', capacidad: 85 },
    { mes: 'May', capacidad: 91 }, { mes: 'Jun', capacidad: 86 },
    { mes: 'Jul', capacidad: 93 }, { mes: 'Ago', capacidad: 95 },
    { mes: 'Sep', capacidad: 89 }, { mes: 'Oct', capacidad: 94 },
    { mes: 'Nov', capacidad: 96 }, { mes: 'Dic', capacidad: 92 },
]

export const ordenesPendientes = [
    { id: 'OP-301', producto: 'Laptop HP 15"', cantidad: 120, fechaInicio: '2025-12-08', fechaFin: '2025-12-15', estado: 'En Proceso', linea: 'Línea A', progreso: 65 },
    { id: 'OP-302', producto: 'Monitor Dell 27"', cantidad: 80, fechaInicio: '2025-12-09', fechaFin: '2025-12-14', estado: 'En Proceso', linea: 'Línea C', progreso: 42 },
    { id: 'OP-303', producto: 'Teclado MX Keys', cantidad: 250, fechaInicio: '2025-12-10', fechaFin: '2025-12-16', estado: 'Planificada', linea: 'Línea B', progreso: 0 },
    { id: 'OP-304', producto: 'Set Mancuernas', cantidad: 60, fechaInicio: '2025-12-10', fechaFin: '2025-12-13', estado: 'En Proceso', linea: 'Línea D', progreso: 78 },
    { id: 'OP-305', producto: 'Camiseta Sport Pro', cantidad: 500, fechaInicio: '2025-12-11', fechaFin: '2025-12-18', estado: 'Planificada', linea: 'Línea E', progreso: 0 },
    { id: 'OP-306', producto: 'Vitamina Complex', cantidad: 1000, fechaInicio: '2025-12-12', fechaFin: '2025-12-19', estado: 'Planificada', linea: 'Línea A', progreso: 0 },
    { id: 'OP-307', producto: 'Auriculares BT', cantidad: 200, fechaInicio: '2025-12-08', fechaFin: '2025-12-12', estado: 'Completada', linea: 'Línea C', progreso: 100 },
    { id: 'OP-308', producto: 'Mouse Ergonómico', cantidad: 300, fechaInicio: '2025-12-07', fechaFin: '2025-12-11', estado: 'Completada', linea: 'Línea B', progreso: 100 },
]

export const filtrosProduccion = {
    lineas: ['Todas', 'Línea A', 'Línea B', 'Línea C', 'Línea D', 'Línea E'],
    estados: ['Todos', 'Planificada', 'En Proceso', 'Completada'],
    periodos: ['Anual', 'Q1', 'Q2', 'Q3', 'Q4'],
}
