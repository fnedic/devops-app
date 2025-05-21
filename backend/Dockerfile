# Etapa de compilación
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

# Copia pom.xml y descarga dependencias primero
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Copia el resto del código
COPY src ./src
RUN mvn -q clean package -DskipTests

# Compila y empaqueta el proyecto
RUN mvn clean package -DskipTests

# Etapa final - solo Java, sin Maven
FROM openjdk:17-jdk-slim

WORKDIR /app

ARG NR_VERSION=latest
RUN curl -Ls "https://download.newrelic.com/newrelic/java-agent/newrelic-agent/${NR_VERSION}/newrelic-java.zip" \
    | bsdtar -xf- -C /app --strip-components=1 newrelic/newrelic.jar

# Copia el jar desde la etapa anterior
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_TOOL_OPTIONS="-javaagent:/app/newrelic.jar"

EXPOSE 8080

CMD ["java","-jar","/app/app.jar"]
