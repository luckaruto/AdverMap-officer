package com.adsmanagement.config;

import com.adsmanagement.common.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response<String>> handleValidationException(MethodArgumentNotValidException e) {
        StringBuilder errorMessage = new StringBuilder();
        e.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errorMessage.append(fieldError.getDefaultMessage()).append(". ");
        });

        var res = new Response<String>(errorMessage.toString(),null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response<String>> handleUnwantedException(Exception e) {
        String errorMessage = "An unexpected error occurred: " + e.getMessage();
        var res = new Response<String>(errorMessage.toString(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        return  new ResponseEntity<>(res, HttpStatus.OK);
    }
}