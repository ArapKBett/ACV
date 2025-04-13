#!/bin/bash
echo "Building C component..."
gcc -o backend/c/encrypt backend/c/encrypt.c -lssl -lcrypto
if [ $? -ne 0 ]; then
    echo "C build failed"
    exit 1
fi

echo "Building C++ component..."
g++ -o backend/cpp/sniffer backend/cpp/sniffer.cpp -lpcap
if [ $? -ne 0 ]; then
    echo "C++ build failed"
    exit 1
fi

echo "Building Java component..."
cd backend/java
mvn clean package
if [ $? -ne 0 ]; then
    echo "Java build failed"
    exit 1
fi
cd ../..

echo "Build completed"
