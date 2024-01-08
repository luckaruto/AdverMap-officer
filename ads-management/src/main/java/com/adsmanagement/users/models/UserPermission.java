package com.adsmanagement.users.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPermission {
    private UserRole role;

    private Map<Short,Boolean> districts;

    private Map<Short,Boolean> wards;

    public boolean hasPermission(List<Short> wardIds,List<Short> districtIds) {
        if (role == UserRole.ADMIN){
            return true;
        }

        if (role == null){
            return false;
        }

        if (wardIds != null && wardIds.size()>0) {
            if (this.wards == null || this.wards.size() == 0){
                return false;
            }


            for (var i = 0; i<wardIds.size();i++){
                var temp = wardIds.get(i);

                if (wards.get(temp) == null){
                    return false;
                }

            }
        }

        if (districtIds != null && districtIds.size()>0) {
            if (this.districts == null || this.districts.size() == 0){
                return false;
            }


            for (var i = 0; i<districtIds.size();i++){
                var temp = districtIds.get(i);

                if (districts.get(temp) == null){
                    return false;
                }

            }
        }

        return true;
    }
}
