package com.prepgeniusai.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.prepgeniusai.backend.dto.session.CreateSessionRequest;
import com.prepgeniusai.backend.dto.session.SessionResponse;
import com.prepgeniusai.backend.service.SessionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    // POST /api/sessions/create
    @PostMapping("/create")
    public ResponseEntity<?> createSession(
            @Valid @RequestBody CreateSessionRequest request,
            Authentication authentication) {

        String userId = authentication.getName();

        SessionResponse session =
                sessionService.createSession(request, userId);

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("session", session);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET /api/sessions/my-sessions
    @GetMapping("/my-sessions")
    public ResponseEntity<?> getMySessions(
            Authentication authentication) {

        String userId = authentication.getName();

        List<SessionResponse> sessions =
                sessionService.getMySessions(userId);

        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("count", sessions.size());
        response.put("sessions", sessions);

        return ResponseEntity.ok(response);
    }

    // GET /api/sessions/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getSessionById(
            @PathVariable String id,
            Authentication authentication) {

        String userId = authentication.getName();

        try {

            SessionResponse session =
                    sessionService.getSessionById(id, userId);

            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("session", session);

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