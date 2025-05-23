# ──────────────────────────  1) Build ──────────────────────────
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# pom.xml está en la raíz del contexto
COPY pom.xml .
RUN mvn -q dependency:go-offline

# código fuente
COPY src ./src
RUN mvn -q clean package -DskipTests


# ──────────────────────────  2) Runtime ────────────────────────
FROM openjdk:17-jdk-slim
WORKDIR /app

# ── New Relic agent ────────────────────────────────────────────
ARG NR_VERSION=current
RUN set -e ; \
    apt-get update ; \
    apt-get install -y --no-install-recommends curl unzip ; \
    curl -fsSL "https://download.newrelic.com/newrelic/java-agent/newrelic-agent/${NR_VERSION}/newrelic-java.zip" \
        -o /tmp/nr.zip ; \
    unzip -j /tmp/nr.zip "*/newrelic.jar" -d /app ; \
    rm /tmp/nr.zip ; \
    apt-get purge -y --auto-remove curl unzip ; \
    rm -rf /var/lib/apt/lists/*

# tu fichero de configuración (está en la raíz del contexto)
COPY newrelic.yml /app/newrelic.yml

# ── Jar de la aplicación ───────────────────────────────────────
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_TOOL_OPTIONS="-javaagent:/app/newrelic.jar"
EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]


EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]
