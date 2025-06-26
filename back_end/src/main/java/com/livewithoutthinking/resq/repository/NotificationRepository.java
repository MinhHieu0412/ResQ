package com.livewithoutthinking.resq.repository;

import com.livewithoutthinking.resq.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
