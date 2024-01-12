package com.adsmanagement.cities;

import com.adsmanagement.notifications.Notification;
import com.adsmanagement.wards.Ward;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Short>, CrudRepository<City, Short> {

    List<City> findAll();

    Optional<City> findByName(String name);



    @Query(value = "SELECT DISTINCT c.* FROM city c INNER JOIN district d ON c.id = d.city_id WHERE d.id IN (:district_ids)",
            nativeQuery = true)
    List<City> findByDistrictIds(@Param("district_ids") List<Short> districtIds);

}