import { useToast } from "@chakra-ui/react"
import {
  ClientAlreadyExistError,
  FournisseurAlreadyExistError,
  IncorrectCredentialError,
  InputError,
  UserAlreadyExistError,
  UserNotFoundError,
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
      } else if (err instanceof UserNotFoundError) {
        toast({
          title: "L'utilisateur n'existe pas",
          status: "error",
          isClosable: true,
        })
      } else if (err instanceof IncorrectCredentialError) {
        toast({
          title: "Le mot de passe est incorrecte",
          status: "error",
          isClosable: true,
        })
      } else if (err instanceof UserAlreadyExistError) {
        toast({
          title: "L'utilisateur existe deja",
          status: "error",
          isClosable: true,
        })
      } else {
        throw err
      }
    },
  }
}
