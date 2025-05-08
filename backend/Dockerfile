FROM openjdk:17-jdk-slim as build

# directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el pom.xml con las dependencias
COPY pom.xml .

# Descargar dependencias de Maven
RUN mvn dependency:go-offline

# Copia el código fuente al contenedor
COPY src ./src

# Realiza el build de la aplicación
RUN mvn clean package -DskipTests

# Imagen final con solo el jar necesario
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR generado desde la etapa de build
COPY --from=build /app/target/devops-0.0.1-SNAPSHOT.jar app.jar

# puerto
EXPOSE 8080

# Comando para ejecutar el JAR al iniciar el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]