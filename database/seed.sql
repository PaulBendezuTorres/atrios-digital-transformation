-- Limpiar tablas previas (orden correcto para respetar FK)
TRUNCATE TABLE garantias, reclamos, soporte_incidencias, citas, servicios_tecnicos, tecnicos, clientes, catalogo_servicios RESTART IDENTITY CASCADE;

-- 1. Técnicos de Campo de Atrios Digital
INSERT INTO tecnicos (nombre, telefono, estado_disponibilidad) VALUES
('Carlos Mendoza', '51987654321', TRUE),
('Juan Quispe', '51912345678', TRUE),
('Miguel Rivera', '51922334455', FALSE);

-- 2. Clientes
INSERT INTO clientes (nombre_completo, telefono, direccion, atendido_por_humano) VALUES
('Paul Bendezu Torres', '51946937294', 'Av. Javier Prado Este 4567, Santiago de Surco, Lima', FALSE),
('Inmobiliaria San José S.A.', '51988877766', 'Calle Las Begonias 123, San Isidro, Lima', FALSE),
('Residencial La Molina', '51955544433', 'Av. La Molina 789, La Molina, Lima', FALSE);

-- 3. Servicios Técnicos Ejecutados (Historial)
INSERT INTO servicios_tecnicos (id_cliente, id_tecnico, tipo_servicio, detalles_requerimiento, estado_servicio, evidencia_url, fecha_agenda) VALUES
(1, 1, 'Instalación Cámaras', 'Instalación de 4 cámaras IP 4K de seguridad y NVR de 8 canales.', 'Finalizado', 'http://localhost:8080/storage/evidencia_camaras_paul.jpg', '2026-01-15'),
(2, 2, 'Instalación Cerco Eléctrico', 'Instalación de cerco eléctrico perimetral homologado de 6 líneas.', 'Finalizado', 'http://localhost:8080/storage/evidencia_cerco_sanjose.jpg', '2026-02-10'),
(3, 1, 'Mantenimiento Correctivo', 'Reparación de cable de sensor de alarma perimetral.', 'Finalizado', NULL, '2026-03-01');

-- 4. Garantías
INSERT INTO garantias (id_cliente, servicio_asociado, fecha_inicio, meses_cobertura, estado_garantia) VALUES
(1, 'Instalación de 4 Cámaras IP 4K de Seguridad', '2026-01-15', 12, 'Activa'),
(2, 'Instalación de Cerco Eléctrico Perimetral 6 Líneas', '2026-02-10', 12, 'Activa'),
(3, 'Mantenimiento de Sensor de Alarma Perimetral', '2025-05-20', 6, 'Vencida');

-- 5. Citas Técnicas
INSERT INTO citas (id_cliente, fecha_cita, hora_cita, tipo_visita, estado_cita) VALUES
(1, '2026-07-20', '10:00:00', 'Inspección Técnica', 'Programada'),
(2, '2026-07-22', '15:30:00', 'Mantenimiento Preventivo', 'Programada');

-- 6. Catálogo Completo de Servicios y Productos de Atrios Digital
INSERT INTO catalogo_servicios (categoria, nombre, descripcion, precio_desde, precio_hasta, moneda, caracteristicas, disponible) VALUES

-- Cámaras de Seguridad
('Cámaras', 'Atrios Domo Indoor 2K',
 'Cámara domo de interior de alta resolución 2K (4MP) con detección de movimiento y audio bidireccional.',
 170.00, 170.00, 'S/',
 'Lente gran angular, detección de movimiento por IA, audio bidireccional, visión nocturna infrarroja, instalación incluida', TRUE),

('Cámaras', 'Atrios Domo Color Night 4K',
 'Cámara domo 4K para interiores con visión nocturna a color 24/7 y reducción de falsas alarmas.',
 285.00, 285.00, 'S/',
 'Resolución 4K (8MP), visión nocturna a color con luz cálida integrada, micrófono integrado, reducción de falsas alarmas por IA', TRUE),

('Cámaras', 'Atrios Bala Outdoor Extreme IP67 2K',
 'Cámara tipo bala para exteriores con protección IP67 y visión nocturna a color 24/7.',
 228.00, 228.00, 'S/',
 'Protección IP67 (lluvia y polvo), carcasa metálica anti-vandálica, reflector inteligente, visión nocturna a color, resolución 2K', TRUE),

