package com.adsmanagement.wards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class WardService {
    private final WardRepository wardRepository;

    @Autowired
    public WardService(WardRepository wardRepository) {
        this.wardRepository = wardRepository;
    }

    public Page<Ward> findAllByDistrictId(Short districtId, Short page, Short size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        if (districtId == null) {
            return this.wardRepository.findAll(pageable);
        } else {
            return this.wardRepository.findAllByDistrict_Id(districtId,pageable);
        }

    }

}
