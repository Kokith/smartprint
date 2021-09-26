import { useMutation } from "blitz"
import createClient from "app/client/mutations/createClient"
import { useHandleCustomError } from "../useHandleCustomError"

export const useCreateClient = () => {
  const { handleCustomError } = useHandleCustomError()
  return useMutation(createClient, {
    onError(err) {
      handleCustomError(err)
    },
  })
}
