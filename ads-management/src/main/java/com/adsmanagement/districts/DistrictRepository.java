package com.adsmanagement.districts;

import com.adsmanagement.cities.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Short>, CrudRepository<District, Short> {
    Page<District> findAllByCity_Id(Short cityId, Pageable pageable);
    List<District> findAllByCity_Id(Short cityId);

    Optional<District> findByName(String name);


    List<District> findAllByCity_IdIn(List<Short> cityIds);


    Page<District> findAll(Pageable pageable);

    List<District> findAllByIdIn(List<Short> ids);

    Long countByCityId(Short cityId);

}