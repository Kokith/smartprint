import { useToast } from "@chakra-ui/react"
import { CustomErrorType, InputError } from "../configs/errors"

export const useHandleCustomError = () => {
  const toast = useToast()
  return {
    toast,
    handleCustomError(err) {
      const name = err.name as CustomErrorType
      switch (name) {
        case "InputError":
          toast({
            title: "Formulaire entree erreur",
            status: "error",
            isClosable: true,
          })
          break
      }
    },
  }
}
