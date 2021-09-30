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

type InputKey = keyof DefaultFournisseurInput
const FormFournisseur: FC<{
  values: DefaultFournisseurInput
  errors: FormikErrors<DefaultFournisseurInput>
  touched: FormikTouched<DefaultFournisseurInput>
  onChange: (key: string) => (e: string | React.ChangeEvent<any>) => void
}> = ({ values, touched, errors, onChange }) => {
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
