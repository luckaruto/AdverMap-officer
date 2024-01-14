export const API = {
    AUTH: "/api/v1/auth/login",
    NOTIFICATION: {
        COUNT: "/api/v1/notifications/count",
        LIST: "/api/v1/notifications",
        SEEN_ALL: "/api/v1/notifications/seen-all",
    },
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    VERIFY_OTP: "/api/v1/auth/verify-otp",
    REFRESH_TOKEN: "/api/v1/auth/refresh",
    SURFACE: "/api/v1/surfaces",
    SPACE: "/api/v1/spaces",
    REPORT: "/api/v1/reports",
    USER: "/api/v1/users",
    CITY: "/api/v1/cities",
    WARD: "/api/v1/wards",
    WARD_ALL: "/api/v1/wards/all",
    SURFACE_ALLOWANCE: "/api/v1/surface-allowance",
    DISTRICT: "/api/v2/districts",
    DISTRICT_ALL: "/api/v1/districts/all",
};
export const testToken = `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiRElTVFJJQ1RfQURNSU4iLCJzdWIiOiJkaXN0cmljdGFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwNDc5NDcxMSwiZXhwIjoxNzA0Nzk2NTExfQ.APL5p0IeVByd9e-i7AQ1bK1jH57hzTNGfRu_tb_onCk`;

export const testParams = {
    cityIds: 1,
};
