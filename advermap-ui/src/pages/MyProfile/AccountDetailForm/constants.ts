import * as yup from 'yup'

export const AccountFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('email không được rỗng.')
    .email('Email không đúng định dạng.'),
  phone: yup
    .string()
    .required('Số điện thoại không được rỗng.')
    .matches(/^[0-9]+$/, 'Số điện thoại không đúng định dạng.'),
  birthday: yup
    .string()
    .required('Ngày sinh không được rỗng.')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Sinh nhật có format DD/MM/YYYY'),
  name: yup.string().required('Tên không được rỗng.')
})
