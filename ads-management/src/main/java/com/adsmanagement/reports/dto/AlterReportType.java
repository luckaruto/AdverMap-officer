package com.adsmanagement.reports.dto;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AlterReportType {
    @Column(name = "name")
    private String name;
}
