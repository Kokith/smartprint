import { useToast } from "@chakra-ui/react"
import { CustomErrorType } from "../configs/errors"

export const useHandleCustomError = () => {
  const toast = useToast()
  return {
    toast,
    handleCustomError(err) {
      const name = err.name as CustomErrorType
      switch (name) {
        case "InputError":
          toast({
            title: "Des donnees du formulaire sont incorrectes",
            status: "error",
            isClosable: true,
          })
          break
      }
    },
  }
}
