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
COPY frontend/package.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Final image
FROM openjdk:17-jdk-slim
WORKDIR /app
# Install compilers and libraries for C/C++
RUN apt-get update && apt-get install -y gcc g++ libssl-dev libpcap-dev
# Compile C and C++ binaries
COPY backend/c/encrypt.c ./backend/c/encrypt.c
COPY backend/cpp/sniffer.cpp ./backend/cpp/sniffer.cpp
RUN gcc -o backend/c/encrypt backend/c/encrypt.c -lssl -lcrypto
RUN g++ -o backend/cpp/sniffer backend/cpp/sniffer.cpp -lpcap
RUN chmod +x backend/c/encrypt backend/cpp/sniffer
COPY --from=backend /app/backend/java/target/*.jar app.jar
COPY --from=frontend /app/frontend/build ./static
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
