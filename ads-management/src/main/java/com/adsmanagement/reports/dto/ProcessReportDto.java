package com.adsmanagement.reports.dto;

import com.adsmanagement.reports.models.ReportState;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema(description = "DTO for processing a report")
public class ProcessReportDto {

    @Schema(description = "State of the report", example = "APPROVED")
    private ReportState state;

    @Schema(description = "Response to the report", example = "Report approved successfully")
    private String response;
}
