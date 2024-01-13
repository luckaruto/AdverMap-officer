package com.adsmanagement.users;

import com.adsmanagement.cities.City;
import com.adsmanagement.cities.CityDto;
import com.adsmanagement.cities.CityRepository;
import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictDTO;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.users.dto.CreateUserDTO;
import com.adsmanagement.users.dto.UpdateProfileDTO;
import com.adsmanagement.users.dto.UpdateUserDTO;
import com.adsmanagement.users.dto.UserFilterPermission;
import com.adsmanagement.users.models.*;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import com.adsmanagement.wards.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserManagementDistrictRepository userManagementDistrictRepository;
    private final UserManagementWardRepository userManagementWardRepository;

    private  final DistrictRepository districtRepository;

    private  final CityRepository cityRepository;


    private  final WardRepository wardRepository;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserManagementDistrictRepository userManagementDistrictRepository,
            UserManagementWardRepository userManagementWardRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository,
            CityRepository cityRepository
    ) {
        this.userRepository = userRepository;
        this.userManagementDistrictRepository = userManagementDistrictRepository;
        this.userManagementWardRepository = userManagementWardRepository;
        this.wardRepository = wardRepository;
        this.districtRepository = districtRepository;
        this.cityRepository = cityRepository;
    }

    public Page<User> findAll(Short page, Short size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return this.userRepository.findAllByIsDeleted(pageable, false);
    }

    @Transactional
    public User save(CreateUserDTO createUserDTO)  throws Exception {
        User user = createUserDTO.ToUser();

        var existsEmail = this.userRepository.findByEmail(user.getEmail());
        if (existsEmail != null && !existsEmail.isEmpty()){
            throw new Exception("Email đã tồn tại");
        }

        var existsPhone = this.userRepository.findByPhone(user.getPhone());
        if (existsPhone != null && !existsPhone.isEmpty()){
            throw new Exception("Số điện thoại đã tồn tại");
        }

        var bcryptEncoder  = new BCryptPasswordEncoder();
        var bcryptPassword = bcryptEncoder.encode(user.getPassword());
        user.setPassword(bcryptPassword);
        var newUser = this.userRepository.save(user);

        if (createUserDTO.getManagementDistricts() != null && createUserDTO.getRole() == UserRole.DISTRICT_ADMIN){
            for (var i = 0; i < createUserDTO.getManagementDistricts().size(); i++){
                var district = createUserDTO.getManagementDistricts().get(i);

                var validDistrict = this.districtRepository.findById(district);
                if (validDistrict == null || validDistrict.isEmpty()) {
                    throw  new Exception("district is invalid");
                }

                var exists = this.userManagementDistrictRepository.findByUserIdAndDistrictId(newUser.getId(), district);
                if (exists != null && !exists.isEmpty()) {
                    continue;
                }

                var d = new UserManagementDistrict((short) 0,newUser, new District(district));
                this.userManagementDistrictRepository.save(d);
            }

        }

        if (createUserDTO.getManagementWards() != null && createUserDTO.getRole() == UserRole.WARD_ADMIN){
            for (var i = 0; i < createUserDTO.getManagementWards().size(); i++){
                var ward = createUserDTO.getManagementWards().get(i);

                var validWard = this.wardRepository.findById(ward);
                if (validWard == null || validWard.isEmpty()) {
                    throw  new Exception("ward is invalid");
                }

                var exists = this.userManagementWardRepository.findByUserIdAndWardId(newUser.getId(), ward);
                if (exists != null && !exists.isEmpty()) {
                    continue;
                }

                var d = new UserManagementWard((short) 0,newUser, new Ward(ward));
                this.userManagementWardRepository.save(d);
            }

        }

        var createdUser = this.userRepository.findById(newUser.getId());
        return  createdUser.get();
    }

    @Transactional
    public User update(Short id,UpdateUserDTO userDto)  throws Exception {
        User user = userDto.ToUser();
        user.setId(id);

        var existUser = this.userRepository.findById(id);
        if (existUser == null || existUser.isEmpty()) {
            throw new Exception("Tài khoản không tồn tại");
        }

        var existsEmail = this.userRepository.findByEmail(userDto.getEmail());
        if (existsEmail != null && !existsEmail.isEmpty() && existsEmail.get().getId() != existUser.get().getId()){
            throw new Exception("Email đã tồn tại");
        }

        var existsPhone = this.userRepository.findByPhone(userDto.getPhone());
        if (existsPhone != null && !existsPhone.isEmpty() && existsPhone.get().getId() != existUser.get().getId()){
            throw new Exception("Số điện thoại đã tồn tại");
        }

        if (userDto.getPassword() != null || userDto.getPassword() != ""){
            var bcryptEncoder  = new BCryptPasswordEncoder();
            var bcryptPassword = bcryptEncoder.encode(user.getPassword());
            user.setPassword(bcryptPassword);
        }

        var newUser = this.userRepository.save(user);

        var existDistrict = this.userManagementDistrictRepository.findByUserId(user.getId());
        if (existDistrict != null && existDistrict.size() > 0) {
            this.userManagementDistrictRepository.deleteAll(existDistrict);
        }
        if (userDto.getManagementDistricts() != null && userDto.getRole() == UserRole.DISTRICT_ADMIN){
            for (var i = 0; i < userDto.getManagementDistricts().size(); i++){
                var district = userDto.getManagementDistricts().get(i);

                var validDistrict = this.districtRepository.findById(district);
                if (validDistrict == null || validDistrict.isEmpty()) {
                    throw  new Exception("district is invalid");
                }

                var exists = this.userManagementDistrictRepository.findByUserIdAndDistrictId(newUser.getId(), district);
                if (exists != null && !exists.isEmpty()) {
                    continue;
                }

                var d = new UserManagementDistrict((short) 0,newUser, new District(district));
                this.userManagementDistrictRepository.save(d);
            }

        }

        var existWard = this.userManagementWardRepository.findByUserId(user.getId());
        if (existWard != null && existWard.size() > 0) {
            this.userManagementWardRepository.deleteAll(existWard);
        }
        if (userDto.getManagementWards() != null && userDto.getRole() == UserRole.WARD_ADMIN){
            for (var i = 0; i < userDto.getManagementWards().size(); i++){
                var ward = userDto.getManagementWards().get(i);

                var validWard = this.wardRepository.findById(ward);
                if (validWard == null || validWard.isEmpty()) {
                    throw  new Exception("ward is invalid");
                }

                var exists = this.userManagementWardRepository.findByUserIdAndWardId(newUser.getId(), ward);
                if (exists != null && !exists.isEmpty()) {
                    continue;
                }

                var d = new UserManagementWard((short) 0,newUser, new Ward(ward));
                this.userManagementWardRepository.save(d);
            }

        }

        var createdUser = this.userRepository.findById(newUser.getId());
        return  createdUser.get();
    }


    public User changePassword(Short id, String password) {
        var existUser = this.userRepository.findById(id);
        if (existUser == null || existUser.isEmpty()) {
            return null;
        }

        var user = existUser.get();

        var bcryptEncoder  = new BCryptPasswordEncoder();
        var bcryptPassword = bcryptEncoder.encode(password);
        user.setPassword(bcryptPassword);

        return this.userRepository.save(user);
    }
    public User delete(Short id){
        var existUser = this.userRepository.findById(id);
        if (existUser == null || existUser.isEmpty()) {
            return null;
        }

        var user = existUser.get();
        user.setIsDeleted(true);
        return this.userRepository.save(user);
    }

    public User findById(Short id) {
        var existUser = this.userRepository.findById(id);
        if (existUser == null || existUser.isEmpty()) {
            return null;
        }
        return existUser.get();
    }
    public UserPermission getUserPermission(Short id) {
        var userO = this.userRepository.findById(id);
        if (userO.isEmpty()){
            return null;
        }

        var user = userO.get();
        var permission = new UserPermission();
        permission.setRole(user.getRole());

        if (user.getRole() == UserRole.ADMIN){
            return permission;
        }

        if (user.getRole() == UserRole.WARD_ADMIN){
            var wards = this.userManagementWardRepository.findByUserId(id);

            Map<Short,Boolean> wardMap = new HashMap<Short, Boolean>();

            if (wards != null && wards.size() > 0 ){
                for (var i = 0;i < wards.size(); i++){
                    wardMap.put(wards.get(i).getWard().getId(), true);
                }
            }

            permission.setWards(wardMap);
            return permission;
        }

        if (user.getRole() == UserRole.DISTRICT_ADMIN){
            var districts = this.userManagementDistrictRepository.findByUserId(id);

            Map<Short,Boolean> districtMap = new HashMap<Short, Boolean>();
            List<Short> districtIds = new ArrayList<>();
            if (districts != null && districts.size() > 0 ){
                for (var i = 0;i < districts.size(); i++){
                    districtMap.put(districts.get(i).getDistrict().getId(), true);
                    districtIds.add(districts.get(i).getDistrict().getId());
                }
            }

            permission.setDistricts(districtMap);

            var wards = this.wardRepository.findAllByDistrict_IdIn(districtIds);
            Map<Short,Boolean> wardMap = new HashMap<Short, Boolean>();

            if (wards != null && wards.size() > 0 ){
                for (var i = 0;i < wards.size(); i++){
                    wardMap.put(wards.get(i).getId(), true);
                }
            }

            permission.setWards(wardMap);
            return permission;
        }

        return permission;
    }


    public UserFilterPermission getFilterPermission(Short userId) {
        var userO = this.userRepository.findById(userId);
        if (userO == null || userO.isEmpty()) {
            return null;
        }
        var user = userO.get();

        var permission = this.getUserPermission(userId);

        var role = permission.getRole();
        if (role == UserRole.ADMIN) {
            var city = this.cityRepository.findAll();
            return getUserPermissionForCity(city,role);
        }

        if (role == UserRole.DISTRICT_ADMIN) {
            var cityDto = new ArrayList<CityDto>();

            var managementDistricts = user.getManagementDistricts();
            if (managementDistricts == null || managementDistricts.isEmpty()){
                return new UserFilterPermission(role,cityDto);
            }

            var districtIds = new ArrayList<Short>();
            if (managementDistricts != null && managementDistricts.size()>0){
                for (var i=0; i < managementDistricts.size(); i++){
                    if (managementDistricts.get(i).getDistrict() != null){
                        districtIds.add( managementDistricts.get(i).getDistrict().getId());
                    }
                }
            }

            var cities = this.cityRepository.findByDistrictIds(districtIds);
            var districts = this.districtRepository.findAllByIdIn(districtIds);

            if (cities != null) {
                for (var i =0; i < cities.size();i++){
                    var ci = cities.get(i).toDto();

                    var districtDto = new ArrayList<DistrictDTO>();
                    if (districts != null) {
                        for (var j =0; j < districts.size();j++){
                            if (districts.get(j).getCity()!= null && districts.get(j).getCity().getId() == ci.getId()){
                                var dis = districts.get(j).toDto();

                                var wards = this.wardRepository.findAllByDistrict_Id(districts.get(j).getId());
                                var wardDto = new ArrayList<WardDTO>();
                                if (wards != null) {
                                    for (var t =0; t < wards.size();t++){
                                        wardDto.add(wards.get(t).toDto());
                                    }
                                }
                                dis.setWards(wardDto);
                                districtDto.add(dis);
                            }


                        }
                    }

                    ci.setDistricts(districtDto);
                    cityDto.add(ci);
                }
            }

            return new UserFilterPermission(role,cityDto);
        }

        if (role == UserRole.WARD_ADMIN) {
            var cityDto = new ArrayList<CityDto>();

            var managementWards = user.getManagementWards();
            if (managementWards == null || managementWards.isEmpty()){
                return new UserFilterPermission(role,cityDto);
            }

            var wardIds = new ArrayList<Short>();
            for (var i=0; i < managementWards.size(); i++){
                if (managementWards.get(i).getWard() != null){
                    wardIds.add( managementWards.get(i).getWard().getId());
                }
            }


            var wards = this.wardRepository.findAllByIdIn(wardIds);

            var districtIds = new ArrayList<Short>();
            if (wards != null && wards.size()>0){
                for (var i=0; i < wards.size(); i++){
                    var district = wards.get(i).getDistrict();
                    if (district != null) {
                        districtIds.add(district.getId());
                    }

                }
            }

            var cities = this.cityRepository.findByDistrictIds(districtIds);
            var districts = this.districtRepository.findAllByIdIn(districtIds);

            if (cities != null) {
                for (var i =0; i < cities.size();i++){
                    var ci = cities.get(i).toDto();

                    var districtDto = new ArrayList<DistrictDTO>();
                    if (districts != null) {
                        for (var j =0; j < districts.size();j++){
                            if (districts.get(j).getCity()!= null && districts.get(j).getCity().getId() == ci.getId()){
                                var dis = districts.get(j).toDto();

                                var wards2 = this.wardRepository.findAllByDistrict_IdAndIdIn(districts.get(j).getId(), wardIds);
                                var wardDto = new ArrayList<WardDTO>();
                                if (wards2 != null) {
                                    for (var t =0; t < wards2.size();t++){
                                        wardDto.add(wards2.get(t).toDto());
                                    }
                                }
                                dis.setWards(wardDto);
                                districtDto.add(dis);
                            }


                        }
                    }

                    ci.setDistricts(districtDto);
                    cityDto.add(ci);
                }
            }

            return new UserFilterPermission(role,cityDto);

        }

        return new UserFilterPermission(role,null);

    }

    UserFilterPermission getUserPermissionForCity(List<City> city,UserRole role) {
        var cityDto = new ArrayList<CityDto>();
        if (city != null) {
            for (var i =0; i < city.size();i++){
                var ci = city.get(i).toDto();

                var districts = this.districtRepository.findAllByCity_Id(city.get(i).getId());
                var districtDto = new ArrayList<DistrictDTO>();
                if (districts != null) {
                    for (var j =0; j < districts.size();j++){
                        var dis = districts.get(j).toDto();

                        var wards = this.wardRepository.findAllByDistrict_Id(districts.get(j).getId());
                        var wardDto = new ArrayList<WardDTO>();
                        if (wards != null) {
                            for (var t =0; t < wards.size();t++){
                                wardDto.add(wards.get(t).toDto());
                            }
                        }
                        dis.setWards(wardDto);
                        districtDto.add(dis);

                    }
                }

                ci.setDistricts(districtDto);
                cityDto.add(ci);
            }
        }

        return new UserFilterPermission(role,cityDto);

    }

    @Transactional
    public User updateProfile(User user, UpdateProfileDTO dto)  throws Exception {

        var existsEmail = this.userRepository.findByEmail(dto.getEmail());
        if (existsEmail != null && !existsEmail.isEmpty() && existsEmail.get().getId() != user.getId()) {
            throw new Exception("Email đã tồn tại");
        }

        var existsPhone = this.userRepository.findByPhone(dto.getPhone());
        if (existsPhone != null && !existsPhone.isEmpty() && existsPhone.get().getId() != user.getId()) {
            throw new Exception("Số điện thoại đã tồn tại");
        }

        user.setEmail(dto.getEmail());
        user.setBirthday(dto.getBirthday());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());

        var newUser = this.userRepository.save(user);
        return newUser;
    }


}
