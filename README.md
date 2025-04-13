# CyberVault

A cybersecurity toolkit combining C, C++, and Java with a React + Tailwind CSS frontend.

## Features
- **File Encryption/Decryption**: AES-256 encryption using C.
- **Packet Sniffing**: Real-time network analysis using C++ and libpcap.
- **Web Interface**: Manage operations via a React frontend.
- **API**: Java Spring Boot backend.

## Prerequisites
- Termux: `clang`, `g++`, `openjdk-17`, `maven`, `nodejs`, `libpcap-dev`, `openssl-dev`
- Render account for deployment

## Setup in Termux
1. Install dependencies:
   ```bash
   pkg install clang g++ openjdk-17 maven nodejs libpcap-dev openssl-dev


  Build Backend
  ` chmod +x backend/scripts/build.sh
./backend/scripts/build.sh`

Run Java API
`cd backend/java
mvn spring-boot:run`

Run Frontend 
`cd frontend
npm install
npm start`
