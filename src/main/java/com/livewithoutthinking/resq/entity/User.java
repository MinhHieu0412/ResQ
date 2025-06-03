package com.livewithoutthinking.resq.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "Username", nullable = false, unique = true)
    private String username;

    @Column(name = "FullName", nullable = false, unique = true)
    private String fullname;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "SDT", nullable = false, unique = true)
    private String sdt; // Phone number

    @Column(name = "Status")
    private String status;

    @Column(name = "LoginFails")
    private int loginFails;

    @Column(name = "DOB")
    private Date dob; // Date of Birth

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Address")
    private String address;

    @Column(name = "avatar")
    private String avatar;
    
    @Column(name = "PhoneVerified")
    private boolean phoneVerified;

    @Column(name = "PhoneOTP")
    private String phoneOtp;

    @Column(name = "PhoneOTPExpire")
    private Date phoneOtpExpire;

    @Column(name = "PasswordResetToken")
    private String passwordResetToken;

    @Column(name = "PasswordResetExpire")
    private Date passwordResetExpire;

    @Column(name = "Created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "Updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "PDID", referencedColumnName = "PDID")
    private PersonalData personalData; // Reference to the PersonalData table, assuming there's a PersonalData class

    @Column(name = "Language")
    private String language;

    @Column(name = "AppColor")
    private String appColor;

    @Column(name = "LoyaltyPoint")
    private int loyaltyPoint;

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    @JsonManagedReference
    private Role role;

    public User() {
    }
    public User(Integer userId) {
        this.userId = userId;
    }


    // Constructor, Getters, Setters and other methods
}

