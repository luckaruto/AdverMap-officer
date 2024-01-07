package com.adsmanagement.users.models;

import com.adsmanagement.users.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private String role;

    @Column(name = "email",unique=true)
    private String email;

    @Column(name = "phone",unique=true)
    private String phone;

    @Column(name = "birthday")
    private Date birthday;
    @Column(name = "password")
    private String password;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    public User(Short id){
        this.id = id;
    }
    public UserDTO toDTO() {
        return new UserDTO(id,name,role, email,phone,birthday);
    }
}
