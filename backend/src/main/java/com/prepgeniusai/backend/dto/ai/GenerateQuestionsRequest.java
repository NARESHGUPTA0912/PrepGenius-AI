package com.prepgeniusai.backend.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenerateQuestionsRequest {

    @NotBlank
    private String sessionId;
}