import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderColor: 'gray.400',
    width: '20px',
    height: '20px'
  }
})

export const CustomRadio = defineMultiStyleConfig({ baseStyle })
