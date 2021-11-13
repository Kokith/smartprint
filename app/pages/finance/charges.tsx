import React, { FC, Fragment, Suspense, useState } from "react"
import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { financeNavbar } from "app/core/components/layout/Navbar"
import { BlitzPage, useQuery } from "@blitzjs/core"
import { TAKE } from "app/core/configs"
import AppLayout from "app/core/components/layout/AppLayout"
import charges from "app/charge/queries/charges"
import Pagination from "app/core/components/common/Pagination"
import { ICON_SIZE } from "app/core/styles/theme"
import { useFormik } from "formik"
import { MdAdd } from "react-icons/md"

const AddCharge: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { mutate } = useAddCharge()

  // const initialValues: ChargeInput = {
  //   designation: "",
  //   description: "",
  //   prix: 0,
  //   date: new Date().toISOString(),
  // }

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { resetForm }) => {
      // mutate(
      //   {
      //     input: {
      //       ...values,
      //       prix: Number(values.prix),
      //     },
      //   },
      //   {
      //     onSuccess() {
      //       resetForm()
      //     },
      //   }
      // )
    },
  })

  const initialRef = React.useRef<any>()
  const finalRef = React.useRef<any>()

  return (
    <Fragment>
      <Button
        colorScheme="blue"
        leftIcon={<Icon as={MdAdd} width={ICON_SIZE} height={ICON_SIZE} />}
        onClick={onOpen}
      >
        Ajouter une charge
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ajouter une charge</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* <FormCharge values={formik.values} onChange={(key) => formik.handleChange(key)} /> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" disabled={false}>
                Ajouter
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Fragment>
  )
}

const ListCharge: FC = () => {
  const [take, setTake] = useState<number>(TAKE[0] as number)
  const [page, setPage] = useState(1)

  const [{ items, count }] = useQuery(charges, {
    take,
    skip: take * (page - 1),
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
      {items && (
        <Pagination
          curPage={1}
          pageCount={count / take}
          take={take}
          onTakeChange={(value) => {
            setTake(value)
          }}
          onPageChange={(pageObj) => {
            setPage(pageObj.selected + 1)
          }}
        />
      )}
      {items && items.length ? "Liste des charges" : "Aucune charge"}
    </Flex>
  )

  return (
    <Table variant="simple">
      <TableCaption>{caption()}</TableCaption>
      <Thead>{colums()}</Thead>
      <Tbody>
        {items &&
          items.map((c) => {
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
        <AddCharge />
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
