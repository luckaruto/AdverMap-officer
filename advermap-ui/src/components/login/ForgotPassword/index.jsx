import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AuthService} from 'services/auth/authService';
import {PAGE} from 'components/constants';
import {yupResolver} from '@hookform/resolvers/yup'
import ChakraHook from 'hooks';
import {Box, Heading, VStack, Text, useToast, Stack, Link, Avatar} from '@chakra-ui/react';
import {FormProvider, useForm} from 'react-hook-form';
// @ts-ignore
import {ForgotPasswordSchema} from '../../../constants/validation/index.ts';
// @ts-ignore
import {loginFailedDescription, loginSuccessDescription} from '../../../constants/messages/index.ts';
// @ts-ignore
import FormInput from '../components/FormInput/index.jsx';
import {SubmitButton} from '../authenticatePage.styles.js';


const ForgotPassword = () => {
    // @ts-ignore
    const method = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(ForgotPasswordSchema)
    })
    const {
        handleSubmit,
        formState: {isSubmitting}
    } = method
    const toast = useToast()
    // @ts-ignore
    const {currentPage, token} = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    // @ts-ignore
    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const {email} = data
            const res = await AuthService.login({email});
            if (res.status === 200) {
                //TODO: go to input OTP page
                // dispatch(setCurrentPage(PAGE.HOME));
                // navigate(PAGE.HOME.path, { replace: true });
                toast({
                    status: 'success',
                    description: 'Gửi email thành công'
                })
            }
        } catch (error) {
            toast({
                status: 'error',
                description: 'Gửi email thất bại, vui lòng thử lại'
            })
        }
    }

    return (
        <ChakraHook>
            <Box minHeight={'100vh'}>
                <Box width="full" maxWidth="xl" marginX="auto" paddingY="188px">
                    <Box maxWidth="416px" marginX={{base: 8, md: 'auto'}}>
                        <VStack marginBottom={12} width="full" alignItems="flex-start">
                            <Heading
                                fontSize="24px"
                                marginBottom={2}
                                marginTop={14}
                                fontWeight="bold"
                                color="gray.900"
                                lineHeight="26px"
                            >
                                Quên mật khẩu
                            </Heading>
                            <Text fontSize="md" color="gray.700">
                                Nhập email để lấy lại mật khẩu
                            </Text>
                        </VStack>
                        <FormProvider {...method}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing="6">
                                    <FormInput name="email" label="Nhập email" placeholder="email của bạn"
                                               type="email"/>
                                    <SubmitButton type="submit" isLoading={isSubmitting}>
                                        Gửi email
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

export default ForgotPassword;
