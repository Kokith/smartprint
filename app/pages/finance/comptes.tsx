import { FC } from "react"
import { Flex, Spacer } from "@chakra-ui/react"
import { financeNavbar } from "app/core/components/layout/Navbar"
import AppLayout from "app/core/components/layout/AppLayout"

const ComptesPage: FC = () => {
  return (
    <AppLayout navbar={financeNavbar()}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

export default ComptesPage
