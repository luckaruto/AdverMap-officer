package com.adsmanagement.users.models;

import com.adsmanagement.districts.District;
import com.adsmanagement.wards.Ward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_management_district")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserManagementDistrict {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name="district_id")
    @JsonIgnore
    private District district;
}
