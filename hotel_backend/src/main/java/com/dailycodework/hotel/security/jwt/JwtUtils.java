package com.dailycodework.hotel.security.jwt;

import com.dailycodework.hotel.security.user.HotelUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;

    @Value("${auth.token.expirationInMils}")
    private int jwtExpirationMs;

    public String generateJwtTokenForUser(Authentication authentication){
        HotelUserDetails userPrincipal = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }
/*
Decodes your Base64-encoded secret key (jwtSecret).
Uses it to create a secure HMAC-SHA key.
Effect:
Now your token can be safely signed and verified.
Without this, tokens couldn’t be securely validated.
 */
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    /*
      Parses (decodes and verifies) the token.
Extracts its payload (claims).
Gets the subject (username) field.
Effect:
If the token is valid, this returns the username
     */
    public String getUserNameFromToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        }catch(MalformedJwtException e){
            logger.error("Invalid jwt token : {} ", e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("Expired token : {} ", e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("This token is not supported : {} ", e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("No  claims found : {} ", e.getMessage());
        }
        return false;
    }


}

/*
 authentication → provided by Spring Security after successful login.
getPrincipal() → gives you the logged-in user’s details (username, password, roles, etc.).
We now know which user logged in successfully.

getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
                    Extracts all roles (like ROLE_USER, ROLE_ADMIN) and converts them into a list of strings.
                    We can store user’s roles inside the token itself (useful later for authorization).
 
TO build a JWT Token
.setSubject() → stores the username in the token.
.claim("roles", roles) → adds extra data to the token payload (user’s roles).
.setIssuedAt() → sets token creation time.
.setExpiration() → sets when the token will expire.
.signWith() → signs token using your secret key and the HS256 hashing algorithm.
.compact() → final step → converts it into a String token.


*/
