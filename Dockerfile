# Build backend (Java)
FROM maven:3.8.5-openjdk-17 AS backend
WORKDIR /app/backend/java
COPY backend/java/pom.xml .
RUN mvn dependency:go-offline
COPY backend/java/src ./src
RUN mvn package

# Build frontend (React)
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Final image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend /app/backend/java/target/*.jar app.jar
COPY --from=frontend /app/frontend/build ./static
COPY backend/c/encrypt ./backend/c/encrypt
COPY backend/cpp/sniffer ./backend/cpp/sniffer
RUN apt-get update && apt-get install -y libssl-dev libpcap-dev && chmod +x backend/c/encrypt backend/cpp/sniffer
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
