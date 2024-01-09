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

export const SelectFleetSchema = yup.object().shape({
  fleet: yup.string().required('This field is required')
})
