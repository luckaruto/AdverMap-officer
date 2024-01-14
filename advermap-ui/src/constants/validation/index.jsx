import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Tên đăng nhập không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống')
})

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('This field is required')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email must be a valid email')
})


export const OTPConfirmSchema = yup.object().shape({
  otp: yup.string().required('This field is required')
  .matches(/^[0-9]{5}$/, 'OTP must be 5 digits')
})

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required('This field is required')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'),
  confirmPassword: yup.string().required('This field is required')
  .oneOf([yup.ref('password'), null], 'Passwords must match')
})


export const requiredError={
  address:'Địa chỉ không được để trống',
  password:'Tên đăng nhập không được để trống',
  default:'Trường này không được để trống',
  email:'Email không hợp lệ',
  phone:'Số điện thoại không hợp lệ',
}

export const validatedError={
  email:'Email must be a valid email',
  phone:'Value must be a valid phone number',
}
