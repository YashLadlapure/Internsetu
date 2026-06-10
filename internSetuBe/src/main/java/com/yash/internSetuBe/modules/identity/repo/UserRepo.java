package com.yash.internSetuBe.modules.identity.repo;

import com.yash.internSetuBe.modules.identity.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;



@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    <T> Optional<T> findByEmail(String email, Class<T> type);

    Optional<User> findByActivationToken(String activationToken);

    @Query("SELECT u.isActive FROM User u WHERE u.email = :email")
    Boolean findIsActiveByEmail(@Param("email") String email);

    boolean existsByEmail(String email);



    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.resetPassToken = :resetPassToken, u.resetPassTokenExpiry = :resetPassTokenExpiry WHERE u.email = :email")
    void updatePassTokenByEmail(
            @Param("resetPassToken") String resetPassToken,
            @Param("resetPassTokenExpiry") LocalDateTime expiry,
            @Param("email") String email
    );

    Optional<User> findByResetPassToken(String resetPassToken);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.email = :email")
    void updatePasswordByEmail(@Param("password") String password, @Param("email") String email);
}
