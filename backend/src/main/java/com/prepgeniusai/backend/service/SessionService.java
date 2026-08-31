package com.prepgeniusai.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.prepgeniusai.backend.dto.session.CreateSessionRequest;
import com.prepgeniusai.backend.dto.session.QuestionRequest;
import com.prepgeniusai.backend.dto.session.QuestionResponse;
import com.prepgeniusai.backend.dto.session.SessionResponse;
import com.prepgeniusai.backend.model.Question;
import com.prepgeniusai.backend.model.Session;
import com.prepgeniusai.backend.repository.QuestionRepository;
import com.prepgeniusai.backend.repository.SessionRepository;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final QuestionRepository questionRepository;

    public SessionService(
            SessionRepository sessionRepository,
            QuestionRepository questionRepository) {

        this.sessionRepository = sessionRepository;
        this.questionRepository = questionRepository;
    }

    // Create a new session and linked questions
    public SessionResponse createSession(
            CreateSessionRequest request,
            String userId) {

        Session session = Session.builder()
                .userId(userId)
                .role(request.getRole().trim())
                .experience(request.getExperience())
                .topicsToFocus(
                        request.getTopicsToFocus() != null
                                ? request.getTopicsToFocus()
                                : new ArrayList<>())
                .description(
                        request.getDescription() != null
                                ? request.getDescription()
                                : "")
                .questions(new ArrayList<>())
                .build();

        Session savedSession = sessionRepository.save(session);
        
     // Store ID separately so it can safely be used inside the lambda
        String sessionId = savedSession.getId();

        List<String> questionIds = new ArrayList<>();

        if (request.getQuestions() != null
                && !request.getQuestions().isEmpty()) {

            List<Question> questions = request.getQuestions()
                    .stream()
                    .map(q -> createQuestion(q, sessionId))
                    .toList();

            List<Question> savedQuestions =
                    questionRepository.saveAll(questions);

            questionIds = savedQuestions.stream()
                    .map(Question::getId)
                    .toList();

            savedSession.setQuestions(
                    new ArrayList<>(questionIds));

            savedSession = sessionRepository.save(savedSession);
        }

        return buildSessionResponse(savedSession);
    }

    // Get all sessions belonging to logged-in user
    public List<SessionResponse> getMySessions(String userId) {

        List<Session> sessions =
                sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return sessions.stream()
                .map(this::buildSessionResponse)
                .toList();
    }

    // Get one session belonging to logged-in user
    public SessionResponse getSessionById(
            String sessionId,
            String userId) {

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));

        // Same authorization check as MERN
        if (!session.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized");
        }

        return buildSessionResponse(session);
    }

    private Question createQuestion(
            QuestionRequest request,
            String sessionId) {

        return Question.builder()
                .sessionId(sessionId)
                .question(request.getQuestion())
                .answer(
                        request.getAnswer() != null
                                ? request.getAnswer()
                                : "")
                .note(
                        request.getNote() != null
                                ? request.getNote()
                                : "")
                .isPinned(request.isPinned())
                .build();
    }

    private SessionResponse buildSessionResponse(
            Session session) {

        List<Question> questions =
                questionRepository.findBySessionId(session.getId());

        List<QuestionResponse> questionResponses =
                questions.stream()
                        .map(this::buildQuestionResponse)
                        .toList();

        return SessionResponse.builder()
                .id(session.getId())
                .userId(session.getUserId())
                .role(session.getRole())
                .experience(session.getExperience())
                .topicsToFocus(session.getTopicsToFocus())
                .description(session.getDescription())
                .questions(questionResponses)
                .createdAt(session.getCreatedAt())
                .updatedAt(session.getUpdatedAt())
                .build();
    }

    private QuestionResponse buildQuestionResponse(
            Question question) {

        return QuestionResponse.builder()
                .id(question.getId())
                .sessionId(question.getSessionId())
                .question(question.getQuestion())
                .answer(question.getAnswer())
                .note(question.getNote())
                .isPinned(question.isPinned())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .build();
    }
}