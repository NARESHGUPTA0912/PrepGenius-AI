package com.prepgeniusai.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PromptService {

    public String questionAnswerPrompt(
            String role,
            int experience,
            List<String> topicsToFocus,
            int numberOfQuestions) {

        String topics = topicsToFocus == null
                || topicsToFocus.isEmpty()
                ? "general topics for this role"
                : String.join(", ", topicsToFocus);

        return """
                You are a senior engineer conducting a technical interview.

                Generate exactly %d interview questions for the following profile:

                - Role: %s
                - Experience: %d years
                - Topics to focus on: %s

                Rules for each question:

                1. The "answer" field must be well-structured using markdown:
                   - Use **bold** for key terms
                   - Use bullet points or numbered lists where appropriate
                   - Add a short ```java ... ``` code block when relevant
                   - Keep code blocks under 10 lines
                   - Break the answer into short paragraphs
                   - Never create one wall of text

                2. Answers should be beginner-friendly but technically accurate.

                3. Difficulty should match the candidate's experience.

                IMPORTANT:

                - Generate EXACTLY %d questions.
                - Return ONLY a valid JSON array.
                - Do NOT include any text outside JSON.
                - Response must start with [ and end with ].
                - Each object must contain ONLY "question" and "answer".
                - Ensure the JSON is valid.
                - Ensure all strings are properly escaped.

                Example:

                [
                  {
                    "question": "What is inheritance in Java?",
                    "answer": "**Definition:** Inheritance allows..."
                  }
                ]
                """.formatted(
                        numberOfQuestions,
                        role,
                        experience,
                        topics,
                        numberOfQuestions);
    }

    public String conceptExplainPrompt(String question) {

        return """
                You are a senior developer explaining a concept to a junior developer.

                Explain the following interview question in depth:

                "%s"

                Structure your explanation like this:

                1. Start with a **one-line definition** in bold.
                2. Explain the concept in 2–3 short paragraphs.
                3. Use bullet points for features, pros/cons, or steps.
                4. If relevant, include a small Java code example under 10 lines.
                5. End with a **Key Takeaway** line summarizing the concept.

                Return ONLY a valid JSON object.

                Do not include any text outside JSON.

                Exact shape:

                {
                  "title": "Short, clear concept title",
                  "explanation": "**Definition:** ...\\n\\n...\\n\\n**Key Takeaway:** ..."
                }
                """.formatted(question);
    }
}