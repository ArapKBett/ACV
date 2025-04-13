import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [encryptInput, setEncryptInput] = useState('');
  const [encryptOutput, setEncryptOutput] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [decryptOutput, setDecryptOutput] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [sniffDevice, setSniffDevice] = useState('wlan0');
  const [response, setResponse] = useState('');

  const handleEncrypt = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          input: encryptInput,
          output: encryptOutput,
          key: encryptKey,
        }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  const handleDecrypt = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          input: decryptInput,
          output: decryptOutput,
          key: decryptKey,
        }),
      });
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  const handleSniff = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/sniff?device=${sniffDevice}`);
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">CyberVault Dashboard</h1>

        {/* Encryption Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">File Encryption</h2>
          <input
            type="text"
            placeholder="Input File Path"
            className="border p-2 mb-2 w-full rounded"
            value={encryptInput}
            onChange={(e) => setEncryptInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Output File Path"
            className="border p-2 mb-2 w-full rounded"
            value={encryptOutput}
            onChange={(e) => setEncryptOutput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Encryption Key (max 31 chars)"
            className="border p-2 mb-2 w-full rounded"
            value={encryptKey}
            onChange={(e) => setEncryptKey(e.target.value)}
          />
          <button
            onClick={handleEncrypt}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Encrypt File
          </button>
        </div>

        {/* Decryption Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">File Decryption</h2>
          <input
            type="text"
            placeholder="Input File Path"
            className="border p-2 mb-2 w-full rounded"
            value={decryptInput}
            onChange={(e) => setDecryptInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Output File Path"
            className="border p-2 mb-2 w-full rounded"
            value={decryptOutput}
            onChange={(e) => setDecryptOutput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Decryption Key (max 31 chars)"
            className="border p-2 mb-2 w-full rounded"
            value={decryptKey}
            onChange={(e) => setDecryptKey(e.target.value)}
          />
          <button
            onClick={handleDecrypt}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Decrypt File
          </button>
        </div>

        {/* Packet Sniffing Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Network Packet Sniffer</h2>
          <input
            type="text"
            placeholder="Network Device (e.g., wlan0)"
            className="border p-2 mb-2 w-full rounded"
            value={sniffDevice}
            onChange={(e) => setSniffDevice(e.target.value)}
          />
          <button
            onClick={handleSniff}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
          >
            Start Sniffing
          </button>
        </div>

        {/* Response Section */}
        {response && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Response</h2>
            <pre className="bg-gray-100 p-4 rounded">{response}</pre>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
