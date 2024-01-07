package com.adsmanagement.users.models;

import com.adsmanagement.wards.Ward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_management_ward")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserManagementWard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name="ward_id")
    @JsonIgnore
    private Ward ward;
}
