package com.prepgeniusai.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prepgeniusai.backend.dto.ai.ExplanationResponse;
import com.prepgeniusai.backend.dto.ai.GenerateExplanationRequest;
import com.prepgeniusai.backend.dto.ai.GenerateQuestionsRequest;
import com.prepgeniusai.backend.model.Session;
import com.prepgeniusai.backend.service.AiService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate-questions")
    public ResponseEntity<?> generateQuestions(
            @RequestBody GenerateQuestionsRequest request,
            Authentication authentication) {

        String userId = authentication.getName();

        try {

            Session session = aiService.generateInterviewQuestions(
                    request.getSessionId(),
                    userId
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, session));

        } catch (RuntimeException e) {

            if ("Session not found".equals(e.getMessage())) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, e.getMessage()));
            }

            if ("Not authorized".equals(e.getMessage())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new ApiResponse(false, e.getMessage()));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, e.getMessage()));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            new ApiResponse(
                                    false,
                                    "Failed to generate questions"
                            )
                    );
        }
    }

    @PostMapping("/generate-explanation")
    public ResponseEntity<?> generateConceptExplanation(
            @Valid @RequestBody GenerateExplanationRequest request) {

        try {

            ExplanationResponse explanation =
                    aiService.generateConceptExplanation(
                            request.getQuestion()
                    );

            return ResponseEntity.ok(
                    new ApiResponse(
                            true,
                            explanation
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            new ApiResponse(
                                    false,
                                    "Failed to generate explanation"
                            )
                    );
        }
    }
    
    
    public record ApiResponse(
            boolean success,
            Object data
    ) {}
}