package com.prepgeniusai.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prepgeniusai.backend.model.Question;
import com.prepgeniusai.backend.model.Session;
import com.prepgeniusai.backend.repository.QuestionRepository;
import com.prepgeniusai.backend.repository.SessionRepository;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SessionRepository sessionRepository;

    public QuestionService(
            QuestionRepository questionRepository,
            SessionRepository sessionRepository) {

        this.questionRepository = questionRepository;
        this.sessionRepository = sessionRepository;
    }

    public List<Question> getQuestionsBySession(
            String sessionId,
            String userId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));

        // Check that this session belongs to the logged-in user
        if (!session.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized");
        }

        return questionRepository.findBySessionId(sessionId);
    }
}