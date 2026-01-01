package com.dailycodework.hotel.service;

import com.dailycodework.hotel.exception.UserAlreadyExistsException;
import com.dailycodework.hotel.model.Role;
import com.dailycodework.hotel.model.User;
import com.dailycodework.hotel.repository.RoleRepository;
import com.dailycodework.hotel.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;



@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER")
        .orElseThrow(() -> new RuntimeException("Role ROLE_USER not found in database!"));

        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }
    @Override
    public User registerAdmin(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
        throw new UserAlreadyExistsException(user.getEmail() + " already exists");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Role adminRole = roleRepository.findByName("ROLE_ADMIN")
        .orElseThrow(() -> new RuntimeException("Role ROLE_ADMIN not found in database!"));

    user.setRoles(Collections.singletonList(adminRole));
    return userRepository.save(user);
}


    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null){
            userRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
