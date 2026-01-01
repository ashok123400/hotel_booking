package com.dailycodework.hotel.service;

import com.dailycodework.hotel.model.User;

import java.util.List;


public interface IUserService {
    User registerUser(User user);
    User registerAdmin(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
