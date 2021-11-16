import React, { FC, Fragment, Suspense, useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import { financeNavbar } from "app/core/components/layout/Navbar"
import { BlitzPage, invalidateQuery, useMutation, useQuery } from "@blitzjs/core"
import { TAKE } from "app/core/configs"
import { ICON_SIZE } from "app/core/styles/theme"
import { useFormik } from "formik"
import { MdAdd, MdEdit } from "react-icons/md"
import { DefaultChargeInput, DefaultChargeSchema } from "app/charge/validation"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import { Charge } from "db"
import AppLayout from "app/core/components/layout/AppLayout"
import charges from "app/charge/queries/charges"
import Pagination from "app/core/components/common/Pagination"
import DatePicker from "app/core/components/common/DatePicker"
import createCharge from "app/charge/mutations/createCharge"
import delCharge from "app/charge/mutations/delCharge"
import DelBtn from "app/core/components/common/DelBtn"
import updateCharge from "app/charge/mutations/updateCharge"

const FormCharge: FC<{
  values: DefaultChargeInput
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, onChange }) => {
  return (
    <Fragment>
      <FormControl>
        <FormLabel>Designation</FormLabel>
        <Input
          required
          placeholder="Designation"
          value={values.designation}
          onChange={onChange("designation")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="Description"
          value={values.description}
          onChange={onChange("description")}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Prix</FormLabel>
        <Input
          required
          placeholder="Prix"
          value={values.prix}
          type="numeric"
          onChange={onChange("prix")}
        />
      </FormControl>

      <Box mt="4">
        <DatePicker
          value={new Date(values.date)}
          onChange={(value) => {
            onChange("date")(value.toISOString())
          }}
        />
      </Box>
    </Fragment>
  )
}

const AddCharge: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleCustomError, toast } = useHandleCustomError()
  const [mutate] = useMutation(createCharge)

  const initialValues: DefaultChargeInput = {
    designation: "",
    description: "",
    prix: 0,
    date: new Date().toISOString(),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: DefaultChargeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutate({
          ...values,
          prix: Number(values.prix),
        })
        toast({
          title: "La charge a ete creer avec succes",
          status: "success",
          isClosable: true,
        })
        invalidateQuery(charges)
        resetForm()
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
              <FormCharge values={formik.values} onChange={(key) => formik.handleChange(key)} />
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

const UpdateCharge: FC<{
  initialData: Charge
}> = ({ initialData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleCustomError, toast } = useHandleCustomError()
  const [mutate] = useMutation(updateCharge)

  const initialValues: DefaultChargeInput = {
    designation: initialData.designation,
    description: initialData.description,
    prix: initialData.prix,
    date: initialData.date.toISOString(),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: DefaultChargeSchema,
    onSubmit: async (values) => {
      try {
        await mutate({
          id: initialData.id,
          data: {
            designation: values.designation,
            description: values.description,
            prix: Number(values.prix),
            date: values.date,
          },
        })
        toast({
          title: "La charge a ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
        invalidateQuery(charges)
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
            <ModalHeader>Modifier une charge</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormCharge values={formik.values} onChange={(key) => formik.handleChange(key)} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" disabled={false}>
                Enregistrer
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Fragment>
  )
}

const DelCharge: FC<{ id: number }> = ({ id }) => {
  const toast = useToast()
  const [mutate, { isLoading }] = useMutation(delCharge)

  const handleSubmit = async (): Promise<void> => {
    await mutate(id)
    invalidateQuery(charges)
    toast({
      title: "La charge a ete supprimer avec succes",
      status: "success",
      isClosable: true,
    })
  }

  return <DelBtn label="la charge" isLoading={isLoading} onSubmit={handleSubmit} />
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
                <Td>{c.date.toISOString()}</Td>
                <Td>
                  <DelCharge id={c.id} />
                  <UpdateCharge initialData={c} />
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
