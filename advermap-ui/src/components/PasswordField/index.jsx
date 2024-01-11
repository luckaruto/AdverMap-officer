// @ts-nocheck
/* eslint-disable react/prop-types */
import { FormControl, FormErrorMessage, FormLabel, HStack, Input } from '@chakra-ui/react'
import get from 'lodash/get'
import { Controller, useFormContext } from 'react-hook-form'
import { PASSWORD_PATTERN } from '../../constants/common.ts'
import React from 'react'

const PasswordField = (props) => {
  const {
    name = 'password',
    label = 'Your Password',
    placeholder = 'Your Password',
    autoFocus,
    height = '40px'
  } = props

  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl id={name} isInvalid={!!get(errors, name, false)}>
      <HStack>
        <FormLabel marginBottom={2} marginRight={2} color="gray.900">
          {label}
        </FormLabel>
      </HStack>
      <Controller
        name={name}
        control={control}
        rules={{
          required: `This field is required`,
          pattern: {
            value: PASSWORD_PATTERN,
            message:
              'The password must have at least 6 characters and a maximum of 12 characters, and it must contain 1 number, 1 uppercase letter, 1 lowercase letter and 1 symbol'
          }
        }}
        render={({ field }) => (
          <Input
            {...field}
            autoFocus={autoFocus}
            type="password"
            autoComplete="password"
            placeholder={placeholder}
            height={height}
          />
        )}
      />
      <HStack mt={1}>
        <FormErrorMessage>{errors[name] && errors[name]?.message}</FormErrorMessage>
      </HStack>
    </FormControl>
  )
}

export default PasswordField
