import { FC } from "react"
import { fournisseurNavbar } from "app/core/components/layout/Navbar"
import { Flex, Spacer } from "@chakra-ui/react"
import AppLayout from "app/core/components/layout/AppLayout"

const FournisseursPage: FC = () => {
  return (
    <AppLayout navbar={fournisseurNavbar()}>
      <Flex padding="1.5">
        {/* <AddFournisseur /> */}
        <Spacer />
        {/* <SearchFournisseur /> */}
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

export default FournisseursPage
