package com.prepgeniusai.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prepgeniusai.backend.dto.ai.ExplanationResponse;
import com.prepgeniusai.backend.dto.ai.GeneratedQuestion;
import com.prepgeniusai.backend.model.Question;
import com.prepgeniusai.backend.model.Session;
import com.prepgeniusai.backend.repository.QuestionRepository;
import com.prepgeniusai.backend.repository.SessionRepository;
import com.prepgeniusai.backend.util.PromptUtil;

@Service
public class AiService {

    private final GeminiService geminiService;
    private final JsonParserService jsonParserService;
    private final PromptService promptService;
    private final SessionRepository sessionRepository;
    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;

    public AiService(
            GeminiService geminiService,
            JsonParserService jsonParserService,
            PromptService promptService,
            SessionRepository sessionRepository,
            QuestionRepository questionRepository,
            ObjectMapper objectMapper) {

        this.geminiService = geminiService;
        this.jsonParserService = jsonParserService;
        this.promptService = promptService;
        this.sessionRepository = sessionRepository;
        this.questionRepository = questionRepository;
        this.objectMapper = objectMapper;
    }

    public Session generateInterviewQuestions(
            String sessionId,
            String userId) throws Exception {

        // 1. Find session
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));

        // 2. Check ownership
        if (!session.getUserId().equals(userId)) {
            throw new RuntimeException("Not authorized");
        }

        // 3. Build prompt
        String prompt = promptService.questionAnswerPrompt(
                session.getRole(),
                session.getExperience(),
                session.getTopicsToFocus(),
                10
        );

        // 4. Call Gemini
        String rawResponse = geminiService.generateContent(prompt);

        System.out.println("Raw Gemini response:");
        System.out.println(rawResponse);

        // 5. Clean possible markdown code fences
        String json = cleanJsonResponse(rawResponse);

        // 6. Convert JSON → Java objects
        List<GeneratedQuestion> generatedQuestions =
                objectMapper.readValue(
                        json,
                        new TypeReference<List<GeneratedQuestion>>() {}
                );

        // 7. Save questions
        List<Question> questions = new ArrayList<>();

        for (GeneratedQuestion generated : generatedQuestions) {

            Question question = Question.builder()
                    .sessionId(sessionId)
                    .question(generated.getQuestion())
                    .answer(
                            generated.getAnswer() != null
                                    ? generated.getAnswer()
                                    : "")
                    .note("")
                    .isPinned(false)
                    .build();

            questions.add(question);
        }

        List<Question> savedQuestions =
                questionRepository.saveAll(questions);

        // 8. Add question IDs to session
        List<String> questionIds = savedQuestions.stream()
                .map(Question::getId)
                .toList();

        session.getQuestions().addAll(questionIds);

        // 9. Save updated session
        return sessionRepository.save(session);
    }
    
    public ExplanationResponse generateConceptExplanation(
            String question) {

        String prompt =
                PromptUtil.conceptExplainPrompt(question);

        String rawResponse =
                geminiService.generateContent(prompt);

        JsonNode json =
                jsonParserService.parseObject(rawResponse);

        String title =
                json.path("title").asText();

        String explanation =
                json.path("explanation").asText();

        if (title.isBlank() || explanation.isBlank()) {
            throw new RuntimeException(
                    "AI response missing title or explanation"
            );
        }

        return new ExplanationResponse(
                title,
                explanation
        );
    }
    

    private String cleanJsonResponse(String response) {

        if (response == null || response.isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an empty response");
        }

        String json = response.trim();

        if (json.startsWith("```json")) {
            json = json.substring(7);
        } else if (json.startsWith("```")) {
            json = json.substring(3);
        }

        if (json.endsWith("```")) {
            json = json.substring(
                    0,
                    json.length() - 3
            );
        }

        return json.trim();
    }
}