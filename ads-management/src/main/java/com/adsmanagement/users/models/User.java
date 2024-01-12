package com.adsmanagement.users.models;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictDTO;
import com.adsmanagement.users.dto.ProfileDTO;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.users.dto.UserFilterPermission;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    private UserRole role;

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

    @OneToMany(mappedBy="user")
    private List<UserManagementWard> managementWards;

    @OneToMany(mappedBy="user")
    private List<UserManagementDistrict> managementDistricts;

    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    public User(Short id){
        this.id = id;
    }
    public UserDTO toDto() {
        List<WardDTO> wards = new ArrayList<>();
        if (managementWards != null && managementWards.size() > 0){
            for (var i = 0; i < managementWards.size(); i++){

                var ward = managementWards.get(i).getWard();
                if (ward != null) {
                    wards.add(ward.toDto());
                }

            }
        }

        List<DistrictDTO> districts = new ArrayList<>();
        if (managementDistricts != null && managementDistricts.size() > 0){
            for (var i = 0; i < managementDistricts.size(); i++){
                var dis = managementDistricts.get(i).getDistrict();
                if (dis != null) {
                    districts.add(dis.toDto());
                }
            }
        }

        return new UserDTO(id,name,role, email,phone,birthday,wards,districts);
    }

    public ProfileDTO toProfile(){
        return new ProfileDTO(id,name,role,email,phone,birthday);
    }
}
