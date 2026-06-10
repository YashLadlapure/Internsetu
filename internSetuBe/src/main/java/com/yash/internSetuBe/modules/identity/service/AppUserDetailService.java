package com.yash.internSetuBe.modules.identity.service;

import com.yash.internSetuBe.modules.identity.entity.User;
import com.yash.internSetuBe.modules.identity.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByEmail(username, User.class).orElseThrow(()-> new UsernameNotFoundException("email not found"));
    }

}
