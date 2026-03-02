// Datos de ejemplo para el Dashboard de Flujo de Caja
export const flujoMensual = [
    { mes: 'Ene', ingresos: 42500, egresos: 35200, saldo: 7300 },
    { mes: 'Feb', ingresos: 38900, egresos: 33100, saldo: 5800 },
    { mes: 'Mar', ingresos: 51200, egresos: 41800, saldo: 9400 },
    { mes: 'Abr', ingresos: 47800, egresos: 39500, saldo: 8300 },
    { mes: 'May', ingresos: 53400, egresos: 42100, saldo: 11300 },
    { mes: 'Jun', ingresos: 49100, egresos: 44200, saldo: 4900 },
    { mes: 'Jul', ingresos: 58700, egresos: 45800, saldo: 12900 },
    { mes: 'Ago', ingresos: 62300, egresos: 47600, saldo: 14700 },
    { mes: 'Sep', ingresos: 56800, egresos: 46100, saldo: 10700 },
    { mes: 'Oct', ingresos: 64100, egresos: 48900, saldo: 15200 },
    { mes: 'Nov', ingresos: 71500, egresos: 52300, saldo: 19200 },
    { mes: 'Dic', ingresos: 78200, egresos: 55800, saldo: 22400 },
];

export const tendenciaSaldo = [
    { mes: 'Ene', saldo: 45300 },
    { mes: 'Feb', saldo: 51100 },
    { mes: 'Mar', saldo: 60500 },
    { mes: 'Abr', saldo: 68800 },
    { mes: 'May', saldo: 80100 },
    { mes: 'Jun', saldo: 85000 },
    { mes: 'Jul', saldo: 97900 },
    { mes: 'Ago', saldo: 112600 },
    { mes: 'Sep', saldo: 123300 },
    { mes: 'Oct', saldo: 138500 },
    { mes: 'Nov', saldo: 157700 },
    { mes: 'Dic', saldo: 180100 },
];

export const composicionGastos = [
    { tipo: 'Proveedores', valor: 185400, porcentaje: 35 },
    { tipo: 'Nómina', valor: 132500, porcentaje: 25 },
    { tipo: 'Arriendo', valor: 63600, porcentaje: 12 },
    { tipo: 'Servicios', valor: 42400, porcentaje: 8 },
    { tipo: 'Impuestos', valor: 37100, porcentaje: 7 },
    { tipo: 'Marketing', valor: 31800, porcentaje: 6 },
    { tipo: 'Logística', valor: 26500, porcentaje: 5 },
    { tipo: 'Otros', valor: 10600, porcentaje: 2 },
];

export const proyeccion30Dias = [
    { dia: 'Sem 1', proyectado: 18500, real: 19200 },
    { dia: 'Sem 2', proyectado: 16800, real: 17100 },
    { dia: 'Sem 3', proyectado: 21200, real: null },
    { dia: 'Sem 4', proyectado: 19800, real: null },
];

export const movimientosRecientes = [
    { id: 'M-001', fecha: '2025-12-10', concepto: 'Cobro Factura F-892', tipo: 'Ingreso', monto: 12500.00, cuenta: 'Banco Pichincha' },
    { id: 'M-002', fecha: '2025-12-10', concepto: 'Pago Proveedor TechParts', tipo: 'Egreso', monto: -8200.00, cuenta: 'Banco Pichincha' },
    { id: 'M-003', fecha: '2025-12-09', concepto: 'Cobro Factura F-890', tipo: 'Ingreso', monto: 5800.00, cuenta: 'Banco Guayaquil' },
    { id: 'M-004', fecha: '2025-12-09', concepto: 'Nómina Quincenal', tipo: 'Egreso', monto: -15600.00, cuenta: 'Banco Pichincha' },
    { id: 'M-005', fecha: '2025-12-08', concepto: 'Cobro Factura F-887', tipo: 'Ingreso', monto: 9400.00, cuenta: 'Banco Pacífico' },
    { id: 'M-006', fecha: '2025-12-08', concepto: 'Pago Arriendo Oficina', tipo: 'Egreso', monto: -3200.00, cuenta: 'Banco Guayaquil' },
    { id: 'M-007', fecha: '2025-12-07', concepto: 'Cobro Factura F-885', tipo: 'Ingreso', monto: 7200.00, cuenta: 'Banco Pichincha' },
    { id: 'M-008', fecha: '2025-12-07', concepto: 'Servicios Básicos', tipo: 'Egreso', monto: -1850.00, cuenta: 'Banco Pacífico' },
];

export const filtrosFlujoCaja = {
    periodos: ['Mensual', 'Trimestral', 'Semestral', 'Anual'],
    tipos: ['Todos', 'Ingresos', 'Egresos'],
    cuentas: ['Todas', 'Banco Pichincha', 'Banco Guayaquil', 'Banco Pacífico', 'Caja Chica'],
};
