-- Tabla de Clientes Únicos de Atrios
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,
    direccion TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Personal Técnico
CREATE TABLE IF NOT EXISTS tecnicos (
    id_tecnico SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    estado_disponibilidad BOOLEAN DEFAULT TRUE
);

-- Tabla de Tickets de Instalación y Soporte de Cámaras
CREATE TABLE IF NOT EXISTS servicios_tecnicos (
    id_servicio SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    id_tecnico INT REFERENCES tecnicos(id_tecnico) ON DELETE SET NULL,
    tipo_servicio VARCHAR(50) DEFAULT 'Instalación Cámaras',
    detalles_requerimiento TEXT,
    estado_servicio VARCHAR(30) DEFAULT 'Pendiente',
    evidencia_url TEXT NULL, -- URL local de la foto del ángulo de la cámara (Storage Local de NocoDB)
    fecha_agenda DATE NOT NULL DEFAULT CURRENT_DATE,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
