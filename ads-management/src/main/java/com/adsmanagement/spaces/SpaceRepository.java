package com.adsmanagement.spaces;

import com.adsmanagement.spaces.models.Space;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SpaceRepository extends JpaRepository<Space, Short>, CrudRepository<Space, Short> {
    Page<Space> findAllByWardIdIn(List<Short> wardIds, Pageable pageable);
    List<Space> findAllByWardIdIn(List<Short> wardIds);

    List<Space> findAllByWardIdInAndIdIn(List<Short> wardIds, List<Short> ids);

}