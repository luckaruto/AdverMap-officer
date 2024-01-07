package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.ReportState;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProcessReportDto {
    private ReportState state;
    private String response;

}
