# DOCUMENTO DE ESPECIFICACIÓN TÉCNICA: AGENTE DE IA - ATRIOS DIGITAL (2026)

---

## 🎓 PORTADA DEL PROYECTO ACADÉMICO
* **Institución:** Universidad Tecnológica del Perú (UTP)
* **Facultad:** Facultad de Ingeniería
* **Carrera:** Ingeniería de Sistemas e Informática
* **Asignatura:** Innovación Y Transformación Digital (Sección: 47333)
* **Docente:** Luis Alberto Loo Parián
* **Título del Proyecto:** Transformación Digital para la Optimización Operativa y Comercial de Atrios
* **Integrantes de Grupo:**
  * Bendezu Torres, Paul Juan
  * Garcia Vilca, David Fernando
  * Peña Peña, Jhair Aimar
* **Ubicación y Año:** Ica – Perú, 2026

---

## 1. INTRODUCCIÓN Y CONTEXTO GENERAL
La empresa Atrios (creada en 2024) se dedica a la prestación de servicios de instalación y mantenimiento de sistemas de seguridad electrónica (cámaras de videovigilancia, cercos eléctricos y alarmas). Al ser una microempresa en etapa inicial, sus operaciones iniciales dependían de dinámicas manuales y coordinaciones informales por WhatsApp, propensas a la pérdida de información y a la falta de trazabilidad.

El presente documento detalla el diseño del **Producto Mínimo Viable (MVP)** que incorpora Inteligencia Artificial (Gemini), orquestación y automatización (n8n), interfaces visuales (NocoDB) y persistencia estructurada (PostgreSQL).

---

## 2. SELECCIÓN DE TECNOLOGÍAS CLAVE (Stack Teórico vs. Simulación Local)

El proyecto académico plantea un stack en la nube. Para la simulación del MVP y validación del flujo en un entorno local y autónomo sin costos, se implementa la siguiente equivalencia técnica:

| Componente Teórico (Reporte) | Equivalente de Simulación Local (Docker) | Propósito del MVP |
| :--- | :--- | :--- |
| **Inteligencia Artificial**<br>Google AI Studio API (Gemini) | **Google Gemini Chat Model** en n8n | Analizar intenciones de chat, traducciones automáticas y extracción de datos del cliente. |
| **Automatización**<br>n8n Cloud | **n8n Local** (`atrios-n8n`) | El cerebro orquestador que interconecta la mensajería, la IA, el CRM y la base de datos. |
| **Gestión de Clientes (CRM)**<br>Zoho CRM | **Portal Web Atrios (React/Node)** | Panel visual a medida para Carlos (Coordinador) y Juan (Técnico) para gestionar el estado de tickets y chatear con la IA. |
| **Comunicación con Clientes**<br>WhatsApp Business API | **Evolution API** (`atrios-whatsapp-api`) | API local para conectar una cuenta de WhatsApp real mediante lectura de código QR y capturar eventos. |
| **Base de Datos y Almacenamiento**<br>Firebase/Supabase DB & Storage | **PostgreSQL 15** (`atrios-postgres`) y Almacenamiento Local | Persistencia estructurada de tablas de negocio y registro local de fotos de evidencia. |

---

## 3. HISTORIAS DE USUARIO (HU)

### HU01: Asesoramiento Inteligente en Videovigilancia (IA + Catálogo)
* **Como** Cliente de Atrios,
* **Quiero** recibir asesoría instantánea por WhatsApp sobre el tipo de cámara ideal (IP, Domo, Bala) según mis necesidades,
* **Para** resolver mis dudas técnicas y de cotización al instante.
* **Criterios de Aceptación:**
  1. El agente de IA procesa consultas (ej: *"quiero cuidar mi cochera de noche"*) y sugiere modelos (visión nocturna, IP67).
  2. Si el cliente escribe en otro idioma (ej: inglés), la IA traduce y responde fluidamente en dicho idioma.
  3. El agente de IA no inventa stock ni precios; usa la herramienta `get_camera_catalog` que sirve el catálogo estático en JSON.

### HU02: Captación Automatizada de Prospectos y Citas (AI Agent + PostgreSQL)
* **Como** Coordinador Operativo (Carlos),
* **Quiero** que el agente de IA extraiga automáticamente los datos del cliente durante el chat de WhatsApp,
* **Para** registrar la orden de trabajo en estado "Pendiente" en el CRM.
* **Criterios de Aceptación:**
  1. La IA debe recolectar y validar tres variables estrictas: *Nombre Completo*, *Dirección de Instalación* y *Número de Celular*.
  2. Al tener los tres datos, llama automáticamente a la herramienta `create_technical_ticket` insertando el cliente y la orden en PostgreSQL.
  3. Envía confirmación de agendamiento exitoso al cliente por WhatsApp.

### HU03: Cierre de Servicio y Registro de Evidencia Fotográfica (NocoDB / WhatsApp)
* **Como** Técnico de Campo (Juan),
* **Quiero** actualizar el estado del ticket a "Finalizado" y subir una foto del ángulo de visión de la cámara (vía PWA de NocoDB o enviando la foto directamente por WhatsApp),
* **Para** almacenar la evidencia y disparar una confirmación de garantía de servicio al cliente.
* **Criterios de Aceptación:**
  1. Juan puede adjuntar la foto y marcar finalizado en la vista móvil responsiva local de NocoDB.
  2. Alternativamente, Juan puede enviar la foto directamente por WhatsApp indicando el identificador del cliente (nombre o teléfono). El Agente de IA detecta el cierre, extrae los datos y ejecuta la herramienta `update_technical_ticket_evidence`.
  3. La imagen se asocia en la tabla PostgreSQL local y se dispara un mensaje de confirmación de garantía al cliente.

