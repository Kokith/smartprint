import { useMutation } from "blitz"
import createClient from "app/client/mutations/createClient"

export const useCreateClient = () => {
  return useMutation(createClient, {
    onError(err) {
      console.log(err)
    },
  })
}
