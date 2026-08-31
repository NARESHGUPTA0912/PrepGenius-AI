package com.prepgeniusai.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.prepgeniusai.backend.model.Question;
import com.prepgeniusai.backend.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // GET /api/questions/session/{sessionId}
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getQuestionsBySession(
            @PathVariable String sessionId,
            Authentication authentication) {

        String userId = authentication.getName();

        try {

            List<Question> questions =
                    questionService.getQuestionsBySession(
                            sessionId,
                            userId
                    );

            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("count", questions.size());
            response.put("questions", questions);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            if ("Session not found".equals(e.getMessage())) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message", "Session not found"
                        ));
            }

            if ("Not authorized".equals(e.getMessage())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "success", false,
                                "message", "Not authorized"
                        ));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Server Error"
                    ));
        }
    }
}