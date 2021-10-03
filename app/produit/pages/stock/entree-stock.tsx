import { stockNavbar } from "app/core/components/layout/Navbar"
import { FC } from "react"
import { Flex, Spacer } from "@chakra-ui/react"
import AppLayout from "app/core/components/layout/AppLayout"

const EntreeStockPage: FC = () => {
  return (
    <AppLayout navbar={stockNavbar()}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

export default EntreeStockPage
