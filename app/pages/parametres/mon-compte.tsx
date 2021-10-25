import React, { FC, Fragment, Suspense } from "react"
import { parametresNavbar } from "app/core/components/layout/Navbar"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react"
import { UpdateUserInput } from "app/user/validation"
import { User } from "db"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/core"
import { useFormik } from "formik"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import AppLayout from "app/core/components/layout/AppLayout"
import updateUser from "app/user/mutations/updateUser"
import Title from "app/core/components/common/Title"
import FormUpdateUser from "app/core/components/utilisateurs/FormUpdateUtilisateur"
import getCurrentUser from "app/user/queries/getCurrentUser"
import updateUserPassword from "app/user/mutations/updateUserPassword"

const UpdatePassword: FC<{ id: number }> = ({ id }) => {
  const [mutate, { isLoading }] = useMutation(updateUserPassword)
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.password) errors.password = "password is requiered"
      else if (!values.confirmPassword) errors.confirmPassword = "confirm password is requiered"
      else if (values.password !== values.confirmPassword)
        errors.confirmPassword = "password must be equal to confirm password"

      return errors
    },
    onSubmit: (values) => {
      mutate(
        {
          id: id,
          password: values.password,
        },
        {
          onSuccess() {
            toast({
              title: "Votre mot de passe ont ete modifier avec succes",
              status: "success",
              isClosable: true,
            })
          },
        }
      )
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Title>Modifier mot de passe</Title>
      <Fragment>
        <FormControl isInvalid={!!formik.errors.password && !!formik.touched.password}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            placeholder="Mot de passe"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
          />
          {!!formik.errors.password && !!formik.touched.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          mt={4}
          isInvalid={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword}
        >
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <Input
            placeholder="Confirmer le mot de passe"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
          />
          {!!formik.errors.confirmPassword && !!formik.touched.confirmPassword && (
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          )}
        </FormControl>
      </Fragment>
      <Button isLoading={isLoading} colorScheme="blue" type="submit" disabled={false} mt={4}>
        Enregistrer
      </Button>
    </form>
  )
}

const UpdateInfo: FC<{
  initialData: User
}> = ({ initialData }) => {
  const [mutate, { isLoading }] = useMutation(updateUser)
  const { handleCustomError, toast } = useHandleCustomError()

  const initialValues: UpdateUserInput = {
    nom: initialData.nom,
    email: initialData.email,
    contact: initialData.contact,
    role: initialData.role,
  }
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await mutate({
          id: initialData.id,
          data: values,
        })
        invalidateQuery(getCurrentUser)
        toast({
          title: "Vos informations ont ete modifier avec succes",
          status: "success",
          isClosable: true,
        })
      } catch (err) {
        handleCustomError(err)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Title>Les informations de mon compte</Title>
      <FormUpdateUser
        values={formik.values}
        errors={formik.errors}
        touched={formik.touched}
        onChange={(key) => formik.handleChange(key)}
      />
      <Button colorScheme="blue" type="submit" disabled={isLoading} mt={4}>
        Enregistrer
      </Button>
    </form>
  )
}

const MonCompteContent: FC = () => {
  const [me] = useQuery(getCurrentUser, undefined)
  return (
    <Box padding={5}>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem colSpan={1}>
          <Box marginBottom="5">
            <Suspense fallback={<div>Chargement des informations...</div>}>
              <VStack alignItems="flex-start">
                <UpdateInfo initialData={me} />
                <UpdatePassword id={me.id} />
              </VStack>
            </Suspense>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          {/* <UploadUtilisateurPhoto url={data.verifyToken.photo} /> */}
        </GridItem>
      </Grid>
    </Box>
  )
}

const MonComptePage: FC = () => {
  return (
    <AppLayout navbar={parametresNavbar()}>
      <Suspense fallback={<div>Chargement des informations de compte...</div>}>
        <MonCompteContent />
      </Suspense>
    </AppLayout>
  )
}

export default MonComptePage
