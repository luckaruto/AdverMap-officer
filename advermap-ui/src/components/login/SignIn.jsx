import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from 'services/auth/authService';
import { setToken } from 'redux/useToken';
import { setCurrentPage } from 'redux/currentPage';
import { PAGE } from 'components/constants';
import { yupResolver } from '@hookform/resolvers/yup'
import ChakraHook from 'hooks';
import { Box, Heading, VStack, Text, useToast, Stack, Link, Avatar } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
// @ts-ignore
import { LoginSchema } from '../../constants/validation/index.ts';
// @ts-ignore
import { loginFailedDescription, loginSuccessDescription } from '../../constants/messages/index.ts';
// @ts-ignore
import FormInput from './components/FormInput';
import PasswordField from './components/PasswordField/index.jsx';
import { SubmitButton } from './authenticatePage.styles.js';


const SignIn = () => {
  // @ts-ignore
  const method = useForm({
    defaultValues: {
      email: '',
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
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  // @ts-ignore
  const { currentPage } = useSelector((state) => state.currentPage);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data){
    try {
      const { email, password } = data
      const res = await AuthService.login({ email, password });
      if (res.status === 200) {
        dispatch(setToken(res.data));
        dispatch(setCurrentPage(PAGE.HOME));
        navigate(PAGE.HOME.path, { replace: true });
        toast({
          status: 'success',
          description: loginSuccessDescription
        })
      } 
    } catch (error) {
      toast({
        status: 'error',
        description: loginFailedDescription
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
                <FormInput name="email" label="Email" placeholder="Your email" type="email" />
                <PasswordField name="password" label="Mật khẩu" placeholder="Mật khẩu của bạn" />
                <Text width="full" align="right" fontSize="sm">
                  <Link href={``} color="blue.600">
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
