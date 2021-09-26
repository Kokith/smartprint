import { FC } from "react"
import { Text } from "@chakra-ui/react"

const Title: FC = ({ children }) => {
  return (
    <Text fontSize="2xl" fontWeight="bold" color="primary">
      {children}
    </Text>
  )
}

export default Title
