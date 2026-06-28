# PLAN DE IMPLEMENTACIÓN: AGENTE DE IA - ATRIOS DIGITAL (2026)

Este documento detalla el paso a paso estructurado e incremental para levantar el ecosistema local de Atrios Digital en cualquier computadora que cuente con Docker y Node.js.

---

## 📋 PRE-REQUISITOS EN LA NUEVA PC
Antes de comenzar, asegúrate de tener instalado:
1. **Docker Desktop** (y que esté ejecutándose).
2. **Node.js** (versión 18 o superior).
3. **Git** (opcional, para control de versiones).

---

## 🚀 PASO A PASO DETALLADO

### HITO 1: PREPARACIÓN DE CONFIGURACIONES y ESTRUCTURA

#### Paso 1.1: Estructura de Carpetas del Proyecto
Asegúrate de que la raíz de tu proyecto (`atrios-agent-core/`) cuente con la siguiente distribución:
```bash
atrios-agent-core/
├── database/
│   └── schema.sql             # Script SQL de base de datos
├── docker/
│   ├── docker-compose.yml     # Orquestación de contenedores locales
│   ├── .env                   # Variables de entorno locales (crear a partir del example)
│   └── .env.example           # Plantilla de variables de entorno
├── prompts/
│   └── system_prompt.txt      # Prompt del Agente de IA para n8n/Gemini
├── n8n-workflows/
│   ├── core_agent_flow.json   # Flujo exportado del agente en n8n (se creará)
│   └── webhooks_handler.json  # Manejador de WhatsApp (se creará)
└── .gitignore                 # Exclusión de archivos sensibles
```

*Nota: Los archivos `schema.sql`, `docker-compose.yml`, `.env`, `.env.example`, `system_prompt.txt` y `.gitignore` ya se encuentran creados en esta carpeta.*

---

### HITO 2: LEVANTAR INFRAESTRUCTURA LOCAL

#### Paso 2.1: Iniciar Contenedores Docker
Abre una terminal (PowerShell o CMD) en la carpeta `docker/` del proyecto y ejecuta:
```bash
docker compose up -d
```
*Esto descargará y levantará cuatro contenedores:*
1.  **PostgreSQL (atrios-postgres)**: Base de datos relacional local en el puerto `5432`.
2.  **NocoDB (atrios-nocodb-crm)**: CRM visual para gestión y visualización de datos en `http://localhost:8000`.
3.  **n8n (atrios-n8n)**: Orquestador y Agente de IA en `http://localhost:5678`.
4.  **Evolution API (atrios-whatsapp-api)**: API de conexión con WhatsApp en el puerto `8080`.

#### Paso 2.2: Inicializar Esquema en PostgreSQL
Con los contenedores activos, inyecta el esquema de base de datos ejecutando el siguiente comando desde la raíz del proyecto:
```bash
docker exec -i atrios-postgres psql -U atrios_admin -d atrios_crm < database/schema.sql
```
*Este comando crea las tablas `clientes`, `tecnicos` y `servicios_tecnicos`.*

#### Paso 2.3: Configurar Conexión en NocoDB (CRM Visual)
1.  Abre un navegador e ingresa a `http://localhost:8000`.
2.  Crea tu cuenta de administrador en NocoDB.
3.  Crea un nuevo proyecto y selecciona **"Connect to new database"**.
4.  Completa los datos de conexión con PostgreSQL utilizando las credenciales locales de tu `.env`:
    *   **Database Type**: PostgreSQL
    *   **Host**: `postgres-db` (o `localhost` si accedes desde fuera del contenedor)
    *   **Port**: `5432`
    *   **User**: `atrios_admin`
    *   **Password**: `AtriosSecure2026!`
    *   **Database Name**: `atrios_crm`
5.  NocoDB leerá las tablas creadas en el Paso 2.2 automáticamente, sirviendo como el panel de gestión para Carlos (Coordinador) y Juan (Técnico).

---

### HITO 3: CONFIGURACIÓN EN n8n (AGENTE DE IA)

#### Paso 3.1: Configurar el Agente en n8n
1.  Ingresa a `http://localhost:5678`.
2.  Crea un nuevo Workflow.
3.  Añade un nodo de **AI Agent**.
4.  Configura el nodo utilizando el modelo de Gemini y copia las directrices del archivo [prompts/system_prompt.txt](file:///c:/Users/Paul%20Bendezu/Desktop/atrios-digital-transformation/prompts/system_prompt.txt) en el campo **System Prompt**.

#### Paso 3.2: Crear las Herramientas (Tools) en n8n
Dentro de n8n, crea y conecta al nodo del AI Agent las siguientes herramientas:
1.  **`get_camera_catalog` (Custom Tool / HTTP Request)**: Para obtener precios y stock del catálogo técnico.
2.  **`create_technical_ticket` (PostgreSQL Tool)**: Para insertar registros directamente en las tablas locales (`clientes` y `servicios_tecnicos`) cuando el agente de IA haya recolectado el Nombre, Dirección y Teléfono.

#### Paso 3.3: Configurar Webhook de Mensajería
1.  Crea un flujo manejador de webhook en n8n que escuche las peticiones de Evolution API.
2.  Conéctalo al flujo del Agente de IA para procesar el texto entrante y enviar la respuesta generada.

---

### HITO 4: VINCULACIÓN CON WHATSAPP Y PRUEBAS

#### Paso 4.1: Conectar WhatsApp con Evolution API
1.  Ingresa al panel o API de Evolution API (`http://localhost:8080`).
2.  Crea una instancia llamada `atrios_instance`.
3.  Genera y escanea el código QR desde la aplicación de WhatsApp de tu celular de pruebas para vincular la línea.

#### Paso 4.2: Prueba del Agente de IA
1.  Envía un mensaje de saludo o pregunta técnica sobre cámaras desde otro celular al número vinculado.
2.  Verifica que el agente te responda en el mismo idioma de forma automática (**HU01**).
3.  Simula el deseo de agendar una instalación y proporciona los 3 datos requeridos. Verifica que se cree automáticamente la cita en PostgreSQL y se visualice en NocoDB (**HU02**).

#### Paso 4.3: Carga de Evidencia Fotográfica (Técnico)
1.  En la interfaz móvil de NocoDB, simula ser el técnico Juan ingresando al ticket correspondiente.
2.  Sube una imagen local o captura una foto en el campo `evidencia_url` y cambia el estado del servicio a `Finalizado` (**HU03**).
