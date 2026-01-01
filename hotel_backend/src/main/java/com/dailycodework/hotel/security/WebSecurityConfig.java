package com.dailycodework.hotel.security;
import com.dailycodework.hotel.security.jwt.AuthTokenFilter;
import com.dailycodework.hotel.security.jwt.JwtAuthEntryPoint;
import com.dailycodework.hotel.security.user.HotelUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig {
    private final HotelUserDetailsService userDetailsService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;

    @Bean
    public AuthTokenFilter authenticationTokenFilter(){
        return new AuthTokenFilter();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer :: disable)
                .exceptionHandling(
                        exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/rooms/**","/bookings/**","/roles/**","/users/**")
                        .permitAll()
                        .anyRequest().authenticated());
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}

/*
 @Configuration is used to say it will use Bean definition.
 @EnalbledMethodSecurity is used to say that we can use Security annotions
 
 DaoAuthenticationProvider = connects your custom UserDetailsService + PasswordEncoder.
This means Spring will fetch user details from your database using HotelUserDetailsService.
 
AuthenticationManager  = Responsible for handling authentication requests (like login).
It uses the configured authentication providers (like the one above).
Used in your AuthController during login to authenticate credentials.

SecurityFilterChain
1. Disable CSRF
Because you’re using JWT (stateless), no need for CSRF tokens.
✅ 2. Exception Handling
If authentication fails, JwtAuthEntryPoint will send a 401 response.
✅ 3. Session Management
SessionCreationPolicy.STATELESS → Spring won’t create or use HTTP sessions.
Every request must have a valid JWT token.
✅ 4. Authorization Rules
/auth/**, /rooms/**, /bookings/** → accessible to everyone (public endpoints)
/roles/** → only accessible by users with ROLE_ADMIN
Any other URL → requires authentication (must have valid JWT token)
✅ 5. Add Authentication Provider
Links your database user authentication system.
✅ 6. Add JWT Filter
Your AuthTokenFilter runs before the standard username-password filter — it checks for JWT tokens in headers.
 */
