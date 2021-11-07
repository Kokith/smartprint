import React from "react"
import { Flex, Spacer } from "@chakra-ui/react"
import { BlitzPage } from "blitz"
import AppLayout from "app/core/components/layout/AppLayout"
import Navbar from "app/core/components/layout/Navbar"

const DashboardPage: BlitzPage = () => {
  return (
    <AppLayout navbar={<Navbar links={[]} />}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

DashboardPage.authenticate = true

export default DashboardPage
