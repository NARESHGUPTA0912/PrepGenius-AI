package com.prepgeniusai.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

@Service
public class GeminiService {

    private final Client client;

    private static final String MODEL = "gemini-3.5-flash-lite";

    public GeminiService(
            @Value("${gemini.api-key}") String apiKey) {

        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String generateContent(String prompt) {

        try {

            GenerateContentResponse response =
                    client.models.generateContent(
                            MODEL,
                            prompt,
                            null
                    );

            return response.text();

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Gemini error: " + e.getMessage(),
                    e
            );
        }
    }
    
    
}