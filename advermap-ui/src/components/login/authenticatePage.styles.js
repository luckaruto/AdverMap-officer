import { Button as CkButton, chakra } from '@chakra-ui/react'

export const SubmitButton = chakra(CkButton, () => ({
  size: 'md',
  fontSize: 'md',
  background: '#FFCD1C',
  _hover: {
    background: '#FFCD1C'
  },
  _focus: {
    background: '#FFCD1C'
  }
}))
