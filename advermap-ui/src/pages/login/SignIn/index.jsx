import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from 'services/auth/authService';
import {setCurrentPage, setToken} from 'redux/appSlice';
import { PAGE } from 'components/constants';
import { yupResolver } from '@hookform/resolvers/yup'
import ChakraHook from 'hooks';
import { Box, Heading, VStack, Text, useToast, Stack, Link, Avatar } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginSchema } from '../../../constants/validation/index.ts';
import { loginFailedDescription, loginSuccessDescription } from '../../../constants/messages/index.ts';
// @ts-ignore
import FormInput from '../../../components/FormInput/index.jsx';
import PasswordField from '../../../components/PasswordField/index.jsx';
import { SubmitButton } from '../authenticatePage.styles.js';


const SignIn = () => {
  // @ts-ignore
  const method = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(LoginSchema)
  })
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = method
  const toast = useToast()
  // @ts-ignore
  const {currentPage,token} = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  // @ts-ignore
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data){
    try {
      const { username, password } = data
      const res = await AuthService.login({ username, password });
      if (res.status === 200) {
        dispatch(setToken(res.data));
        dispatch(setCurrentPage(PAGE.HOME));
        navigate(PAGE.HOME.path, { replace: true });
        toast({
          status: 'success',
          description: 'Đăng nhập thành công'
        })
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
            <Avatar size="lg" src="https://bit.ly/broken-link" />
            <Heading
              fontSize="24px"
              marginBottom={2}
              marginTop={14}
              fontWeight="bold"
              color="gray.900"
              lineHeight="26px"
            >
              Đăng nhập
            </Heading>
            <Text fontSize="md" color="gray.700">
              Đăng nhập để tiếp tục
            </Text>
          </VStack>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="4">
                <FormInput name="username" label="Tên đăng nhập" placeholder="Tên đăng nhập" />
                <PasswordField name="password" label="Mật khẩu" placeholder="Mật khẩu của bạn" />
                <Text width="full" align="right" fontSize="sm">
                  <Link href={PAGE.FORGOT_PASSWORD.path} color="blue.500">
                    Quên mật khẩu?
                  </Link>
                </Text>
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

export default SignIn;
