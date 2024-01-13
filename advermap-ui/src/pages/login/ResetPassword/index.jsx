import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from 'services/auth/authService';
 import {setCurrentPage, setForgotPasswordEmail, setOtp, setToken} from 'redux/appSlice';
import { PAGE } from 'components/constants';
import { yupResolver } from '@hookform/resolvers/yup'
import ChakraHook from 'hooks';
import { Box, Heading, VStack, Text, useToast, Stack, Link, Avatar } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import {  ResetPasswordSchema } from '../../../constants/validation/index.jsx';
// @ts-ignore
import PasswordField from '../../../components/PasswordField/index.jsx';
import { SubmitButton } from '../authenticatePage.styles.js';


const ResetPassword = () => {
  // @ts-ignore
  const method = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(ResetPasswordSchema)
  })
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = method
  const toast = useToast()
  // @ts-ignore
  const {otp, forgotPasswordEmail} = useSelector((state) => state.appState);
  console.log("🚀 ~ ResetPassword ~ otp:", otp)
  const dispatch = useDispatch();
  // @ts-ignore
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data){
    try {
      const { password, confirmPassword } = data
      if (password === confirmPassword) {
        const res = await AuthService.resetPassword({ otp, email:forgotPasswordEmail, password });
        if (res.status === 200) {
          dispatch(setOtp(0))
          dispatch(setForgotPasswordEmail(''))
          dispatch(setToken(res.data.token));
          dispatch(setCurrentPage(PAGE.HOME));
          navigate(PAGE.HOME.path, { replace: true });
          toast({
            status: 'success',
            description: 'Đăng nhập thành công'
          })
        } 
      }
    } catch (error) {
      toast({
        status: 'error',
        description: 'Đăng nhập thất bại, vui lòng thử lại'
      })
    }
  }
  return (
    <ChakraHook>
      <Box minHeight={'100vh'}>
      <Box width="full" maxWidth="xl" marginX="auto" paddingY="188px">
        <Box maxWidth="416px" marginX={{ base: 8, md: 'auto' }}>
          <VStack marginBottom={12} width="full" alignItems="flex-start">
            <Heading
              fontSize="24px"
              marginBottom={2}
              marginTop={14}
              fontWeight="bold"
              color="gray.900"
              lineHeight="26px"
            >
              Đặt lại mật khẩu
            </Heading>
            <Text fontSize="md" color="gray.700">
              Nhập mật khẩu mới
            </Text>
          </VStack>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="4">
                <PasswordField name="password" label="Mật khẩu" placeholder="Mật khẩu của bạn" />
                <PasswordField name="confirmPassword" label="Xác nhận mật khẩu" placeholder="Xác nhận mật khẩu của bạn" />
                <SubmitButton type="submit" isLoading={isSubmitting || isLoading}>
                  Đăng nhập
                </SubmitButton>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
    </ChakraHook>
  );
};

export default ResetPassword;
