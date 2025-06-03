package com.livewithoutthinking.resq.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleID")
    private int roleId;  // RoleID là INT

    @Column(name = "RoleName", nullable = false, unique = true)
    private String roleName;  // RoleName là VARCHAR(50)

    // Một Role có nhiều User
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<User> users;
}
