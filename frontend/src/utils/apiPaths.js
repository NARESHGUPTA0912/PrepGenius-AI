const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8082";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    SIGNUP: `${BASE_URL}/api/auth/register`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/api/sessions/create`,
    GET_ALL: `${BASE_URL}/api/sessions/my-sessions`,
    GET_ONE: (id) => `${BASE_URL}/api/sessions/${id}`,
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/api/ai/generate-questions`,
    EXPLAIN: `${BASE_URL}/api/ai/generate-explanation`,
  },
};