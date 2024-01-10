package com.adsmanagement.spaces.models;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "space")
public class Space {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "address")
    private String address;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "type", columnDefinition = "varchar(20)")
    @Enumerated(EnumType.STRING)
    private SpaceType type;

    @Column(name = "format", columnDefinition = "varchar(20)")
    @Enumerated(EnumType.STRING)
    private SpaceFormat format;

    @Column(name = "img_url", columnDefinition = "text")
    private String imgUrl;

    @Column(name = "is_planned")
    private boolean isPlanned;

    @ManyToOne
    @JoinColumn(name="ward_id")
    private Ward ward;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    public Space(Short spaceId) {
        this.id = spaceId;
    }

    public SpaceDto toDto(){
        List<String> imgUrls = new ArrayList<>();
        if (this.imgUrl != null) {
            String[] split = this.imgUrl.split(", ");
            imgUrls = Arrays.stream(split).toList();
        }

        WardDTO wardDto = null;
        if (ward != null){
            wardDto = ward.toDto();
        }

        return new SpaceDto(id,address,longitude,latitude,type,format,imgUrls,isPlanned,wardDto);
    }
}
