package com.adsmanagement.surfaceAllowance.models;

import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.spaces.models.RequestState;
import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.surfaceAllowance.dto.SurfaceAllowanceDto;
import com.adsmanagement.surfaces.models.SurfaceFormat;
import com.adsmanagement.users.dto.UserDTO;
import com.adsmanagement.users.models.User;
import com.adsmanagement.wards.Ward;
import com.adsmanagement.wards.WardDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "surface_allowance")
public class SurfaceAllowance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @ManyToOne
    @JoinColumn(name="space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name="ward_id")
    private Ward ward;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(name = "content")
    private String content;

    @Column(name = "img_url", columnDefinition = "text")
    private String imgUrl;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_info")
    private String companyInfo;

    @Column(name = "company_email")
    private String companyEmail;

    @Column(name = "company_phone")
    private String companyPhone;

    @Column(name = "company_address")
    private String companyAddress;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "format")
    private SurfaceFormat format;

    @Column(name = "width")
    private Short width;

    @Column(name = "height")
    private Short height;

    @Column
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private RequestState state;

    @Column(name = "response")
    private String response;


    public SurfaceAllowanceDto toDto() {

        SpaceDto sp = null;
        if (space != null) {
            sp = space.toDto();
        }

        WardDTO w = null;
        if (ward != null) {
            w = ward.toDto();
        }

        UserDTO u = null;
        if (user != null) {
            u = user.toDto();
        }

        List<String> imgUrls = new ArrayList<>();
        if (this.imgUrl != null) {
            String[] split = this.imgUrl.split(", ");
            imgUrls = Arrays.stream(split).toList();
        }

        return new SurfaceAllowanceDto(id,sp,w,u,content,imgUrls,
                companyName,companyInfo,companyEmail,companyPhone,companyAddress,startDate,endDate,format,width,height,state, response);
    }
}
