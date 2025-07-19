package com.livewithoutthinking.resq.config;

// Đã phân quyền cơ bản của 3 role, tính năng nào dùng chung 3 role thì ghép lại chia sau

import com.livewithoutthinking.resq.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConffig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
        // Đã phân quyền cơ bản của 3 role, tính năng nào dùng chung 3 role thì ghép lại chia sau
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(au -> au
                        .requestMatchers("/api/resq/register", "/api/resq/login").permitAll()
                        .requestMatchers("/api/resq/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/resq/manager/**").hasRole("MANAGER")
                        .requestMatchers("/api/resq/staff/**").hasRole("STAFF")
                        .requestMatchers("/api/resq/customer/**").permitAll()
                        .requestMatchers("/api/resq/partner/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/paypal/**").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(config -> new CorsConfiguration().applyPermitDefaultValues());
        return http.build();
    }

}
