package com.prepgeniusai.backend.dto.session;

import java.time.Instant;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionResponse {

    private String id;

    private String userId;

    private String role;

    private int experience;

    private List<String> topicsToFocus;

    private String description;

    private List<QuestionResponse> questions;

    private Instant createdAt;

    private Instant updatedAt;
    
    
}