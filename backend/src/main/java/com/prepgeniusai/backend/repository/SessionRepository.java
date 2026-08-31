package com.prepgeniusai.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prepgeniusai.backend.model.Session;

public interface SessionRepository extends MongoRepository<Session, String> {

    List<Session> findByUserIdOrderByCreatedAtDesc(String userId);
}