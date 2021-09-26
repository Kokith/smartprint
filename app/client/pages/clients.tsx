import React, { FC } from "react"
import { Flex } from "@chakra-ui/react"
import AppLayout from "app/core/components/layout/AppLayout"
import Navbar from "app/core/components/layout/Navbar"

const ClientsPage: FC = () => {
  return (
    <AppLayout navbar={<Navbar links={[]} />}>
      <Flex padding="1.5">
        {/* <CreateClient /> */}
        {/* <Spacer /> */}
        {/* <SearchClient /> */}
      </Flex>

      <Flex padding="1.5">{/* <ListClient /> */}</Flex>
    </AppLayout>
  )
}

export default ClientsPage
