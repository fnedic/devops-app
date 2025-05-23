# DevOps App

> **Full‑stack demo para la cátedra C2 – muestra un pipeline CI/CD completo con contenedores, deploy automático y monitoreo APM.**

---

## Índice

1. [Descripción](#descripción)
2. [Stack tecnológico](#stack-tecnológico)
3. [Arquitectura](#arquitectura)
4. [Primeros pasos](#primeros-pasos)
5. [Variables de entorno](#variables-de-entorno)
6. [Scripts útiles](#scripts-útiles)
7. [Docker & Compose](#docker--compose)
8. [CI/CD en GitHub Actions](#cicd-en-github-actions)
9. [Monitoreo con New Relic](#monitoreo-con-new-relic)
10. [Pruebas](#pruebas)
11. [Convención de ramas](#convención-de-ramas)
12. [Road‑map](#road-map)
13. [Contribuciones](#contribuciones)
14. [Licencia](#licencia)
15. [Contacto](#contacto)

---

## Descripción

DevOps App es una aplicación web full‑stack que expone un CRUD mínimo y un endpoint `/upload` para testear CORS.  El objetivo pedagógico es **demostrar buenas prácticas DevOps**:

* Contenerización multi‑stage (frontend React + backend Spring Boot)
* Orquestación local via **Docker Compose**
* Pipeline **CI** con test, lint, build y push de imágenes
* **CD** hacia Zeabur usando imágenes del registry
* Observabilidad con **New Relic APM** para el backend

En producción corre en [https://devopsapp.zeabur.app](https://devopsapp.zeabur.app).

---

## Stack tecnológico

| Capa              | Tecnología        | Versión           | Rol                            |
| ----------------- | ----------------- | ----------------- | ------------------------------ |
| Frontend          | React + Vite      | React 18 / Vite 5 | SPA estática servida por Nginx |
| UI                | Material‑UI       | 5.x               | Componentes consistentes       |
| Backend           | Spring Boot       | 3.2.x             | API REST + JWT                 |
| Idioma            | Java 17 (Temurin) | 17.0.11           | Runtime                        |
| Persistencia      | MySQL             | 8.3               | Base relacional                |
| Contenedores      | Docker Engine     | 24.x              | Packaging                      |
| Orquestador local | Docker Compose    | 2.24              | Levanta los servicios          |
| CI/CD             | GitHub Actions    | ubuntu‑latest     | Tests + build + deploy         |
| Hosting           | Zeabur            | cloud             | One‑click rollback, TLS        |
| Observabilidad    | New Relic APM     | Agente 8.11       | Métricas + trazas              |

---

## Arquitectura

```
           +------------+        +-------------------+
  Browser  |  Frontend  |        |   New Relic APM   |
──────────▶|  (Nginx)   |────────▶  Error & Metrics  |
           +------------+        +-------------------+
                 │ 80                      ▲
                 │ HTTP                    │
                 ▼                        │
           +------------+ 8080   +-------------------+
           |  Backend   |────────▶     Zeabur        |
           |  Spring    |  JDBC  |  Revision store   |
           +------------+        +-------------------+
                 │
                 ▼
           +------------+
           |   MySQL    |
           +------------+
```

* **Revision History**: Zeabur guarda la metadada *serviceId / image tag*; el tag real vive en Docker Hub.
* Instrumentación New Relic mediante flag `-javaagent` inyectado en el contenedor backend.

---

## Primeros pasos

```bash
# 1. Cloná el repo
$ git clone https://github.com/fnedic/devops-app.git && cd devops-app

# 2. Definí tus variables locales
$ cp .env.example .env     # edita usuarios / passwords

# 3. Levantá todo
$ docker compose up --build

# 4. Probá el endpoint health
$ curl http://localhost:8080/health   # → 200 OK
```

La SPA estará disponible en [http://localhost:5173](http://localhost:5173) y el backend en [http://localhost:8080](http://localhost:8080).

---

## Variables de entorno

| Variable                | Ubicación               | Ejemplo                 | Descripción         |
| ----------------------- | ----------------------- | ----------------------- | ------------------- |
| `MYSQL_ROOT_PASSWORD`   | `.env`                  | `root`                  | Password root MySQL |
| `VITE_API_URL`          | build arg front         | `http://localhost:8080` | URL de la API       |
| `NEW_RELIC_LICENSE_KEY` | GitHub Secrets + Zeabur | `******`                | Credencial APM      |
| `SPRING_JWT_SECRET`     | GitHub Secrets + Zeabur | `super‑secret`          | Clave de firmas JWT |

---

## Scripts útiles

```bash
# Frontend
npm run lint      # ESLint
npm run dev       # Vite dev server
npm run build     # Build estático

# Backend
./mvnw test       # Ejecuta JUnit + Mockito
./mvnw spring-boot:run   # Corre localmente
```

---

## Docker & Compose

```bash
# Construir imágenes manualmente
$ docker build -t devops-app-frontend -f frontend/Dockerfile frontend
$ docker build -t devops-app-backend  -f backend/Dockerfile  backend

# Levantar stack completo
$ docker compose up -d

# Ver volúmenes y logs
$ docker volume ls
$ docker compose logs -f backend
```

Multi‑stage:

* **builder** (`maven:3.9-eclipse-temurin-17`) empaqueta el jar.
* **runtime** (`eclipse-temurin:17-jre`) lo corre con `-javaagent` de New Relic.

Imagen resultante: **≈ 120 MB**.

---

## CI/CD en GitHub Actions

1. `build-test`: levanta MySQL, corre tests, lint y build del front.
2. `publish-docker`: (main/developer) construye y sube imágenes con tag SHA + `latest`.
3. `deploy-zeabur`: (solo `main`) actualiza el servicio; historial de revisiones disponible para rollback.

Tiempo total: **\~4 min**.

---

## Monitoreo con New Relic

* Agente Java 8.11 añadido en `backend/Dockerfile`.
* Dashboards: Throughput, Response‑time p95, Error %.
* Alerta demo: *Error % > 1 % durante 5 min* → mail a `facu@ejemplo.com`.

Capturas en `docs/img/monitoring_*`.

---

## Pruebas

| Tipo            | Framework             | Cobertura                      |
| --------------- | --------------------- | ------------------------------ |
| Unit – backend  | JUnit 5 / Mockito     | 85 % líneas service layer      |
| Unit – frontend | React Testing Library | Render de `App` + botón Upload |

Se ejecutan en Actions (`mvn test && npm test -- --watchAll=false`).

---

## Convención de ramas

* `main` → producción (protección + review obligatorio)
* `developer` → integración continua
* `feature/*` → desarrollo diario

---

## Contribuciones

Por el momento no aceptamos contribuciones ya que se trata de una practica universitaria. 

---

## Licencia

Distribuido bajo la licencia **MIT**.  Ver `LICENSE` para más info.

---

## Contacto

**Facundo Nedic**
GitHub: [https://github.com/fnedic](https://github.com/fnedic)
**Eduardo Nicolas Zurbriggen**
GitHub: [https://github.com/Eduzurbriggen14](https://github.com/Eduzurbriggen14)