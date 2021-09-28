import * as yup from "yup"

// client

export const CreateClientSchema = yup.object({
  nom: yup.string().required(),
  nif: yup.string().required(),
  stat: yup.string().required(),
  adresse: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
})
export type CreateClientInput = yup.InferType<typeof CreateClientSchema>
