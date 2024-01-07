package com.adsmanagement.users;

import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserManagementDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserManagementDistrictRepository extends JpaRepository<UserManagementDistrict, Short>, CrudRepository<UserManagementDistrict, Short> {
    Optional<UserManagementDistrict> findByUserIdAndDistrictId(Short userId, Short districtId);

    List<UserManagementDistrict> findByUserId(Short userId);
}