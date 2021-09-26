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
} from "@chakra-ui/react"
import { BiHide, BiShow } from "react-icons/bi"

const LoginPage: FC = () => {
  const [show, setShow] = useState(false)

  const handleClick = (): void => setShow(!show)

  return (
    <Box w="full" h="100vh" display="flex">
      <Flex w="50%" h="full" justify="center" align="center">
        <VStack as="form" w="50%" spacing={19}>
          <Text fontSize="4xl" color="primary" alignSelf="flex-start">
            Se connecter
          </Text>

          <FormControl>
            <FormLabel>Nom d&apos;utilisateur</FormLabel>
            <Input
              required
              placeholder="Nom d'utilisateur"
              onChange={() => {
                //
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Nom d&apos;utilisateur</FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Mot de passe"
                onChange={() => {
                  //
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <BiHide /> : <BiShow />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            Se connecter
          </Button>

          <Text color="primary">Bienvenue sur smartprint app !</Text>
        </VStack>
      </Flex>
      <Flex w="50%" h="full" backgroundColor="primary"></Flex>
    </Box>
  )
}

export default LoginPage
