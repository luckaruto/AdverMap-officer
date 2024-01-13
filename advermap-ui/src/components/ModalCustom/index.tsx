import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
  } from '@chakra-ui/react'
import React from 'react'
  
  export interface IModalCustom {
    isOpen: boolean
    onClose: () => void
    children: JSX.Element
    title: string
    onSecondaryClick?: () => void
    secondaryText?: string
    onTertiaryClick?: () => void
    tertiaryText?: string
    isFleetDetail?: boolean
    isLoading?: boolean
  }
  
  export const ModalCustom = (props: IModalCustom) => {
    const {
      isOpen = false,
      onClose,
      children,
      title = '',
      onSecondaryClick,
      secondaryText = '',
      tertiaryText = '',
      onTertiaryClick,
      isFleetDetail = false,
      isLoading = false
    } = props
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={'fit-content'} pb="16px" borderRadius={'12px'}>
          <ModalHeader
            borderBottom={'1px'}
            borderColor={'gray.300'}
            display={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            {title}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter justifyContent={onTertiaryClick ? 'space-between' : 'flex-end'}>
            {onTertiaryClick && (
              <Button
                isLoading={isLoading}
                variant="ghost"
                onClick={onTertiaryClick}
                backgroundColor="red.500"
                color="white"
              >
                {tertiaryText}
              </Button>
            )}
            <Box>
              {!isFleetDetail && (
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
              )}
              {onSecondaryClick && (
                <Button isLoading={isLoading} variant="ghost" onClick={onSecondaryClick} backgroundColor="#FFCD1C">
                  {secondaryText}
                </Button>
              )}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  