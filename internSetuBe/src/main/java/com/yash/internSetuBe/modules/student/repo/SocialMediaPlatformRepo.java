package com.yash.internSetuBe.modules.student.repo;

import com.yash.internSetuBe.modules.student.entity.SocialMediaPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SocialMediaPlatformRepo extends JpaRepository<SocialMediaPlatform, Long> {
}
