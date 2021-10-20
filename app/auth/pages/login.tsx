import React, { FC, useState } from "react"
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react"
import { BiHide, BiShow } from "react-icons/bi"
import { useMutation, Router, Routes, BlitzPage } from "blitz"
import { useFormik } from "formik"
import { LoginInput, LoginSchema } from "app/user/validation"
import { useHandleCustomError } from "app/core/services/useHandleCustomError"
import login from "../../auth/mutations/login"

type LoginPageProps = {
  onSuccess?: () => void
}

const LoginPage: BlitzPage<LoginPageProps> = (props) => {
  const [show, setShow] = useState(false)
  const [mutate, { isLoading }] = useMutation(login)
  const { handleCustomError, toast } = useHandleCustomError()

  const initialValues: LoginInput = {
    email: "",
    mdp: "",
  }
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    async onSubmit(values, { resetForm }) {
      try {
        const { nom } = await mutate(values)
        props.onSuccess?.()
        toast({
          title: `Bienvenue ${nom.toUpperCase()}`,
          status: "success",
          isClosable: true,
        })
        Router.replace(Routes.DashboardPage().pathname)
        resetForm()
      } catch (err) {
        handleCustomError(err)
      }
    },
  })

  const handleToogleShowPassword = (): void => setShow(!show)

  const isFieldInvalid = (key: keyof LoginInput) => !!formik.touched[key] && !!formik.errors[key]

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box w="full" h="100vh" display="flex">
        <Flex w="50%" h="full" justify="center" align="center">
          <VStack w="50%" spacing={19}>
            <Text fontSize="4xl" color="primary" alignSelf="flex-start">
              Se connecter
            </Text>

            <FormControl isInvalid={isFieldInvalid("email")}>
              <FormLabel>Email</FormLabel>
              <Input
                value={formik.values.email}
                placeholder="Email"
                onChange={formik.handleChange("email")}
              />
              {isFieldInvalid("email") && (
                <FormErrorMessage>{formik.errors["email"]}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={isFieldInvalid("mdp")}>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  value={formik.values.mdp}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Mot de passe"
                  onChange={formik.handleChange("mdp")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleToogleShowPassword}>
                    {show ? <BiHide /> : <BiShow />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isFieldInvalid("mdp") && <FormErrorMessage>{formik.errors.mdp}</FormErrorMessage>}
            </FormControl>

            <Button type="submit" colorScheme="blue" w="full" isLoading={isLoading}>
              Se connecter
            </Button>

            <Text color="primary">Bienvenue sur smartprint app !</Text>
          </VStack>
        </Flex>
        <Flex w="50%" h="full" backgroundColor="primary"></Flex>
      </Box>
    </form>
  )
}

LoginPage.redirectAuthenticatedTo = Routes.DashboardPage()

export default LoginPage
