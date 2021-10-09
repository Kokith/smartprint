import React, { FC, Suspense, useState } from "react"
import {
  Flex,
  Spacer,
  Tr,
  Th,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react"
import { parametresNavbar } from "app/core/components/layout/Navbar"
import { TAKE } from "app/core/configs"
import { usePaginatedQuery } from "blitz"
import AppLayout from "app/core/components/layout/AppLayout"
import users from "app/user/queries/users"
import Pagination from "app/core/components/common/Pagination"

const ListUsers: FC<{ filter: string }> = ({ filter }) => {
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(TAKE[0] as number)

  const [{ items, count }] = usePaginatedQuery(users, {
    orderBy: { id: "desc" },
    skip: take * (page - 1),
    take: take,
    where: {
      nom: {
        contains: filter,
      },
    },
  })

  const colums = (): JSX.Element => (
    <Tr>
      <Th>Nom</Th>
      <Th>Email</Th>
      <Th>Contact</Th>
      <Th>Role</Th>
      <Th>Actions</Th>
    </Tr>
  )

  const caption = (): JSX.Element => (
    <Flex justifyContent="space-between">
      <Pagination
        curPage={page}
        pageCount={count / take}
        take={take}
        onTakeChange={(value) => {
          setTake(value)
        }}
        onPageChange={(pageObj) => {
          setPage(pageObj.selected + 1)
        }}
      />
      {items.length ? `Liste des utilisateurs (${count})` : "Aucun autre utilisateur"}
    </Flex>
  )

  return (
    <Table variant="simple">
      <TableCaption>{caption()}</TableCaption>
      <Thead>{colums()}</Thead>
      <Tbody>
        {items.map((c) => {
          return (
            <Tr key={c.id}>
              <Td>{c.nom}</Td>
              <Td>{c.email}</Td>
              <Td>{c.contact}</Td>
              <Td>{c.role}</Td>
              <Td>
                {/* <DelClient id={c.id} />
                <UpdateClient initialData={c} /> */}
                actions
              </Td>
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>{colums()}</Tfoot>
    </Table>
  )
}

const UtilisateursPage: FC = () => {
  const [filter, setFilter] = useState("")

  return (
    <AppLayout navbar={parametresNavbar()}>
      <Flex padding="1.5">
        <Spacer />
      </Flex>

      <Flex padding="1.5">
        <Suspense fallback={<div>Chargement de la liste des utilisateurs...</div>}>
          <ListUsers filter={filter} />
        </Suspense>
      </Flex>
    </AppLayout>
  )
}

export default UtilisateursPage
