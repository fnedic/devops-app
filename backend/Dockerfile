############################
# ── 1) Etapa de BUILD ──  #
############################
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# ① Dependencias primero → cachea mejor
COPY pom.xml .
RUN mvn -q dependency:go-offline

# ② Código + empaquetado (jar “fat” en target/)
COPY src ./src
RUN mvn -q clean package -DskipTests


#################################
# ── 2) Runtime (JRE + agente) ── #
#################################
FROM openjdk:17-jdk-slim
WORKDIR /app

## ── New Relic agent ─────────────────────────────
ARG NR_VERSION=latest              # ⇒ puedes fijar una versión concreta
# Instalo curl + bsdtar sólo para la descarga; luego los elimino
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl libarchive-tools \
 && curl -Ls "https://download.newrelic.com/newrelic/java-agent/newrelic-agent/${NR_VERSION}/newrelic-java.zip" \
      | bsdtar -xf- -C /app --strip-components=1 newrelic/newrelic.jar \
 && apt-get purge -y --auto-remove curl libarchive-tools \
 && rm -rf /var/lib/apt/lists/*

# Copio tu configuración (logs, trazas, etc.)
COPY newrelic/newrelic.yml /app/newrelic.yml

## ── App jar ─────────────────────────────────────
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

## ── Variables de entorno (el license_key vendrá vía secret) ──
ENV JAVA_TOOL_OPTIONS="-javaagent:/app/newrelic.jar"
# Ejemplo de defaults; si lo prefieres, déjalos sólo en el entorno de despliegue
ENV NEW_RELIC_APP_NAME=devops-grupo10

EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]

