import { FC } from "react"
import { Flex, Spacer } from "@chakra-ui/react"
import AppLayout from "app/core/components/layout/AppLayout"
import Navbar from "app/core/components/layout/Navbar"

const ProjetsPage: FC = () => {
  return (
    <AppLayout navbar={<Navbar links={[]} />}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

export default ProjetsPage
