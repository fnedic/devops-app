# Etapa de compilación
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

# Copia pom.xml y descarga dependencias primero
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia el resto del código
COPY src ./src

# Compila y empaqueta el proyecto
RUN mvn clean package -DskipTests

# Etapa final - solo Java, sin Maven
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia el jar desde la etapa anterior
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
