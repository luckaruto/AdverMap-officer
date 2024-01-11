package com.adsmanagement.districts;

import com.adsmanagement.cities.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Short> {
    Page<District> findAllByCity_Id(Short cityId, Pageable pageable);
    List<District> findAllByCity_Id(Short cityId);


    List<District> findAllByCity_IdIn(List<Short> cityIds);


    Page<District> findAll(Pageable pageable);

    List<District> findAllByIdIn(List<Short> ids);

}