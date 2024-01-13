package com.adsmanagement.surfaces.models;

import com.adsmanagement.spaces.models.Space;
import com.adsmanagement.spaces.dto.SpaceDto;
import com.adsmanagement.surfaces.dto.SurfaceDto;
import com.adsmanagement.surfaces.dto.UpdateSurfaceDto;
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
@Table(name = "surface")
public class Surface {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "format", columnDefinition = "varchar(255)")
    @Enumerated(EnumType.STRING)
    private SurfaceFormat format;

    @Column(name = "width")
    private Short width;

    @Column(name = "height")
    private Short height;

    @Column(name = "img_url", columnDefinition = "text")
    private String imgUrl;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name="space_id")
    private Space space;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    public Surface(Short id ){
        this.id = id;
    }
    public SurfaceDto toDto(){
        SpaceDto spaceDto = null;
        if (space != null){
            spaceDto = space.toDto();
        }

        List<String> imgUrls = new ArrayList<>();
        if (this.imgUrl != null) {
            String[] split = this.imgUrl.split(", ");
            imgUrls = Arrays.stream(split).toList();
        }

        return new SurfaceDto(id,format,width,height,imgUrls,content,spaceDto);
    }

    public void setFieldByRequest(SurfaceRequest req) {
        this.imgUrl = req.getImgUrl();
        this.content = req.getContent();
        this.height  = req.getHeight();
        this.format = req.getFormat();
        this.space  = req.getSpace();
        this.width =  req.getWidth();
        this.updatedAt = new Date();
    }

    public void setFieldByUpdateDto(UpdateSurfaceDto dto) {
        String imgUrl =null;
        if (dto.getImgUrl() != null && dto.getImgUrl().size() >0){
            imgUrl = dto.getImgUrl().toString();
        }

        this.imgUrl = imgUrl;
        this.content = dto.getContent();
        this.height  = dto.getHeight();
        this.format = dto.getFormat();
        this.width =  dto.getWidth();
        this.updatedAt = new Date();
    }

}
