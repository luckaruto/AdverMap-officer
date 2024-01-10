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
  .matches(/^[0-9]{6}$/, 'OTP must be 6 digits')

})

export const ResetPasswordSchema = yup.object().shape({
  password: yup.string().required('This field is required')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'),
  confirmPassword: yup.string().required('This field is required')
  .oneOf([yup.ref('password'), null], 'Passwords must match')
})
