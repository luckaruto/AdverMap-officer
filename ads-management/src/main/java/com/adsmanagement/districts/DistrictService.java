package com.adsmanagement.districts;

import com.adsmanagement.cities.City;
import com.adsmanagement.common.PaginationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DistrictService {
    private final DistrictRepository districtRepository;

    @Autowired
    public DistrictService(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    public Page<District> findAll(Short page, Short size, Short cityId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        if (cityId == null) {
            return this.districtRepository.findAll(pageable);
        } else {
            return this.districtRepository.findAllByCity_Id(cityId,pageable );
        }
    }

}
