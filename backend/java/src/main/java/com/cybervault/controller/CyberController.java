package com.cybervault.controller;

import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
@RequestMapping("/api")
public class CyberController {

    @PostMapping("/encrypt")
    public String encryptFile(@RequestParam String input, @RequestParam String output, 
                            @RequestParam String key) {
        try {
            ProcessBuilder pb = new ProcessBuilder("./backend/c/encrypt", "encrypt", 
                                                input, output, key);
            pb.redirectErrorStream(true);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            process.waitFor();
            return result.toString();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/decrypt")
    public String decryptFile(@RequestParam String input, @RequestParam String output, 
                            @RequestParam String key) {
        try {
            ProcessBuilder pb = new ProcessBuilder("./backend/c/encrypt", "decrypt", 
                                                input, output, key);
            pb.redirectErrorStream(true);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            process.waitFor();
            return result.toString();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/sniff")
    public String sniffPackets(@RequestParam(required = false, defaultValue = "wlan0") String device) {
        try {
            ProcessBuilder pb = new ProcessBuilder("./backend/cpp/sniffer", device);
            pb.redirectErrorStream(true);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }
            process.waitFor();
            return result.toString();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
