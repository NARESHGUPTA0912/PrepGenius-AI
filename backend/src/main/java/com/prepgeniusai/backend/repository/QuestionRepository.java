package com.prepgeniusai.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepgeniusai.backend.model.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findBySessionId(String sessionId);
}