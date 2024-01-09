package com.adsmanagement.notifications;


import com.adsmanagement.common.Response;
import com.adsmanagement.config.UserInfoUserDetails;
import com.adsmanagement.reports.ReportService;
import com.adsmanagement.reports.dto.CreateReportDto;
import com.adsmanagement.reports.dto.ProcessReportDto;
import com.adsmanagement.reports.dto.ReportDto;
import com.adsmanagement.reports.models.ReportState;
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
public class NotificationController {
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

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

    @GetMapping(path = "/count")
    public ResponseEntity<Response<Long>> countUnSeen( @AuthenticationPrincipal UserInfoUserDetails userDetails)   {
        var user = userDetails.getUser();
        var data = this.notificationService.count(user.getId());
        var res = new Response<>("",data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

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


}
