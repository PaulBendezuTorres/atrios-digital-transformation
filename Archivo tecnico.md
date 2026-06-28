Aquí tienes el documento técnico definitivo AGENTE_TECNICO.md actualizado para tu repositorio atrios-agent-core.  Está optimizado para una infraestructura 100% local usando PostgreSQL como motor relacional interno y NocoDB como tu panel visual de gestión y CRM. Esta configuración está blindada para tu sustentación en la UTP porque no depende de servidores externos ni de conexiones lentas a internet.  Markdown# DOCUMENTO DE ESPECIFICACIÓN TÉCNICA: AGENTE DE IA - ATRIOS DIGITAL (2026)

Este repositorio contiene la arquitectura de software real y autónoma para la optimización operativa y comercial de Atrios, empresa especializada en la instalación y mantenimiento de cámaras de videovigilancia. La solución integra una API abierta de WhatsApp, un motor de automatización con Agentes de IA (n8n + Gemini) y un núcleo de datos relacional local (PostgreSQL) gestionado visualmente mediante NocoDB.

---

## 1. HISTORIAS DE USUARIO (Módulo de Cámaras y Agente)

### HU01: Asesoramiento Inteligente en Videovigilancia
*   **Como** Cliente residencial o comercial de Atrios[cite: 1],
*   **Quiero** que un agente de IA me recomiende el tipo de cámara ideal (IP, Domo, Bala) según mis necesidades de espacio y visualización[cite: 1],
*   **Para** recibir asesoría técnica instantánea por WhatsApp sin tener que esperar una respuesta manual[cite: 1].
*   **Criterios de Aceptación:**
    1. El agente debe procesar consultas en lenguaje natural (ej: *"quiero cuidar mi patio de noche"*) y sugerir modelos con visión nocturna o resolución específica[cite: 1].
    2. Si el cliente escribe en un idioma diferente al español, el agente debe activar su memoria de traducción automática y responder fluidamente en dicho idioma[cite: 1].
    3. No debe inventar stock ni precios; si no cuenta con la información en su base de conocimiento, debe usar la herramienta del catálogo técnico[cite: 1].

### HU02: Captación Automatizada de Prospectos y Citas
*   **Como** Coordinador Operativo (Carlos)[cite: 1],
*   **Quiero** que el agente de IA extraiga y valide de forma autónoma los datos del cliente durante la conversación de WhatsApp[cite: 1],
*   **Para** registrar automáticamente un ticket en estado "Pendiente" dentro de la base de datos sin intervención humana[cite: 1].
*   **Criterios de Aceptación:**
    1. El agente debe aislar estrictamente tres variables antes de ejecutar la acción: *Nombre Completo*, *Dirección de Instalación* y *Número de Celular*[cite: 1].
    2. Al recopilar los datos, debe llamar de forma autónoma a la herramienta de inserción de base de datos local[cite: 1].
    3. Debe confirmar al cliente de forma inmediata que sus datos han sido agendados con éxito[cite: 1].

### HU03: Cierre de Servicio y Registro de Evidencia Fotográfica
*   **Como** Técnico de Campo (Juan)[cite: 1],
*   **Quiero** actualizar el estado del servicio a "Finalizado" y subir una fotografía del ángulo de visión final de la cámara desde la interfaz móvil local de NocoDB[cite: 1],
*   **Para** almacenar un respaldo inmutable en el disco local para de auditorías de calidad y garantías postventa[cite: 1].
*   **Criterios de Aceptación:**
    1. El sistema (NocoDB) debe proveer una interfaz móvil responsiva local que active la cámara del celular al pulsar en el campo de adjuntos[cite: 1].
    2. La imagen se debe almacenar en el almacenamiento local indexado y retornar una URL local asociada al ID del ticket del cliente[cite: 1].
    3. Una vez insertado el registro, n8n debe disparar una confirmación automática al cliente indicando el inicio de su periodo de cobertura técnico[cite: 1].

---

## 2. CASOS DE USO TÉCNICOS DETALLADOS

         ┌──────────────────────────────────────────────────┐
         │            CASOS DE USO DEL AGENTE               │
         └──────────────────────────────────────────────────┘
[Cliente]  ───────► (CU01: Consultar Catálogo y Precios) ────┐───────► (CU02: Registrar Datos y Generar Cita) ──┼──► [AGENTE IA]│    (n8n + Gemini)[Carlos]   ───────► (CU03: Despachar y Asignar Orden) ───────┤         ││         ▼[Juan]     ───────► (CU04: Subir Foto de Ángulo y Cerrar) ───┘   [PostgreSQL +NocoDB Local]
### CU01: Consultar Catálogo y Precios de Cámaras
*   **Actor:** Cliente[cite: 1].
*   **Precondición:** El número celular de prueba de Atrios está vinculado a la Evolution API local y el contenedor de n8n está en ejecución[cite: 1].
*   **Flujo Principal:**
    1. El cliente envía un mensaje de texto por WhatsApp consultando por un sistema de cámaras[cite: 1].
    2. Evolution API atrapa el mensaje (Webhook) y lo transfiere al nodo *AI Agent* en n8n[cite: 1].
    3. El agente de IA ejecuta la herramienta integrada `get_camera_catalog` pasándole el término de búsqueda de manera interna.
    4. El agente recibe el JSON estructurado del catálogo y redacta una respuesta humana en WhatsApp[cite: 1].

