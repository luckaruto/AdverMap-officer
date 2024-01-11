import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from 'services/auth/authService';
import { PAGE } from 'components/constants';
import { yupResolver } from '@hookform/resolvers/yup'
import ChakraHook from 'hooks';
import { Box, Heading, VStack, Text, useToast, Stack, Link, Avatar, HStack, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
// @ts-ignore
import { loginFailedDescription, loginSuccessDescription } from '../../../constants/messages/index.ts';
// @ts-ignore
import FormInput from '../../../components/FormInput/index.jsx';
import { SubmitButton } from '../authenticatePage.styles.js';
import { setCurrentPage } from 'redux/appSlice.jsx';
import OtpInput from 'react-otp-input';
import get from 'lodash/get'
import { OTPConfirmSchema } from 'constants/validation/index.jsx';

const OtpConfirmInput = () => {
  // @ts-ignore
  const method = useForm({
    defaultValues: {
        otp: ''
    },
    resolver: yupResolver(OTPConfirmSchema)
  })
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = method
  const toast = useToast()
  // @ts-ignore
  const dispatch = useDispatch();
  // @ts-ignore
  const navigate = useNavigate();
  const error = get(method.formState.errors, `otp.message`, '')

  async function onSubmit(data){
    try {
      const { otp } = data
      console.log("🚀 ~ onSubmit ~ otp:", otp)
      // const res = await AuthService.verifyOtp({ otp });
      dispatch(setCurrentPage(PAGE.RESET_PASSWORD));
      navigate(PAGE.RESET_PASSWORD.path, { replace: true });
      // if (res.status === 200) {
      //   //TODO: go to set password page
      //   toast({
      //     status: 'success',
      //     description: 'Gửi OTP thành công, vui lòng nhập password mới'
      //   })
      // } 
    } catch (error) {
      toast({
        status: 'error',
        description: 'Gửi OTP thất bại, vui lòng thử lại'
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
                Nhập mã OTP
            </Heading>
            <Text fontSize="md" color="gray.700">
                Vui lòng nhập mã OTP được gửi đến email của bạn
            </Text>
          </VStack>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="6">
                <FormControl isInvalid={!error}>
                  <Controller
                      name="otp"
                      control={method.control}
                      render={({ field }) => (
                      <OtpInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          numInputs={6}
                          inputStyle={{
                            width: '60px',
                            height: '100px',
                            margin: '0 5px',
                            fontSize: '40px',
                            borderRadius: '4px',
                            border: '1px solid rgba(0, 0, 0, 0.3)'
                          }}
                          renderInput={(props, index) => (
                            <input
                              {...props}
                              type="text"
                              maxLength={1}
                              key={index}
                            />
                          )}

                      />
                      )}
                  />
                  <Text color="red.500" fontSize="sm">
                    {error}
                  </Text>
                  <SubmitButton type="submit" isLoading={isSubmitting}>
                      Gửi mã OTP
                  </SubmitButton>
                </FormControl>
                </Stack>
            </form>
            </FormProvider>
        </Box>
      </Box>
    </Box>
    </ChakraHook>
  );
};

export default OtpConfirmInput;
