package com.livewithoutthinking.resq.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    private SecretKey secretToKey(String secret) {
        var bytes = secret.getBytes(StandardCharsets.UTF_8);
        try {
            var key = Keys.hmacShaKeyFor(bytes);
            return key;
        } catch (WeakKeyException ex) {
            return Keys.hmacShaKeyFor(Arrays.copyOf(bytes, 64));
        }
    }

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", List.of("ROLE_" + role))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                // set thời gian chết tạm của token
                // sẽ đổi sau khi làm calendar và phân quyền lại
                .signWith(secretToKey(secret))
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretToKey(secret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public List<String> extractRoles(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretToKey(secret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roles", List.class);
    }

    public Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretToKey(secret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
