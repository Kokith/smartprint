import React, { FC, Fragment, useState, Suspense } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
  useToast,
} from "@chakra-ui/react"
import { ICON_SIZE } from "app/core/styles/theme"
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md"
import { DefaultClientInput, DefaultClientSchema } from "app/core/libs/yup"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import { invalidateQuery, useMutation, usePaginatedQuery } from "blitz"
import { TAKE } from "app/core/configs"
import { Client } from "db"
import AppLayout from "app/core/components/layout/AppLayout"
import Navbar from "app/core/components/layout/Navbar"
import createClient from "../mutations/createClient"
import Pagination from "app/core/components/common/Pagination"
import clients from "../queries/clients"
import delClient from "../mutations/delClients"
import updateClient from "../mutations/updateClient"

const FormClient: FC<{
  values: DefaultClientInput
  errors: FormikErrors<DefaultClientInput>
  touched: FormikTouched<DefaultClientInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, errors, touched, onChange }) => {
  const isInvalid = (key: keyof DefaultClientInput): boolean =>
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

  const initialValues: DefaultClientInput = {
    nom: "",
    nif: "",
    stat: "",
    adresse: "",
    email: "",
    contact: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema: DefaultClientSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutate(values, {
          onSuccess() {
            resetForm()
            toast({
              title: "Le client a ete creer avec succes",
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

const UpdateClient: FC<{ initialData: Client }> = ({ initialData }) => {
  const { handleCustomError } = useHandleCustomError()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mutate, { isLoading }] = useMutation(updateClient)
  const toast = useToast()

  const initialValues: DefaultClientInput = {
    nom: initialData.nom,
    nif: initialData.nif,
    stat: initialData.stat,
    adresse: initialData.adresse,
    email: initialData.email,
    contact: initialData.contact,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: DefaultClientSchema,
    onSubmit: async (values) => {
      try {
        await mutate({ id: initialData.id, data: values })
        toast({
          title: "Le client a ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
        invalidateQuery(clients)
      } catch (err) {
        handleCustomError(err)
      }
    },
  })

  const initialRef = React.useRef<any>()
  const finalRef = React.useRef<any>()

  return (
    <Fragment>
      <Button colorScheme="blue" onClick={onOpen} variant="ghost">
        <Icon as={MdEdit} width={ICON_SIZE} height={ICON_SIZE} />
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
            <ModalHeader>Modifier un client</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormClient
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                onChange={(key) => formik.handleChange(key)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                Modifier
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Fragment>
  )
}

const DelClient: FC<{ id: number }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const toast = useToast()
  const cancelRef = React.useRef<any>()

  const [mutate, { isLoading }] = useMutation(delClient)

  const handleSubmit = async (): Promise<void> => {
    await mutate({ id })
    invalidateQuery(clients)
    toast({
      title: "Le client a ete supprimer avec succes",
      status: "success",
      isClosable: true,
    })
  }

  return (
    <Fragment>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        <Icon as={MdDelete} width={ICON_SIZE} height={ICON_SIZE} color="red" />
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer un client
            </AlertDialogHeader>

            <AlertDialogBody>Etes vous sur de vouloir supprimer ce client ?</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleSubmit} mr={3} isLoading={isLoading}>
                Supprimer
              </Button>
              <Button ref={cancelRef} onClick={onClose} marginLeft="">
                Annuler
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  )
}

const SearchClient: FC<{ filter: string; onChange: (value: string) => void }> = ({
  filter,
  onChange,
}) => {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={MdSearch} />
        </InputLeftElement>
        <Input
          value={filter}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Rechercher un client"
          variant="filled"
        />
      </InputGroup>
    </Box>
  )
}

const ListClient: FC<{ filter: string }> = ({ filter }) => {
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(TAKE[0] as number)

  const [{ items, count }] = usePaginatedQuery(clients, {
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
      <Th>Identifiant</Th>
      <Th>Nom</Th>
      <Th>Nif</Th>
      <Th>Stat</Th>
      <Th>Adresse</Th>
      <Th>Email</Th>
      <Th>Contact</Th>
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
      {items.length ? `Liste des clients (${count})` : "Aucune client"}
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
              <Td>{c.id}</Td>
              <Td>{c.nom}</Td>
              <Td>{c.nif}</Td>
              <Td>{c.stat}</Td>
              <Td>{c.adresse}</Td>
              <Td>{c.email}</Td>
              <Td>{c.contact}</Td>
              <Td>
                <DelClient id={c.id} />
                <UpdateClient initialData={c} />
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
  const [filter, setFilter] = useState("")
  return (
    <AppLayout navbar={<Navbar links={[]} />}>
      <Flex padding="1.5">
        <CreateClient />
        <Spacer />
        <SearchClient
          filter={filter}
          onChange={(value) => {
            setFilter(value)
          }}
        />
      </Flex>

      <Flex padding="1.5">
        <Suspense fallback={<div>Chargement de la liste des clients...</div>}>
          <ListClient filter={filter} />
        </Suspense>
      </Flex>
    </AppLayout>
  )
}

export default ClientsPage
