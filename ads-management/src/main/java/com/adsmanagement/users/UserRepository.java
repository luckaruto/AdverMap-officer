package com.adsmanagement.users;

import com.adsmanagement.surfaces.models.Surface;
import com.adsmanagement.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Short>, CrudRepository<User, Short> {
    Optional<User> findByName(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);


    Optional<User> findByEmailAndIsDeleted(String email, Boolean isDeleted);

    Page<User> findAllByIsDeleted(Pageable pageable,Boolean isDeleted);
}