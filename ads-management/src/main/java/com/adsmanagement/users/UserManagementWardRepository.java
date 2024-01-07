package com.adsmanagement.users;

import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserManagementDistrict;
import com.adsmanagement.users.models.UserManagementWard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserManagementWardRepository extends JpaRepository<UserManagementWard, Short>, CrudRepository<UserManagementWard, Short> {
    Optional<UserManagementWard> findByUserIdAndWardId(Short userId, Short wardId);

    List<UserManagementWard> findByUserId(Short userId);
}