package com.adsmanagement.spaces;

import com.adsmanagement.spaces.models.SpaceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SpaceRequestRepository extends JpaRepository<SpaceRequest, Short>, CrudRepository<SpaceRequest, Short> {

    Page<SpaceRequest> findAllByWardIdIn(List<Short> wardIds, Pageable pageable);

    Page<SpaceRequest> findAllByWardIdInAndSpaceId(List<Short> wardIds,Short spaceId, Pageable pageable);

    Page<SpaceRequest> findAllBySpaceId(Short spaceId, Pageable pageable);



}