('Cámaras', 'Atrios Bala Pro 4K IP67',
 'Cámara bala exterior 4K de largo alcance con detección perimetral de vehículos y personas.',
 361.00, 361.00, 'S/',
 'Resolución 4K (8MP), detección perimetral IA (vehículos y humanos), protección IP67, ranura micro SD, alcance nocturno hasta 40m', TRUE),

('Cámaras', 'Kit 2 Cámaras de Seguridad + Instalación',
 'Kit completo de 2 cámaras de seguridad (1 interior + 1 exterior) con instalación y cableado incluido.',
 580.00, 800.00, 'S/',
 'Incluye: 2 cámaras IP, cableado estructurado, instalación certificada, configuración de acceso remoto y 1 año de garantía', TRUE),

('Cámaras', 'Kit 4 Cámaras de Seguridad + NVR + Instalación',
 'Sistema completo de 4 cámaras con grabador NVR de 8 canales y disco duro de almacenamiento.',
 1100.00, 1500.00, 'S/',
 'Incluye: 4 cámaras IP, NVR 8 canales, disco duro 1TB, cableado estructurado, instalación y configuración completa, 1 año de garantía', TRUE),

-- Cercos Eléctricos
('Cercos', 'Cerco Eléctrico Perimetral 4 Líneas',
 'Instalación de cerco eléctrico de seguridad homologado de 4 líneas para propiedades medianas.',
 800.00, 1200.00, 'S/',
 'Cable galvanizado de alta tensión, central de control, sirena de alarma, protección perimetral, instalación incluida, 12 meses garantía', TRUE),

('Cercos', 'Cerco Eléctrico Perimetral 6 Líneas',
 'Instalación de cerco eléctrico de alta seguridad de 6 líneas para propiedades grandes o empresariales.',
 1200.00, 1800.00, 'S/',
 'Cable galvanizado de alta tensión, central de control avanzada, sirena de 120dB, protección reforzada, instalación incluida, 12 meses garantía', TRUE),

('Cercos', 'Pack Cerco Eléctrico + Sistema de Alarma',
 'Paquete combinado de cerco eléctrico de 6 líneas integrado con sistema de alarma domiciliaria.',
 1500.00, 2200.00, 'S/',
 'Cerco 6 líneas + alarma inalámbrica integrada, control por app, notificación en tiempo real, instalación profesional, 12 meses garantía', TRUE),

-- Sistemas de Alarma
('Alarmas', 'Sistema de Alarma Domiciliaria Básica',
 'Sistema de alarma para viviendas con sensores de puerta, ventana y movimiento.',
 450.00, 600.00, 'S/',
 'Central de alarma, 2 sensores de movimiento PIR, 2 sensores de puerta, sirena interior, teclado de control, instalación incluida', TRUE),

('Alarmas', 'Sistema de Alarma Empresarial',
 'Sistema de alarma profesional para oficinas, tiendas y locales comerciales con monitoreo 24/7.',
 900.00, 1400.00, 'S/',
 'Central empresarial, 4 sensores de movimiento, 4 sensores de puerta/ventana, sirena exterior, teclado LCD, batería de respaldo, instalación incluida', TRUE),

-- Mantenimiento Preventivo
('Mantenimiento', 'Mantenimiento Preventivo de Cámaras',
 'Visita técnica de mantenimiento preventivo para sistemas de videovigilancia instalados.',
 120.00, 180.00, 'S/',
 'Limpieza de lentes, revisión de cableado, actualización de firmware, ajuste de ángulos, comprobación de grabación y almacenamiento', TRUE),

('Mantenimiento', 'Mantenimiento Preventivo de Cerco Eléctrico',
 'Visita técnica de mantenimiento preventivo para cercos eléctricos perimetrales instalados.',
 150.00, 220.00, 'S/',
 'Revisión de tensión eléctrica, limpieza de aisladores, reajuste de cables, revisión de central de control, prueba de funcionamiento', TRUE),

-- Soporte Técnico
('Soporte', 'Visita de Diagnóstico Técnico',
 'Visita técnica especializada para diagnóstico y evaluación de sistemas de seguridad con reporte detallado.',
 80.00, 80.00, 'S/',
 'Diagnóstico completo del sistema, reporte técnico fotográfico, recomendaciones de mejora, cotización de correcciones si aplica', TRUE),

('Soporte', 'Garantía Postventa de Equipos e Instalación',
 'Cobertura de garantía post-instalación para equipos y mano de obra de Atrios Digital.',
 0.00, 0.00, 'S/',
 'Cobertura de 12 meses para equipos instalados por Atrios, incluye visita técnica sin costo adicional, respuesta en máximo 48 horas hábiles', TRUE);
