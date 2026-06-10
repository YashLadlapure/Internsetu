package com.yash.internSetuBe.modules.identity.service;


import com.yash.internSetuBe.modules.identity.dto.response.*;
import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.identity.mapper.UserMapper;
import com.yash.internSetuBe.modules.identity.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final UserMapper userMapper;

    public boolean isActivated(String email) {
        return userRepo.findIsActiveByEmail(email);
    }

    public <T> T getCurrentUser(Class<T> type) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        return userRepo.findByEmail(authentication.getName(), type).orElseThrow(()-> new UsernameNotFoundException("user with email not found"));
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() instanceof User user) {
            return user.getId();
        }
        throw new IllegalStateException("User not authenticated or Principal type mismatch");
    }

    public MeResponse getProfile() {
        User user = getCurrentUser(User.class);
        return userMapper.toMeResponse(user);
    }
}
