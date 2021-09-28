import React, { FC, Fragment, useState, Suspense } from "react"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { ICON_SIZE } from "app/core/styles/theme"
import { MdAdd } from "react-icons/md"
import { CreateClientInput, CreateClientSchema } from "app/core/libs/yup"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import { invalidateQuery, useMutation, usePaginatedQuery } from "blitz"
import { TAKE } from "app/core/configs"
import AppLayout from "app/core/components/layout/AppLayout"
import Navbar from "app/core/components/layout/Navbar"
import createClient from "../mutations/createClient"
import Pagination from "app/core/components/common/Pagination"
import clients from "../queries/clients"

const FormClient: FC<{
  values: CreateClientInput
  errors: FormikErrors<CreateClientInput>
  touched: FormikTouched<CreateClientInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, errors, touched, onChange }) => {
  const isInvalid = (key: keyof CreateClientInput): boolean =>
    errors[key] && touched[key] ? true : false

  return (
    <Fragment>
      <FormControl isInvalid={isInvalid("nom")}>
        <FormLabel>Nom</FormLabel>
        <Input placeholder="Nom" value={values.nom} onChange={onChange("nom")} />
        {isInvalid("nom") && <FormErrorMessage>{errors.nom}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("nif")}>
        <FormLabel>Nif</FormLabel>
        <Input placeholder="Nif" value={values.nif} onChange={onChange("nif")} />
        {isInvalid("nif") && <FormErrorMessage>{errors.nif}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("stat")}>
        <FormLabel>Stat</FormLabel>
        <Input placeholder="Stat" value={values.stat} onChange={onChange("stat")} />
        {isInvalid("stat") && <FormErrorMessage>{errors.stat}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("adresse")}>
        <FormLabel>Adresse</FormLabel>
        <Input placeholder="Adresse" value={values.adresse} onChange={onChange("adresse")} />
        {isInvalid("adresse") && <FormErrorMessage>{errors.adresse}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("contact")}>
        <FormLabel>Contact</FormLabel>
        <Input placeholder="Contact" value={values.contact} onChange={onChange("contact")} />
        {isInvalid("contact") && <FormErrorMessage>{errors.contact}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("email")}>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" value={values.email} onChange={onChange("email")} />
        {isInvalid("email") && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>
    </Fragment>
  )
}

const CreateClient: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleCustomError, toast } = useHandleCustomError()
  const [mutate, { isLoading }] = useMutation(createClient)

  const initialValues: CreateClientInput = {
    nom: "",
    nif: "",
    stat: "",
    adresse: "",
    email: "",
    contact: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema: CreateClientSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutate(values, {
          onSuccess() {
            resetForm()
            toast({
              title: "Le client a bien ete creer",
              status: "success",
              isClosable: true,
            })
            invalidateQuery(clients)
          },
        })
      } catch (err) {
        handleCustomError(err)
      }
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
        Ajouter un client
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
            <ModalHeader>Ajouter un client</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormClient
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                onChange={(key: string) => formik.handleChange(key)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
                loadingText="En cours"
              >
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

const ListClient: FC = () => {
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(TAKE[0] as number)

  const [{ items, pageCount }] = usePaginatedQuery(clients, {
    orderBy: { id: "desc" },
    skip: take * (page - 1),
    take: take,
  })

  const colums = (): JSX.Element => (
    <Tr>
      <Th>Nom</Th>
      <Th>Nif</Th>
      <Th>Stat</Th>
      <Th>Adresse</Th>
      <Th>Contact</Th>
      <Th>Actions</Th>
    </Tr>
  )

  const caption = (): JSX.Element => (
    <Flex justifyContent="space-between">
      <Pagination
        curPage={page}
        pageCount={pageCount}
        take={take}
        onTakeChange={(value) => {
          setTake(value)
        }}
        onPageChange={(pageObj) => {
          setPage(pageObj.selected + 1)
        }}
      />
      {items.length ? "Liste des clients" : "Aucune client"}
    </Flex>
  )

  return (
    <Table variant="simple">
      <TableCaption>{caption()}</TableCaption>
      <Thead>{colums()}</Thead>
      <Tbody>
        {items.map((c: any) => {
          return (
            <Tr key={c.id}>
              <Td>{c.nom}</Td>
              <Td>{c.nif}</Td>
              <Td>{c.stat}</Td>
              <Td>{c.adresse}</Td>
              <Td>{c.contact}</Td>
              <Td>
                {/* <DelClient id={c.id} />
                  <UpdateClient initialData={c} /> */}
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

const ClientsPage: FC = () => {
  return (
    <AppLayout navbar={<Navbar links={[]} />}>
      <Flex padding="1.5">
        <CreateClient />
      </Flex>

      <Flex padding="1.5">
        <Suspense fallback={<div>Loading...</div>}>
          <ListClient />
        </Suspense>
      </Flex>
    </AppLayout>
  )
}

export default ClientsPage
