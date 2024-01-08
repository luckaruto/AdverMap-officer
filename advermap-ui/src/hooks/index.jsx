import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// @ts-ignore
import { getTheme } from '../theme/index.ts'

export const theme = getTheme()

// eslint-disable-next-line react/prop-types
export default function ChakraHook({ children }) {
    return (
        <ChakraProvider
          theme={theme}
          toastOptions={{
            defaultOptions: {
              position: 'top',
              duration: 3000,
              isClosable: true,
              variant: 'subtle'
            }
          }}
        >
            {children}
        </ChakraProvider>
    )
}