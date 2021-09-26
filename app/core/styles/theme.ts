import { extendTheme } from "@chakra-ui/react"

export const ICON_SIZE = 8

const theme = extendTheme({
  colors: {
    primary: "#0E3359",
    secondary: "#325288",
    tertiary: "#F4EEE8",
    quaternary: "#F5CEBE",
    quinary: "#114E60",
  },
})

export default theme
