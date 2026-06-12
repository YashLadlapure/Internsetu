package com.yash.internSetuBe.models;


import com.yash.internSetuBe.enums.NotificationType;
import com.yash.internSetuBe.modules.identity.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;

    private String  message;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private Boolean isRead;

    private String actionURl;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
