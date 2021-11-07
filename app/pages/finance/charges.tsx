import React, { FC, Suspense } from "react"
import {
  Flex,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { financeNavbar } from "app/core/components/layout/Navbar"
import { BlitzPage, useQuery } from "@blitzjs/core"
import { TAKE } from "app/core/configs"
import AppLayout from "app/core/components/layout/AppLayout"
import charges from "app/charge/queries/charges"
import Pagination from "app/core/components/common/Pagination"

const ListCharge: FC = () => {
  const [data] = useQuery(charges, {
    take: 5,
  })

  const colums = (): JSX.Element => (
    <Tr>
      <Th>Designation</Th>
      <Th>Description</Th>
      <Th>Prix</Th>
      <Th>Date de creation</Th>
      <Th>Action</Th>
    </Tr>
  )

  const caption = (): JSX.Element => (
    <Flex justifyContent="space-between">
      {data && (
        <Pagination
          curPage={1}
          pageCount={1}
          take={TAKE[0]}
          onTakeChange={(value) => {
            // setTake(value)
          }}
          onPageChange={(pageObj) => {
            // setPage(pageObj.selected + 1)
          }}
        />
      )}
      {data && data.items.length ? "Liste des charges" : "Aucune charge"}
    </Flex>
  )

  return (
    <Table variant="simple">
      <TableCaption>{caption()}</TableCaption>
      <Thead>{colums()}</Thead>
      <Tbody>
        {data &&
          data.items.map((c) => {
            return (
              <Tr key={c.id}>
                <Td>{c.designation}</Td>
                <Td>{c.description}</Td>
                <Td>{c.prix}</Td>
                <Td>{c.createdAt.toISOString()}</Td>
                <Td>
                  {/* <DelCharge id={c.id} />
                  <UpdateCharge initialData={c} /> */}
                  Actions
                </Td>
              </Tr>
            )
          })}
      </Tbody>
      <Tfoot>{colums()}</Tfoot>
    </Table>
  )
}

const ChargesPage: BlitzPage = () => {
  return (
    <AppLayout navbar={financeNavbar()}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">
        <Suspense fallback={<div>Chargement de la liste des charges...</div>}>
          <ListCharge />
        </Suspense>
      </Flex>
    </AppLayout>
  )
}

ChargesPage.authenticate = true

export default ChargesPage
