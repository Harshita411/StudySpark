package com.aiassistant.studyassistant.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    // Only include fields that the user is allowed to change.
    private String email;
}
