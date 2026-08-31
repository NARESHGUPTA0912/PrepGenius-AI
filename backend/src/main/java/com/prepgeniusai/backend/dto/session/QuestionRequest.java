package com.prepgeniusai.backend.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {

    private String question;

    private String answer;

    private String note;

    private boolean isPinned;
}