### CU02: Registrar Datos y Generar Cita
*   **Actor:** Cliente / Agente de IA[cite: 1].
*   **Precondición:** El cliente manifestó explícitamente su deseo de contratar el servicio de instalación de cámaras[cite: 1].
*   **Flujo Principal:**
    1. El agente solicita de manera secuencial los datos requeridos (Nombre, Dirección, Celular)[cite: 1].
    2. El cliente escribe sus datos en uno o varios mensajes[cite: 1].
    3. El agente de IA analiza gramaticalmente la respuesta y formatea las variables en una estructura JSON.
    4. El agente ejecuta la herramienta `create_technical_ticket`.
    5. El backend realiza un `INSERT` en la base de datos PostgreSQL local con estado `Pendiente`[cite: 1].
    6. El agente envía un mensaje de WhatsApp confirmando el agendamiento[cite: 1].

### CU03: Despachar y Asignar Orden de Trabajo
*   **Actor:** Coordinador Operativo (Carlos)[cite: 1].
*   **Precondición:** Existen registros con estado `Pendiente` en la tabla de servicios técnicos[cite: 1].
*   **Flujo Principal:**
    1. Carlos abre la interfaz web de NocoDB (`http://localhost:8000`) y visualiza el listado de tickets[cite: 1].
    2. Selecciona un ticket de cámaras específico y le asigna el ID correspondiente al técnico Juan[cite: 1].
    3. NocoDB realiza un `UPDATE` automático en la tabla PostgreSQL local cambiando el estado a `Asignado`[cite: 1].
    4. n8n detecta la actualización en el motor relacional y dispara una plantilla automatizada al WhatsApp del técnico Juan con la hoja de ruta y la dirección[cite: 1].

### CU04: Subir Foto de Ángulo y Cerrar Orden Técnica
*   **Actor:** Técnico de Campo (Juan)[cite: 1].
*   **Precondición:** El ticket está asignado, en estado `En Proceso` y las cámaras físicamente instaladas[cite: 1].
*   **Flujo Principal:**
    1. Juan accede a la vista móvil de NocoDB desde su celular en red local y selecciona su orden asignada[cite: 1].
    2. Cambia el estado a "Finalizado" mediante un menú desplegable[cite: 1].
    3. Presiona el botón de adjunto en la columna `evidencia_url`, captura el cuadro exacto del monitor que muestra el ángulo de cobertura de la cámara instalada y la sube[cite: 1].
    4. NocoDB almacena el archivo en su almacenamiento local y vincula de manera permanente la URL local de la imagen en la fila del cliente[cite: 1].

---

## 3. ARQUITECTURA DE DATOS REAL (Script SQL para PostgreSQL)

Estructura relacional única para mapear el negocio de Atrios sin redundancia de datos. Al correr Docker, este script se inyecta en la base de datos local y es leído automáticamente por NocoDB para generar la interfaz gráfica[cite: 1].

