package com.adsmanagement.districts;

import com.adsmanagement.cities.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Short> {
    Page<District> findAllByCity_Id(Short cityId, Pageable pageable);

    Page<District> findAll(Pageable pageable);

}