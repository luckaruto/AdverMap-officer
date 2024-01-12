package com.adsmanagement.reports.models;


import com.adsmanagement.reports.dto.ReportTypeDto;
import com.adsmanagement.surfaces.models.Surface;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "report_type")
public class ReportType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    public ReportType(Short id ) {
        this.id = id;
    }

    public ReportTypeDto toDto(){
        return new ReportTypeDto(id,name);
    }
}