```sql
-- Tabla de Clientes Únicos de Atrios
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,
    direccion TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Personal Técnico
CREATE TABLE tecnicos (
    id_tecnico SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    estado_disponibilidad BOOLEAN DEFAULT TRUE
);

-- Tabla de Tickets de Instalación y Soporte de Cámaras
CREATE TABLE servicios_tecnicos (
    id_servicio SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente),
    id_tecnico INT REFERENCES tecnicos(id_tecnico) NULL,
    tipo_servicio VARCHAR(50) DEFAULT 'Instalación Cámaras',
    detalles_requerimiento TEXT,
    estado_servicio VARCHAR(30) DEFAULT 'Pendiente',
    evidencia_url TEXT NULL, -- URL local de la foto del ángulo de la cámara (Storage Local de NocoDB)
    fecha_agenda DATE NOT NULL DEFAULT CURRENT_DATE,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
4. ESPECIFICACIÓN DEL AGENTE DE IA (PROMPT DE SISTEMA)Esta es la configuración dura que se debe inyectar directamente en el campo System Prompt de tu nodo AI Agent en n8n conectando con Gemini[cite: 1]:PlaintextCONTEXTO OPERATIVO:
Eres "Atrios Digital Assistant", el agente automatizado experto en sistemas de seguridad electrónica, enfocado principalmente en la consultoría, cotización e instalación de cámaras de videovigilancia de alta definición. Trabajas interactuando con clientes mediante WhatsApp. Tu tono es profesional, conciso y técnico pero accesible.

REGLAS ESTRICTAS DE COMPORTAMIENTO:
1. FOCO EN CÁMARAS: Siempre que te pregunten por seguridad, orienta la solución hacia el catálogo de cámaras (Modelos Domo para interiores, Modelos Bala para exteriores con protección IP67 contra lluvia, Resoluciones 2K/4K y tecnologías con visión nocturna a color).
2. TRADUCCIÓN AUTOMÁTICA: Si un usuario inicia la conversación en inglés u otro idioma diferente al español, debes responder de manera nativa e inmediata en ese mismo idioma sin cambiar tu configuración de personalidad ni mencionar que estás traduciendo.
3. EXTRACCIÓN DE DATOS PARA CITAS: Cuando el cliente demuestre intenciones claras de agendar una instalación, cotización en campo o requiera soporte postventa por garantía, debes invocar tus herramientas solo si has recolectado de forma explícita estos tres campos obligatorios:
   - Nombre Completo del Cliente.
   - Dirección Exacta del lugar de instalación.
   - Número de Teléfono/Celular.
4. LÍMITES DE RESPUESTA: No inventes precios ni stock de equipos. Si no cuentas con la información, ejecuta la herramienta del catálogo técnico disponible en tu entorno para consultar los datos actualizados de Atrios.

USO DE HERRAMIENTAS (TOOLS):
- Si el cliente te pide detalles técnicos o precios de cámaras -> Llama a la herramienta 'get_camera_catalog'.
- Si el cliente te entrega sus 3 datos completos para agendar la visita -> Llama a la herramienta 'create_technical_ticket' pasando las variables en un formato JSON limpio y estructurado hacia la base de datos PostgreSQL local.
5. INFRAESTRUCTURA COMPLETA LOCAL (docker-compose.yml)Guarda este bloque en un archivo llamado docker-compose.yml en la raíz de tu proyecto para levantar todo el ecosistema local con un solo comando (docker-compose up -d)[cite: 1]:YAMLversion: '3.8'

networks:
  atrios-network:
    driver: bridge

volumes:
  n8n_storage:
  evolution_storage:
  postgres_data:
  nocodb_storage:

services:
  # 1. Base de Datos Única (PostgreSQL local - El motor de Atrios)
  postgres-db:
    image: postgres:15-alpine
    container_name: atrios-postgres
    restart: always
    environment:
      - POSTGRES_USER=atrios_admin
      - POSTGRES_PASSWORD=AtriosSecure2026!
      - POSTGRES_DB=atrios_crm
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - atrios-network

  # 2. El Emulador del CRM (NocoDB) - Interfaz para Carlos y Juan
  nocodb:
    image: nocodb/nocodb:latest
    container_name: atrios-nocodb-crm
    restart: always
    ports:
      - "8000:8000"
    environment:
      - NC_DB=pg://postgres-db:5432?u=atrios_admin&p=AtriosSecure2026!&d=atrios_crm
    volumes:
      - nocodb_storage:/usr/app/data
    depends_on:
      - postgres-db
    networks:
      - atrios-network

  # 3. El Cerebro (n8n con soporte para Agentes de IA)
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: atrios-n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - GENERIC_TIMEZONE=America/Lima
    volumes:
      - n8n_storage:/home/node/.n8n
    depends_on:
      - postgres-db
    networks:
      - atrios-network

  # 4. La API de WhatsApp (Evolution API - Lector de QR)
  evolution-api:
    image: atendareto/evolution-api:latest
    container_name: atrios-whatsapp-api
    restart: always
    ports:
      - "8080:8080"
    environment:
      - SERVER_TYPE=NODE
      - SERVER_PORT=8080
      - LOG_LEVEL=ERROR,WARN,INFO
      - DELAY_MESSAGES=true
      - MIN_DELAY=2000
      - MAX_DELAY=4000
    volumes:
      - evolution_storage:/evolution/instances
    networks:
      - atrios-network
6. ARQUITECTURA DEL REPOSITORIO DE GITBashatrios-agent-core/
│
├── database/
│   └── schema.sql             # El script SQL adjunto en este documento para las tablas de cámaras
├── docker/
│   └── docker-compose.yml     # Archivo YAML de infraestructura local para contenedores
├── n8n-workflows/
│   ├── core_agent_flow.json   # Exportación JSON de tu flujo de Agente Inteligente de n8n
│   └── webhooks_handler.json  # Manejador de las peticiones de WhatsApp de la Evolution API
└── prompts/
    └── system_prompt.txt      # Archivo plano con las instrucciones estructuradas del Agente