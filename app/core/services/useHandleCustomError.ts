import { useToast } from "@chakra-ui/react"
import { ClientAlreadyExistError, InputError } from "../configs/errors"

export const useHandleCustomError = () => {
  const toast = useToast()
  return {
    toast,
    handleCustomError(err) {
      if (err instanceof InputError) {
        toast({
          title: "Des donnees du formulaire sont incorrectes",
          status: "error",
          isClosable: true,
        })
      } else if (err instanceof ClientAlreadyExistError) {
        toast({
          title: "Le client (nom) existe deja",
          status: "error",
          isClosable: true,
        })
      } else {
        throw err
      }
    },
  }
}
