package com.dailycodework.hotel.service;

import com.dailycodework.hotel.exception.RoleAlreadyExistException;
import com.dailycodework.hotel.exception.UserAlreadyExistsException;
import com.dailycodework.hotel.model.Role;
import com.dailycodework.hotel.model.User;
import com.dailycodework.hotel.repository.RoleRepository;
import com.dailycodework.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_"+theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if (roleRepository.existsByName(roleName)){
            throw new RoleAlreadyExistException(theRole.getName()+" role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role>  role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

   @Override
public User assignRoleToUser(Long userId, Long roleId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    Optional<Role> optionalRole = roleRepository.findById(roleId);

    if (optionalUser.isEmpty()) {
        throw new UsernameNotFoundException("User not found with ID: " + userId);
    }

    if (optionalRole.isEmpty()) {
        throw new RuntimeException("Role not found with ID: " + roleId);
    }

    User user = optionalUser.get();
    Role newRole = optionalRole.get();

    // Remove all existing roles first
    user.getRoles().clear();

    // Assign only the new role
    user.getRoles().add(newRole);

    // Update both sides of the relationship
    newRole.getUsers().add(user);

    // Save both user and role (userRepository.save() is enough if cascade is set)
    userRepository.save(user);

    return user;
}


    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepository.save(role.get());
    }
}
