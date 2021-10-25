import React, { FC, Fragment, Suspense, useState } from "react"
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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useDisclosure,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react"
import { parametresNavbar } from "app/core/components/layout/Navbar"
import { TAKE } from "app/core/configs"
import { invalidateQuery, useMutation, usePaginatedQuery } from "blitz"
import {
  CreateUserInput,
  CreateUserSchema,
  UpdateUserInput,
  UpdateUserSchema,
} from "app/user/validation"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import { ICON_SIZE } from "app/core/styles/theme"
import { User, UserRole } from "db"
import AppLayout from "app/core/components/layout/AppLayout"
import users from "app/user/queries/users"
import Pagination from "app/core/components/common/Pagination"
import createUser from "app/user/mutations/createUser"
import DefaultSearch from "app/core/components/DefaultSearch"
import delUser from "app/user/mutations/delUser"
import updateUser from "app/user/mutations/updateUser"
import FormUpdateUser from "app/core/components/utilisateurs/FormUpdateUtilisateur"

const FormCreateUser: FC<{
  values: CreateUserInput
  errors: FormikErrors<CreateUserInput>
  touched: FormikTouched<CreateUserInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, errors, touched, onChange }) => {
  const isInvalid = (key: keyof CreateUserInput): boolean =>
    errors[key] && touched[key] ? true : false

  return (
    <Fragment>
      <FormControl isInvalid={isInvalid("nom")}>
        <FormLabel>Nom</FormLabel>
        <Input placeholder="Nom" value={values.nom} onChange={onChange("nom")} />
        {isInvalid("nom") && <FormErrorMessage>{errors.nom}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("email")}>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" value={values.email} onChange={onChange("email")} />
        {isInvalid("email") && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("contact")}>
        <FormLabel>Contact</FormLabel>
        <Input placeholder="Contact" value={values.contact} onChange={onChange("contact")} />
        {isInvalid("contact") && <FormErrorMessage>{errors.contact}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("role")}>
        <FormLabel>Role</FormLabel>
        <Select placeholder="Role utilisateur" value={values.role} onChange={onChange("role")}>
          <option value={UserRole.USER}>{UserRole.USER}</option>
          <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
        </Select>
        {isInvalid("role") && <FormErrorMessage>{errors.role}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isInvalid("mdp")}>
        <FormLabel>Mot de passe</FormLabel>
        <Input
          type="Mot de passe"
          placeholder="mdp"
          value={values.mdp}
          onChange={onChange("mdp")}
        />
        {isInvalid("mdp") && <FormErrorMessage>{errors.mdp}</FormErrorMessage>}
      </FormControl>
    </Fragment>
  )
}

const CreateUser: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleCustomError, toast } = useHandleCustomError()
  const [mutate, { isLoading }] = useMutation(createUser)

  const initialValues: CreateUserInput = {
    nom: "",
    email: "",
    contact: "",
    role: "USER",
    mdp: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema: CreateUserSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutate(values, {
          onSuccess() {
            resetForm()
            toast({
              title: "L'utilisateur a ete creer avec succes",
              status: "success",
              isClosable: true,
            })
            invalidateQuery(users)
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
        Ajouter un utilisateur
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
            <ModalHeader>Ajouter un utilisateur</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormCreateUser
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

const UpdateUtilisateur: FC<{ initialData: User }> = ({ initialData }) => {
  const { handleCustomError } = useHandleCustomError()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mutate, { isLoading }] = useMutation(updateUser)
  const toast = useToast()

  const initialValues: UpdateUserInput = {
    nom: initialData.nom,
    email: initialData.email,
    contact: initialData.contact,
    role: initialData.role,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values) => {
      try {
        await mutate({ id: initialData.id, data: values })
        toast({
          title: "L'utilisateur a ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
        invalidateQuery(users)
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
              <FormUpdateUser
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

const DelUser: FC<{ id: number }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const toast = useToast()
  const cancelRef = React.useRef<any>()

  const [mutate, { isLoading }] = useMutation(delUser)

  const handleSubmit = async (): Promise<void> => {
    await mutate({ id })
    invalidateQuery(users)
    toast({
      title: "L'utilisateur a ete supprimer avec succes",
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
              Supprimer un utilisateur
            </AlertDialogHeader>

            <AlertDialogBody>Etes vous sur de vouloir supprimer cet utilisateur ?</AlertDialogBody>

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
        {items.map((u) => {
          return (
            <Tr key={u.id}>
              <Td>{u.nom}</Td>
              <Td>{u.email}</Td>
              <Td>{u.contact}</Td>
              <Td>{u.role}</Td>
              <Td>
                <DelUser id={u.id} />
                <UpdateUtilisateur initialData={u} />
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
        <CreateUser />
        <Spacer />
        <DefaultSearch name="utilisateur" filter={filter} onChange={(value) => setFilter(value)} />
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
