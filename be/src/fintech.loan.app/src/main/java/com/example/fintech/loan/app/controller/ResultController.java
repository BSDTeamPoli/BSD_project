package com.example.fintech.loan.app.controller;

import com.example.fintech.loan.app.entity.Result;
import com.example.fintech.loan.app.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/add")
    public Result createResult(@RequestBody Result request) {
        // Get the authenticated user's username
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Save the result for the authenticated user
        return resultService.saveResultForUser(
                username,
                request.getLoanType(),
                request.getAmount(),
                request.getPeriod(),
                request.isPreliminaryApproval()
        );
    }
}
