---
trigger: always_on
description: Reglas y estándares para el desarrollo del ecosistema local de Atrios (PostgreSQL, NocoDB, n8n, Evolution API).
---

## Contexto General
- **Ecosistema**: Docker Compose | **BD**: PostgreSQL 15 | **CRM/Panel**: NocoDB | **IA & Orquestación**: n8n + Gemini | **WhatsApp**: Evolution API
- **Idioma**: SIEMPRE español, saludando a Paul. Código, variables, base de datos y documentación en español.

---

## Estándares de Base de Datos (PostgreSQL)

### Diseño Relacional
- El script de base de datos se almacena en [schema.sql](file:///c:/Users/Paul%20Bendezu/Desktop/atrios-digital-transformation/database/schema.sql).
- Las tablas y columnas deben nombrarse en español (ej: `clientes`, `tecnicos`, `servicios_tecnicos`, `nombre_completo`).
- Integridad referencial estricta mediante llaves foráneas (`REFERENCES`).
- El campo `evidencia_url` almacenará las rutas locales de adjuntos generadas por NocoDB en su storage persistente.

---

## Flujos de n8n e IA (Gemini)

### Workflows y Prompts
- Los flujos de n8n exportados se deben guardar en la carpeta `n8n-workflows/` (ej: `core_agent_flow.json`, `webhooks_handler.json`).
- El Prompt de Sistema para el Agente de IA se debe mantener actualizado en un archivo plano en [system_prompt.txt](file:///c:/Users/Paul%20Bendezu/Desktop/atrios-digital-transformation/prompts/system_prompt.txt).
- El Agente de IA debe apegarse estrictamente a la extracción secuencial de los 3 datos requeridos (*Nombre Completo*, *Dirección* y *Número de Celular*) antes de agendar un ticket de servicio.

---

## Seguridad (OBLIGATORIO)

### 1. PROHIBIDO Hardcoding de Credenciales
NUNCA escribas contraseñas, URLs, tokens o API keys (como la de Gemini o Evolution API) en código o archivos de configuración expuestos.
Usa variables de entorno (`.env` o configuración interna de n8n/Docker) y referencias seguras.

### 2. docker-compose.yml Seguro
Las credenciales de PostgreSQL, NocoDB y puertos expuestos deben manejarse localmente de forma segura en la raíz del proyecto.
El volumen de datos de PostgreSQL debe ser persistente y local.

---

## Git y Commits

### Formato
- Prefijos: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`
- SIEMPRE español con viñetas detalladas.
- Ejemplo: `feat: docker-compose base` → `* Agregar servicio postgres` → `* Configurar volumen de datos persistente`

### Restricciones
- NO commits automáticos (el usuario los hace manualmente).
- NO merges automáticos.
- Ramas nuevas desde `develop`.
- PROHIBIDO `git add -f` de archivos en `.gitignore` o archivos `.env`.
- `memoria.md` NUNCA se sube al repositorio principal.

---

## Restricciones Generales

- Planes solo para tareas complejas (explícitas).
- NO usar navegador automático (el usuario valida manualmente).
- Actualizar `memoria.md` al finalizar o cambiar hitos significativos.
- La carpeta `docs/` requiere indicación explícita para su modificación.

---

## Respuesta

- Brevedad obligatoria, directo al grano.
- Sin redundancias, solo lo esencial.
- Español siempre.
