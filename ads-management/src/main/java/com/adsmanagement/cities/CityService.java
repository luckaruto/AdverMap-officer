package com.adsmanagement.cities;

import com.adsmanagement.wards.Ward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CityService {
    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public Iterable<City> findAll() {
        return this.cityRepository.findAll();
    }

    public Page<City> list(Short page, Short size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return this.cityRepository.findAll(pageable);
    }

    public City create(UpdateCityDto dto) {
        var city = new City((short) 0,dto.getName());
        return this.cityRepository.save(city);

    }

    public Optional<City> findByName(String name) {
        return this.cityRepository.findByName(name);
    }

    public Optional<City> findById(Short id) {
        return this.cityRepository.findById(id);
    }

    public City save(City city) {
        return this.cityRepository.save(city);
    }

    public void delete(Short id) {
        this.cityRepository.deleteById(id);
    }

}
