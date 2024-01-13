import {
    Box,
    Button,
    Grid,
    GridItem,
    Spinner,
    Stack,
    useToast
  } from '@chakra-ui/react'
  import { yupResolver } from '@hookform/resolvers/yup'
  import get from 'lodash/get'
  import React, { memo, useEffect } from 'react'
  import { useForm, FormProvider, set } from 'react-hook-form'
  import FormInput from 'components/FormInput'
  import { AccountFormSchema } from './constants.ts'
import { UserService } from 'services/user/UserService.jsx'
import moment from 'moment'
  
  
  const AccountDetailForm = () => {
    const currentAccountId = 1
    const method = useForm({
      reValidateMode: 'onChange',
      mode: 'all',
      resolver: yupResolver(AccountFormSchema)
    })
  
    const { handleSubmit, reset, formState } = method
    const { errors } = formState
    const toast = useToast()
    const [isLoading, setIsLoading] = React.useState(false)
    const [userId, setUserId] = React.useState(0)
  
  
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await UserService.getCurrentUser()
        const data = get(response, 'data')
        const birthday = get(data, 'birthday')
        setUserId(get(data, 'id'))
        reset({
          email: get(data, 'email'),
          name: get(data, 'name'),
          phone: get(data, 'phone'),
          birthday: moment(birthday).format('DD/MM/YYYY'),
          role: get(data, 'role'),
        })
        setIsLoading(false)
      }
      catch (error) {
        setIsLoading(false)
        toast({
          status: 'error',
          description: 'There was an error. Please try again.'
        })
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])

    async function onSubmit(data) {
      try {
        setIsLoading(true)
        const payload = {
          email: data.email,
          name: data.name,
          phone: data.phone,
          birthday: new Date(data.birthday),
        }
        await UserService.updateUser(payload)
        toast({
          status: 'success',
          description: 'Update successfully'
        })
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        toast({
          status: 'error',
          description: 'There was an error. Please try again.'
        })
      }

    }

    if (isLoading) {
      return <Spinner size="sm" color="blue.600" />
    }
    return (
      <FormProvider {...method}>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Box w="100%" minW="fit-content" p="1.5">
            <Grid templateColumns="repeat(12, 1fr)" gap={6} overflow="auto">
                <GridItem w="100%" colSpan={12} >
                    <FormInput label="email" name="email" type="text" />
                </GridItem>
                <GridItem w="100%" colSpan={12} >
                    <FormInput label="tên" name="name" type="text" />
                </GridItem>
                <GridItem w="100%" colSpan={12} >
                    <FormInput label="số điện thoại" name="phone" type="text" />
                </GridItem>
                <GridItem w="100%" colSpan={12} >
                    <FormInput label="sinh nhật" name="birthday" type="text" />
                </GridItem>
                <GridItem w="100%" colSpan={12} >
                    <FormInput label="vai trò" name="role" type="text" readonly />
                </GridItem>
            </Grid>
          </Box>
          <Stack direction="row" spacing={4} justifyContent="flex-end">
            <Button
              type="submit"
              isLoading={false}
              variant="solid"
              backgroundColor="#2563EB"
              color="#fff"
              height="50px"
              borderRadius="10px"
              marginTop="20px"
              alignSelf={'flex-end'}
            >
              Lưu
            </Button>
          </Stack>
        </form>
      </FormProvider>
    )
  }
  
  export default memo(AccountDetailForm)
  