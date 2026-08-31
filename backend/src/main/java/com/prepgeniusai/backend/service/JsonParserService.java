package com.prepgeniusai.backend.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class JsonParserService {

    private final ObjectMapper objectMapper;

    public JsonParserService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public JsonNode parseObject(String rawText) {

        if (rawText == null || rawText.isBlank()) {
            throw new RuntimeException("Empty AI response");
        }

        String cleaned = cleanResponse(rawText);

        try {
            JsonNode node = objectMapper.readTree(cleaned);

            if (!node.isObject()) {
                throw new RuntimeException(
                        "Expected JSON object from AI"
                );
            }

            return node;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI response",
                    e
            );
        }
    }

    private String cleanResponse(String text) {

        String cleaned = text.trim();

        // Remove ```json ... ``` if Gemini returns it
        if (cleaned.startsWith("```")) {

            int firstNewLine = cleaned.indexOf("\n");

            if (firstNewLine != -1) {
                cleaned = cleaned.substring(firstNewLine + 1);
            }

            if (cleaned.endsWith("```")) {
                cleaned = cleaned.substring(
                        0,
                        cleaned.length() - 3
                );
            }
        }

        return cleaned.trim();
    }
}