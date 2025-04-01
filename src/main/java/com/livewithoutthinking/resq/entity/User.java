package com.livewithoutthinking.resq.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @Column(name = "UserID")
    private String userId;  // UserID là VARCHAR(36)

    @Column(name = "Username", nullable = false, unique = true)
    private String username;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "EmailVerified")
    private boolean emailVerified;

    @Column(name = "SDT")
    private String sdt; // Phone number

    @Column(name = "Status")
    private String status;

    @Column(name = "LoginFails")
    private int loginFails;

    @Column(name = "WorkingStatus")
    private String workingStatus;

    @Column(name = "DOB")
    private Date dob; // Date of Birth

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    private Role role; // Reference to the Role table, assuming there's a Role class

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Address")
    private String address;

    @Column(name = "EmailVerificationToken")
    private String emailVerificationToken;

    @Column(name = "EmailVerificationExpire")
    private Date emailVerificationExpire;

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

    // Constructor, Getters, Setters and other methods
}
