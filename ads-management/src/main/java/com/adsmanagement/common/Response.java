package com.adsmanagement.common;

import org.springframework.http.HttpStatus;

public class Response<T> {

    private String message;
    private T data;

    private HttpStatus status;

    public Response( String message, T data) {
        this.message = message;
        this.data = data;
        this.status = HttpStatus.OK;
    }

    public Response( String message, T data, HttpStatus status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public HttpStatus getStatus() {
        return status;
    }

}