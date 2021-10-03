import { FC } from "react"
import { Flex, Spacer } from "@chakra-ui/react"
import { parametresNavbar } from "app/core/components/layout/Navbar"
import AppLayout from "app/core/components/layout/AppLayout"

const UtilisateursPage: FC = () => {
  return (
    <AppLayout navbar={parametresNavbar()}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5"></Flex>
    </AppLayout>
  )
}

export default UtilisateursPage
