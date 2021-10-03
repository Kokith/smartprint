import React, { FC, Fragment, Suspense, useState } from "react"
import { fournisseurNavbar } from "app/core/components/layout/Navbar"
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
  Select,
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
import { DefaultFournisseurInput, DefaultFournisseurSchema } from "app/core/libs/yup"
import { Fournisseur, FournisseurType } from "db"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md"
import { ICON_SIZE } from "app/core/styles/theme"
import { TAKE } from "app/core/configs"
import { invalidateQuery, useMutation, usePaginatedQuery } from "blitz"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import AppLayout from "app/core/components/layout/AppLayout"
import fournisseurs from "../../queries/fournisseurs"
import Pagination from "app/core/components/common/Pagination"
import createFournisseur from "../../mutations/createFournisseur"
import delFournisseur from "../../mutations/delFournisseur"
import updateFournisseur from "../../mutations/updateFournisseur"

type InputKey = keyof DefaultFournisseurInput
const FormFournisseur: FC<{
  values: DefaultFournisseurInput
  errors: FormikErrors<DefaultFournisseurInput>
  touched: FormikTouched<DefaultFournisseurInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, touched, errors, onChange }) => {
  console.log({
    touched,
    errors,
  })
  const customInput = (args: { inputKey: InputKey; i: number }): JSX.Element => {
    const name = args.inputKey.charAt(0).toUpperCase() + args.inputKey.slice(1)
    const isInvalid = !!errors[args.inputKey] && !!touched[args.inputKey]
    return (
      <FormControl
        isInvalid={isInvalid}
        key={args.inputKey}
        {...{
          mt: args.i === 0 ? undefined : 4,
        }}
      >
        <FormLabel>{name}</FormLabel>
        <Input
          placeholder={name}
          value={values[args.inputKey]}
          onChange={onChange(args.inputKey)}
        />
        {isInvalid && <FormErrorMessage>{errors[args.inputKey]}</FormErrorMessage>}
      </FormControl>
    )
  }

  return (
    <Fragment>
      {Object.keys(values)
        .filter((key: InputKey) => key !== "type")
        .map((key: InputKey, i) => (
          <Fragment key={key}>{customInput({ inputKey: key, i })}</Fragment>
        ))}
      <FormControl mt={4} isInvalid={!!touched.type && !!errors.type}>
        <FormLabel>Type</FormLabel>
        <Select placeholder="Type fournisseur" value={values.type} onChange={onChange("type")}>
          <option value={FournisseurType.DIVERS}>{FournisseurType.DIVERS}</option>
          <option value={FournisseurType.IMPORT}>{FournisseurType.IMPORT}</option>
          <option value={FournisseurType.LOCAL}>{FournisseurType.LOCAL}</option>
        </Select>
        {!!touched.type && !!errors.type && <FormErrorMessage>{errors.type}</FormErrorMessage>}
      </FormControl>
    </Fragment>
  )
}

const CreateFournisseur: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleCustomError, toast } = useHandleCustomError()
  const [mutate, { isLoading }] = useMutation(createFournisseur)

  const initialValues: DefaultFournisseurInput = {
    nom: "",
    nif: "",
    stat: "",
    adresse: "",
    email: "",
    contact: "",
    type: FournisseurType.LOCAL,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: DefaultFournisseurSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutate(values)
        invalidateQuery(fournisseurs)
        resetForm()
        toast({
          title: "Le fournisseur a ete creer avec succes",
          status: "success",
          isClosable: true,
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
        Ajouter un fournisseur
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
            <ModalHeader>Ajouter un fournisseur</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormFournisseur
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                onChange={(key: string) => formik.handleChange(key)}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
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

const UpdateFournisseur: FC<{ initialData: Fournisseur }> = ({ initialData }) => {
  const { handleCustomError } = useHandleCustomError()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mutate, { isLoading }] = useMutation(updateFournisseur)
  const toast = useToast()

  const initialValues: DefaultFournisseurInput = {
    nom: initialData.nom,
    nif: initialData.nif,
    stat: initialData.stat,
    adresse: initialData.adresse,
    email: initialData.email,
    contact: initialData.contact,
    type: initialData.type,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: DefaultFournisseurSchema,
    onSubmit: async (values) => {
      try {
        await mutate({ id: initialData.id, data: values })
        toast({
          title: "Le fournisseur a ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
        invalidateQuery(fournisseurs)
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
              <FormFournisseur
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

const DelFournisseur: FC<{ id: number }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const toast = useToast()
  const cancelRef = React.useRef<any>()

  const [mutate, { isLoading }] = useMutation(delFournisseur)

  const handleSubmit = async (): Promise<void> => {
    await mutate({ id })
    invalidateQuery(fournisseurs)
    toast({
      title: "Le fournisseur a ete supprimer avec succes",
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

const SearchFournisseur: FC<{ filter: string; onChange: (value: string) => void }> = ({
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
          placeholder="Rechercher un fournisseur"
          variant="filled"
        />
      </InputGroup>
    </Box>
  )
}

const ListFournisseur: FC<{ filter: string }> = ({ filter }) => {
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(TAKE[0] as number)

  const [{ items, count }] = usePaginatedQuery(fournisseurs, {
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
      <Th>Type</Th>
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
      {items.length ? `Liste des fournisseurs (${count})` : "Aucune fournisseur"}
    </Flex>
  )

  return (
    <Table variant="simple">
      <TableCaption>{caption()}</TableCaption>
      <Thead>{colums()}</Thead>
      <Tbody>
        {items.map((f) => {
          return (
            <Tr key={f.id}>
              <Td>{f.id}</Td>
              <Td>{f.nom}</Td>
              <Td>{f.nif}</Td>
              <Td>{f.stat}</Td>
              <Td>{f.adresse}</Td>
              <Td>{f.email}</Td>
              <Td>{f.contact}</Td>
              <Td>{f.type}</Td>
              <Td>
                <DelFournisseur id={f.id} />
                <UpdateFournisseur initialData={f} />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>{colums()}</Tfoot>
    </Table>
  )
}

const FournisseursPage: FC = () => {
  const [filter, setFilter] = useState("")
  return (
    <AppLayout navbar={fournisseurNavbar()}>
      <Flex padding="1.5">
        <CreateFournisseur />
        <Spacer />
        <SearchFournisseur filter={filter} onChange={(value) => setFilter(value)} />
      </Flex>

      <Flex padding="1.5">
        <Suspense fallback={<div>Chargement de la liste des fournisseurs...</div>}>
          <ListFournisseur filter={filter} />
        </Suspense>
      </Flex>
    </AppLayout>
  )
}

export default FournisseursPage
