package com.adsmanagement.notifications;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.reports.ReportService;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.dto.ProcessReportDto;
import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.reports.models.ReportState;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1/notifications")
@Tag(name = "Quản lý thông báo", description = "Dùng để Quản lý thông báo")

public class NotificationController {
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Operation(summary = "Get paginated list of notifications for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Paginated list of notifications",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @GetMapping(path = "")
    public ResponseEntity<Response<Page<NotificationDto>>> list(
            @RequestParam(defaultValue = "0") Short page,
            @RequestParam(defaultValue = "5") Short size,
            @AuthenticationPrincipal UserInfoUserDetails userDetails
            )   {
        var user = userDetails.getUser();
        var data = this.notificationService.findAll(page,size, user.getId());

        var contents = new ArrayList<NotificationDto>();
        for (int i = 0; i < data.getContent().size(); i++){
            contents.add(data.getContent().get(i).toDto());
        }

        Page<NotificationDto> dataRes = new PageImpl<>(contents,data.getPageable(),data.getTotalElements());
        var res = new Response<>("",dataRes);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Get the count of unseen notifications for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Count of unseen notifications",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @GetMapping(path = "/count")
    public ResponseEntity<Response<Long>> countUnSeen( @AuthenticationPrincipal UserInfoUserDetails userDetails)   {
        var user = userDetails.getUser();
        var data = this.notificationService.count(user.getId());
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Mark a notification as seen for the authenticated user")
    @ApiResponse(responseCode = "200", description = "Notification marked as seen",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @PostMapping(path = "/{id}/seen")
    public ResponseEntity<Response<NotificationDto>> seenNotification(
            @AuthenticationPrincipal UserInfoUserDetails userDetails,
            @PathVariable("id") Short id
            )   {
        var user = userDetails.getUser();
        var data = this.notificationService.seen(id,user.getId());
        var res = new Response<>("",data.toDto());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Mark all notifications as seen for the authenticated user")
    @ApiResponse(responseCode = "200", description = "All notifications marked as seen",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Response.class)))
    @PostMapping(path = "/seen-all")
    public ResponseEntity<Response<String>> seenAllNotification(
            @AuthenticationPrincipal UserInfoUserDetails userDetails
    )   {
        var user = userDetails.getUser();
        var data = this.notificationService.seenAll(user.getId());
        var res = new Response<>("","ok");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


}
