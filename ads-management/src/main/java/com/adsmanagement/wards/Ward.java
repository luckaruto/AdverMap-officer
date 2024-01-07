package com.adsmanagement.wards;

import com.adsmanagement.districts.District;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ward")
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name="district_id")
    private District district;

   public Ward(Short id){
       this.id = id;
   }

   public WardDTO toDto(){
       return new WardDTO(id,name);
   }
}
