-- Limpiar tablas previas (opcional para evitar duplicados en pruebas)
TRUNCATE TABLE garantias, reclamos, soporte_incidencias, citas, servicios_tecnicos, tecnicos, clientes RESTART IDENTITY CASCADE;

-- 1. Insertar Técnicos de Campo de Atrios Digital
INSERT INTO tecnicos (nombre, telefono, estado_disponibilidad) VALUES
('Carlos Mendoza', '51987654321', TRUE),
('Juan Quispe', '51912345678', TRUE),
('Miguel Rivera', '51922334455', FALSE);

-- 2. Insertar Clientes
INSERT INTO clientes (nombre_completo, telefono, direccion, atendido_por_humano) VALUES
('Paul Bendezu Torres', '51946937294', 'Av. Javier Prado Este 4567, Santiago de Surco, Lima', FALSE),
('Inmobiliaria San José S.A.', '51988877766', 'Calle Las Begonias 123, San Isidro, Lima', FALSE),
('Residencial La Molina', '51955544433', 'Av. La Molina 789, La Molina, Lima', FALSE);

-- 3. Insertar Servicios Técnicos Ejecutados (Historial)
INSERT INTO servicios_tecnicos (id_cliente, id_tecnico, tipo_servicio, detalles_requerimiento, estado_servicio, evidencia_url, fecha_agenda) VALUES
(1, 1, 'Instalación Cámaras', 'Instalación de 4 cámaras IP 4K de seguridad y NVR de 8 canales.', 'Finalizado', 'http://localhost:8080/storage/evidencia_camaras_paul.jpg', '2026-01-15'),
(2, 2, 'Instalación Cerco Eléctrico', 'Instalación de cerco eléctrico perimetral homologado de 6 líneas.', 'Finalizado', 'http://localhost:8080/storage/evidencia_cerco_sanjose.jpg', '2026-02-10'),
(3, 1, 'Mantenimiento Correctivo', 'Reparación de cable de sensor de alarma perimetral.', 'Finalizado', NULL, '2026-03-01');

-- 4. Insertar Garantías Activas y Vencidas
INSERT INTO garantias (id_cliente, servicio_asociado, fecha_inicio, meses_cobertura, estado_garantia) VALUES
(1, 'Instalación de 4 Cámaras IP 4K de Seguridad', '2026-01-15', 12, 'Activa'),
(2, 'Instalación de Cerco Eléctrico Perimetral 6 Líneas', '2026-02-10', 12, 'Activa'),
(3, 'Mantenimiento de Sensor de Alarma Perimetral', '2025-05-20', 6, 'Vencida');

-- 5. Insertar algunas citas técnicas futuras para pruebas de reprogramación
INSERT INTO citas (id_cliente, fecha_cita, hora_cita, tipo_visita, estado_cita) VALUES
(1, '2026-07-20', '10:00:00', 'Inspección Técnica', 'Programada'),
(2, '2026-07-22', '15:30:00', 'Mantenimiento Preventivo', 'Programada');
