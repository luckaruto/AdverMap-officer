package com.adsmanagement.cities;

import com.adsmanagement.wards.Ward;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CityRepository extends CrudRepository<City, Short> {

    List<City> findAll();

}