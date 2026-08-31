package com.prepgeniusai.backend.dto.session;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponse {

    private String id;

    private String sessionId;

    private String question;

    private String answer;

    private String note;

    private boolean isPinned;

    private Instant createdAt;

    private Instant updatedAt;
}