package com.adsmanagement.reports.dto;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "report_type")
public class ReportTypeDto {
    private Short id;
    private String name;
}
