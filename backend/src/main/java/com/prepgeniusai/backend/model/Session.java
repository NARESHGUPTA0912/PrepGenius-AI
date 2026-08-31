package com.prepgeniusai.backend.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "sessions")
public class Session {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String role;

    private int experience;

    @Builder.Default
    private List<String> topicsToFocus = new ArrayList<>();

    @Builder.Default
    private String description = "";

    @Builder.Default
    private List<String> questions = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}