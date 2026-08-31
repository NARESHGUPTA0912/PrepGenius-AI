package com.prepgeniusai.backend.util;

public class PromptUtil {

    private PromptUtil() {
    }

    public static String conceptExplainPrompt(String question) {

        return """
                You are a senior developer explaining a concept to a junior developer.

                Explain the following interview question in depth:
                "%s"

                Structure your explanation like this:
                1. Start with a one-line definition in bold.
                2. Explain the concept in 2–3 short paragraphs.
                3. Use bullet points for any list of features, pros/cons, or steps.
                4. If relevant, include a small code example under 10 lines.
                5. End with a "Key Takeaway" line summarizing the concept in one sentence.

                Return ONLY a valid JSON object in this exact shape:

                {
                  "title": "Short, clear concept title (5 words max)",
                  "explanation": "**Definition:** ...\\n\\nParagraph...\\n\\n**Key Takeaway:** ..."
                }

                Do not include markdown code fences around the JSON.
                Do not include any text before or after the JSON.
                """.formatted(question);
    }
}