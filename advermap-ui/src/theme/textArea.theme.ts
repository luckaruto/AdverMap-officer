import { focusBorderColorSecondary } from './globalStyles.ts'

export const CustomTextArea = {
  variants: {
    outline: {
      fontSize: '16px',
      borderColor: '#A9A9A9',
      borderRadius: '8px',
      _focus: {
        borderColor: focusBorderColorSecondary,
        boxShadow: `0 0 0 1px ${focusBorderColorSecondary}`
      }
    },
    filled: {
      _focus: {
        borderColor: focusBorderColorSecondary,
        boxShadow: `0 0 0 1px ${focusBorderColorSecondary}`
      }
    },
    flushed: {
      _focus: {
        borderColor: focusBorderColorSecondary,
        boxShadow: `0 1px 0 0 ${focusBorderColorSecondary}`
      }
    }
  }
}
