package com.dailycodework.hotel.security.user;

import com.dailycodework.hotel.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HotelUserDetails implements UserDetails {
    private Long id;
    private  String email;
    private String password;
    private Collection<GrantedAuthority> authorities;

    public static HotelUserDetails buildUserDetails(User user){
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new HotelUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities);

    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
/*
id → your internal database user ID
email → username used for login (Spring calls it getUsername())
password → hashed password from DB
authorities → user’s roles/permissions (like ROLE_ADMIN, ROLE_USER)

Method	Purpose	Your                                         Return
getAuthorities() - Returns roles/permissions	           authorities
getPassword() - Returns user’s password	                   password
getUsername() - Returns login username (you used email)	   email
isAccountNonExpired() - If account is expired or not	   true
isAccountNonLocked() - If user is locked or not	           true
isCredentialsNonExpired() - If password expired or not	   true
isEnabled() - If user is active	                           true


 */