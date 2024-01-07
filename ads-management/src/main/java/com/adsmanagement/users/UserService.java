package com.adsmanagement.users;

import com.adsmanagement.districts.District;
import com.adsmanagement.districts.DistrictRepository;
import com.adsmanagement.users.dto.CreateUserDTO;
import com.adsmanagement.users.dto.UpdateUserDTO;
import com.adsmanagement.users.models.User;
import com.adsmanagement.users.models.UserManagementDistrict;
import com.adsmanagement.users.models.UserManagementWard;
import com.adsmanagement.users.models.UserRole;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserManagementDistrictRepository userManagementDistrictRepository;
    private final UserManagementWardRepository userManagementWardRepository;

    private  final DistrictRepository districtRepository;

    private  final WardRepository wardRepository;

    @Autowired
    public UserService(
            UserRepository userRepository,
            UserManagementDistrictRepository userManagementDistrictRepository,
            UserManagementWardRepository userManagementWardRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository
    ) {
        this.userRepository = userRepository;
        this.userManagementDistrictRepository = userManagementDistrictRepository;
        this.userManagementWardRepository = userManagementWardRepository;
        this.wardRepository = wardRepository;
        this.districtRepository = districtRepository;
    }

    public Page<User> findAll(Short page, Short size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return this.userRepository.findAllByIsDeleted(pageable, false);
    }

    @Transactional
    public User save(CreateUserDTO createUserDTO)  throws Exception {
        User user = createUserDTO.ToUser();

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
            throw new Exception("user is not exist");
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
}
