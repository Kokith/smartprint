import { useToast } from "@chakra-ui/react"
import {
  ClientAlreadyExistError,
  FournisseurAlreadyExistError,
  InputError,
} from "../configs/errors"

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
          title: "Le client existe deja",
          status: "error",
          isClosable: true,
        })
      } else if (err instanceof FournisseurAlreadyExistError) {
        toast({
          title: "Le fournisseur existe deja",
          status: "error",
          isClosable: true,
        })
      } else {
        throw err
      }
    },
  }
}
