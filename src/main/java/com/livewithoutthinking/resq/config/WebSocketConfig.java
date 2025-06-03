package com.livewithoutthinking.resq.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Tin nhắn sẽ được publish ra /topic
        config.setApplicationDestinationPrefixes("/app"); // Client gửi tin nhắn vào /app
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // Địa chỉ endpoint kết nối WebSocket
                .setAllowedOriginPatterns("*")
                .withSockJS(); // Cho phép fallback qua SockJS nếu WebSocket bị chặn
    }
}
