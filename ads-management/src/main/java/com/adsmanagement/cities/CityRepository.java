package com.adsmanagement.cities;

import com.adsmanagement.wards.Ward;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CityRepository extends CrudRepository<City, Short> {

    List<City> findAll();


    @Query(value = "SELECT DISTINCT c.* FROM city c INNER JOIN district d ON c.id = d.city_id WHERE d.id IN (:district_ids)",
            nativeQuery = true)
    List<City> findByDistrictIds(@Param("district_ids") List<Short> districtIds);

}