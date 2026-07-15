-- Tabla de Clientes Únicos de Atrios
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,
    direccion TEXT NOT NULL,
    atendido_por_humano BOOLEAN DEFAULT FALSE,
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

-- Tabla de Citas de Visitas Técnicas
CREATE TABLE IF NOT EXISTS citas (
    id_cita SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    tipo_visita VARCHAR(50) DEFAULT 'Inspección Técnica',
    estado_cita VARCHAR(30) DEFAULT 'Programada', -- 'Programada', 'Reprogramada', 'Cancelada', 'Realizada'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Soporte de Incidencias Técnicas
CREATE TABLE IF NOT EXISTS soporte_incidencias (
    id_incidencia SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    descripcion_falla TEXT NOT NULL,
    estado_incidencia VARCHAR(30) DEFAULT 'Registrado', -- 'Registrado', 'En Proceso', 'Resuelto'
    prioridad VARCHAR(20) DEFAULT 'Media', -- 'Baja', 'Media', 'Alta'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reclamos Prioritarios
CREATE TABLE IF NOT EXISTS reclamos (
    id_reclamo SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    detalle_reclamo TEXT NOT NULL,
    estado_reclamo VARCHAR(30) DEFAULT 'Pendiente', -- 'Pendiente', 'Derivado', 'Solucionado'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Garantías de Equipos e Instalaciones
CREATE TABLE IF NOT EXISTS garantias (
    id_garantia SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    servicio_asociado VARCHAR(150) NOT NULL,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    meses_cobertura INT DEFAULT 12,
    estado_garantia VARCHAR(20) DEFAULT 'Activa', -- 'Activa', 'Vencida'
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Catálogo de Servicios y Productos de Atrios Digital
CREATE TABLE IF NOT EXISTS catalogo_servicios (
    id_producto SERIAL PRIMARY KEY,
    categoria       VARCHAR(50) NOT NULL,   -- 'Cámaras', 'Cercos', 'Alarmas', 'Mantenimiento', 'Soporte'
    nombre          VARCHAR(120) NOT NULL,
    descripcion     TEXT,
    precio_desde    NUMERIC(10, 2),         -- Precio mínimo en Soles (S/)
    precio_hasta    NUMERIC(10, 2),         -- Precio máximo en Soles (S/) para rangos
    moneda          VARCHAR(10) DEFAULT 'S/',
    caracteristicas TEXT,                   -- Características principales del producto/servicio
    disponible      BOOLEAN DEFAULT TRUE,
    creado_en       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
