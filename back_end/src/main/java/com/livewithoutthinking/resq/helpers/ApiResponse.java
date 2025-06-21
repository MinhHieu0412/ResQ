package com.livewithoutthinking.resq.helpers;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private T data;
    private String message;
    private int status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object errors;

    // Constructor không có lỗi
    public ApiResponse(T data, String message, int status) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.errors = null;
    }

    // ✅ SUCCESS
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message, 200);
    }

    // ✅ CREATED
    public static <T> ApiResponse<T> created(T data, String message) {
        return new ApiResponse<>(data, message, 201);
    }

    // ✅ NOT FOUND
    public static <T> ApiResponse<T> notfound(T data, String message) {
        return new ApiResponse<>(null, message, 404, null);
    }

    // ✅ BAD REQUEST – lỗi dạng Map<field, message>
    public static ApiResponse<Object> badRequest(Map<String, String> errors) {
        return new ApiResponse<>(null, "Validation errors", 400, errors);
    }

    // ✅ BAD REQUEST – lỗi dạng List<String>
    public static ApiResponse<Object> badRequest(List<String> errorList) {
        return new ApiResponse<>(null, "Validation errors", 400, errorList);
    }

    public static <T> ApiResponse<T> conflictData(T data, String message) {
        return new ApiResponse<>(null, message, 409, null);
    }


    // ✅ INTERNAL SERVER ERROR
    public static <T> ApiResponse<T> errorServer(String message) {
        return new ApiResponse<>(null, message, 500, null);
    }
}
