package com.livewithoutthinking.resq.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")         // ✅ Cho tất cả Origin
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);           // ✅ Postman không cần gửi cookie/token
            }
        };
    }
}