---

## 4. CASOS DE USO REALES (Mapeados al MVP de Simulación Local)

### 👥 ACTOR 1: EL CLIENTE
Su canal de interacción exclusivo es WhatsApp. No usa apps ni páginas web complejas.

#### Caso de Uso 1.1: Solicitar cotización o información de cámaras
* **Flujo Técnico Real:**
  1. El Cliente envía un mensaje de texto o audio por WhatsApp (ej: *"Hola, quiero cotizar 3 cámaras para mi tienda"*).
  2. La Evolution API (`atrios-whatsapp-api`) recibe el payload y gatilla un webhook hacia n8n.
  3. n8n procesa el mensaje (con Whisper si es voz) y le pasa el historial de conversación a Gemini.
  4. Gemini, entrenado con el catálogo real de Atrios mediante la herramienta `get_camera_catalog`, identifica los modelos (Domo o Bala) y responde con precios, características y requerimientos en el idioma del cliente.
  5. n8n devuelve la respuesta estructurada al cliente por WhatsApp.

#### Caso de Uso 1.2: Agendar visita técnica de instalación
* **Flujo Técnico Real:**
  1. El Cliente confirma por WhatsApp que desea el servicio de instalación.
  2. El Agente de IA (Gemini) detecta la intención y le solicita de forma secuencial: Nombre Completo, Dirección Exacta y Celular de contacto.
  3. Una vez provistos, n8n valida la información e invoca la herramienta `create_technical_ticket`.
  4. La herramienta ejecuta una inserción SQL atómica (`WITH ... INSERT ... ON CONFLICT DO UPDATE`) en la base de datos PostgreSQL (`atrios-postgres`) creando el cliente y el ticket en estado `Pendiente`.
  5. El sistema envía al cliente por WhatsApp la confirmación de la visita.

---

### 👥 ACTOR 2: EL COORDINADOR OPERATIVO (CARLOS)
Utiliza la interfaz de administración del portal web conectada a la base de datos PostgreSQL para la gestión del negocio.

#### Caso de Uso 2.1: Asignar y despachar órdenes de trabajo
* **Flujo Técnico Real:**
  1. Carlos abre la sección de administración del Portal Web (`http://localhost:3000/admin`) y visualiza las solicitudes en estado `Pendiente` (registradas automáticamente por el bot o el chat web).
  2. Revisa la disponibilidad de técnicos y selecciona al técnico correspondiente (ej. Juan) desde el selector de la UI.
  3. Al presionar "Guardar", la web ejecuta un `PUT` al backend el cual actualiza en PostgreSQL asociando el `id_tecnico` de Juan y cambiando el estado a `Asignado`.
  4. *(Opcional)* El sistema notifica al WhatsApp personal de Juan con la hoja de ruta y la dirección.

#### Caso de Uso 2.2: Control de calidad y auditoría postventa
* **Flujo Técnico Real:**
  1. Carlos accede al historial de un cliente en la sección `/admin` que reporta soporte o reclama problemas de visualización.
  2. El sistema consulta PostgreSQL y recupera la URL de la imagen de evidencia almacenada.
  3. Carlos visualiza el ángulo de visión original para determinar si fue manipulación del cliente o una falla de instalación.

---

### 👥 ACTOR 3: EL TÉCNICO DE CAMPO (JUAN)
Su interacción es móvil a través de la sección de operarios (`http://localhost:3000/tecnico`) del Portal Web.

#### Caso de Uso 3.1: Visualizar hoja de ruta e iniciar servicio
* **Flujo Técnico Real:**
  1. Juan abre la vista móvil de operarios del Portal Web en su celular (`http://localhost:3000/tecnico`) e ingresa su nombre en el selector.
  2. Consulta su lista de instalaciones asignadas del día y al llegar al domicilio presiona "Iniciar Trabajo".
  3. El sistema actualiza en PostgreSQL el estado de la orden a `En Proceso`.

#### Caso de Uso 3.2: Registrar evidencias y cerrar orden técnica
* **Flujo Técnico Real:**
  1. Juan finaliza la instalación, cableado y calibración de las cámaras de seguridad.
  2. **Opción A (Portal Móvil):** Presiona "Cerrar & Evidencia" en la vista de operarios, introduce la URL de evidencia de la foto y finaliza. La web actualiza en PostgreSQL la URL y el estado a `Finalizado`.
  3. **Opción B (WhatsApp):** Envía la fotografía directamente por WhatsApp. El Agente de IA detecta el cierre y ejecuta la herramienta de cierre actualizando PostgreSQL.
  4. En ambos flujos, PostgreSQL se actualiza, n8n detecta el cierre y gatilla un mensaje automático de confirmación de garantía de servicio al cliente.

---

## 5. ARQUITECTURA DE DATOS REAL (PostgreSQL)

```sql
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
    evidencia_url TEXT NULL, -- URL de almacenamiento local del archivo
    fecha_agenda DATE NOT NULL DEFAULT CURRENT_DATE,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. PROMPT DEL SISTEMA PARA EL AGENTE DE IA
(Disponible en [system_prompt.txt](file:///c:/Users/Paul%20Bendezu/Desktop/atrios-digital-transformation/prompts/system_prompt.txt)).