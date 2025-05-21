# ──────────────────────────  1) Build ──────────────────────────
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Descarga dependencias primero (capa de caché)
COPY backend/pom.xml .
RUN mvn -q dependency:go-offline

# Copia el código y empaqueta
COPY backend/src ./src
RUN mvn -q clean package -DskipTests


# ──────────────────────────  2) Runtime ────────────────────────
FROM openjdk:17-jdk-slim

WORKDIR /app

# ── New Relic agent ────────────────────────────────────────────
ARG NR_VERSION=latest           # opcional: fija versión concreta
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl libarchive-tools \
 && curl -Ls "https://download.newrelic.com/newrelic/java-agent/newrelic-agent/${NR_VERSION}/newrelic-java.zip" \
    | bsdtar -xOf- newrelic/newrelic.jar > /app/newrelic.jar \
 && apt-get purge -y --auto-remove curl libarchive-tools \
 && rm -rf /var/lib/apt/lists/*

# Copio **solo** tu configuración
COPY backend/newrelic.yml /app/newrelic.yml

# ── Jar de la aplicación ───────────────────────────────────────
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

# Activo el agente de NR
ENV JAVA_TOOL_OPTIONS="-javaagent:/app/newrelic.jar"

EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]
