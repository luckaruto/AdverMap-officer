// @ts-nocheck
/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormErrorMessage,
  Button,
  Text
} from '@chakra-ui/react'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'
// import Icon from '../Icon/index.tsx'
const FormInput = (props) => {
  const {
    name,
    label,
    type = 'text',
    placeholder,
    isRequired = true,
    children,
    readonly,
    disabled,
    hideLabel,
    className,
    errorClassName,
    inputColor,
    min,
    width,
    height,
    autoComplete,
    hideErrorMessage,
    removeButtonLabel,
    onRemoveButtonClick,
    maxLength,
    numberWithoutStep = false,
    labelMb = 4
  } = props
  const {
    register,
    formState: { errors },
    control
  } = useFormContext()
  let pattern
  switch (name) {
    case 'dateOfBirth':
      //*INFO: validate (MM/DD/YYYY), with a year between 1900 and 2099
      pattern = {
        value: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/,
        message: 'Please enter a valid date'
      }
      break
    default:
      pattern = undefined
  }
  const error = get(errors, `${name}.message`, '')
  const disabledProps = disabled
    ? {
        disabled: true,
        background: 'gray.300',
        opacity: '0.7 !important',
        color: 'gray.400',
        variant: 'filled',
        borderColor: 'gray.400'
      }
    : {}

  return (
    <FormControl
      isInvalid={!!get(errors, name, false)}
      alignSelf={!label || hideLabel ? 'flex-end' : undefined}
      className={className}
      width={width}
    >
      <HStack
        spacing="14px"
        maxHeight={6}
        marginBottom={label ? 2 : 0}
        position="relative"
        justifyContent="space-between"
        mb={labelMb}
      >
        {label && !hideLabel && (
          <FormLabel color="gray.700" lineHeight={6} marginBottom={0} marginInlineEnd={0} minWidth="200px">
            {label}
          </FormLabel>
        )}
        {removeButtonLabel && (
          <Button variant={'outline'} onClick={onRemoveButtonClick}>
            {removeButtonLabel}
          </Button>
        )}
      </HStack>
      {children ? (
        children
      ) : type !== 'number' ? (
        // <Controller
        //   name={name}
        //   control={control}
        //   rules={{ required: isRequired ? `${label ?? startCase(name)} is required` : false }}
        //   render={({ field }) => (
        //     <Input
        //       height={height}
        //       type={type}
        //       autoComplete={autoComplete ?? name}
        //       placeholder={placeholder}
        //       isReadOnly={readonly}
        //       color={inputColor}
        //       maxLength={maxLength}
        //       {...disabledProps}
        //       {...field}
        //       onChange={v => {
        //         field.onChange(v)
        //         onChange?.(v)
        //       }}
        //       onFocusCapture={() => onFocusCapture?.()}

        //       // {...register(name, {
        //       //   required: isRequired ? `${label ?? startCase(name)} is required` : false
        //       // })}
        //     />
        //   )}
        // />
        <Input
          height={height}
          type={type}
          autoComplete={autoComplete ?? name}
          placeholder={placeholder}
          isReadOnly={readonly}
          color={inputColor}
          maxLength={maxLength}
          {...disabledProps}
          {...register(name, {
            required: isRequired ? `${label ?? startCase(name)} is required` : false
          })}
        />
      ) : (
        // <Input
        //   height={height}
        //   type={type}
        //   autoComplete={autoComplete ?? name}
        //   placeholder={placeholder}
        //   isReadOnly={readonly}
        //   color={inputColor}
        //   maxLength={maxLength}
        //   {...disabledProps}
        //   {...register(name, {
        //     required: isRequired ? `${label ?? startCase(name)} is required` : false
        //   })}
        // />
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput focusBorderColor="teal.500" borderColor="gray.400" {...field} min={min}>
              <NumberInputField maxLength={maxLength} />
              {!numberWithoutStep && (
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              )}
            </NumberInput>
          )}
        />
      )}
      {!hideErrorMessage && (
        <HStack mt={1}>
          <FormErrorMessage className={errorClassName}>
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          </FormErrorMessage>
        </HStack>
      )}
    </FormControl>
  )
}

export default FormInput
