import React, { FC, Fragment } from "react"
import { fournisseurNavbar } from "app/core/components/layout/Navbar"
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
  Select,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react"
import { DefaultFournisseurInput, DefaultFournisseurSchema } from "app/core/libs/yup"
import { FournisseurType } from "db"
import { FormikErrors, FormikTouched, useFormik } from "formik"
import { MdAdd } from "react-icons/md"
import { ICON_SIZE } from "app/core/styles/theme"
import AppLayout from "app/core/components/layout/AppLayout"

const FormFournisseur: FC<{
  values: DefaultFournisseurInput
  errors: FormikErrors<DefaultFournisseurInput>
  touched: FormikTouched<DefaultFournisseurInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, touched, errors, onChange }) => {
  const CustomInput: FC<{ inputKey: keyof DefaultFournisseurInput; i: number }> = ({
    inputKey,
    i,
  }) => {
    const name = inputKey.charAt(0).toUpperCase() + inputKey.slice(1)
    const isError = !!errors[inputKey] && !!touched[inputKey]
    return (
      <FormControl
        key={inputKey}
        {...{
          mt: i === 0 ? undefined : 4,
        }}
      >
        <FormLabel>{name}</FormLabel>
        <Input placeholder={name} value={values[inputKey]} onChange={onChange(inputKey)} />
        {isError && <FormErrorMessage>{errors[inputKey]}</FormErrorMessage>}
      </FormControl>
    )
  }

  return (
    <Fragment>
      {Object.keys(values).map((key: keyof DefaultFournisseurInput, i) => (
        <CustomInput key={key} inputKey={key} i={i} />
      ))}
      <FormControl mt={4}>
        <FormLabel>Type</FormLabel>
        <Select placeholder="Type" value={values.type} onChange={onChange("type")} required>
          <option value={FournisseurType.DIVERS}>{FournisseurType.DIVERS}</option>
          <option value={FournisseurType.IMPORT}>{FournisseurType.IMPORT}</option>
          <option value={FournisseurType.LOCAL}>{FournisseurType.LOCAL}</option>
        </Select>
      </FormControl>
    </Fragment>
  )
}

const CreateFournisseur: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    onSubmit: (values, { resetForm }) => {
      //
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
              <Button colorScheme="blue" mr={3} type="submit" isLoading={false}>
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

const FournisseursPage: FC = () => {
  return (
    <AppLayout navbar={fournisseurNavbar()}>
      <Flex padding="1.5">
        <CreateFournisseur />
        <Spacer />
        {/* <SearchFournisseur /> */}
      </Flex>

      <Flex padding="1.5">{/* <ListFournisseur /> */}</Flex>
    </AppLayout>
  )
}

export default FournisseursPage
