import { FournisseurType } from "db"
import * as yup from "yup"

export const DefaultFournisseurSchema = yup.object({
  nom: yup.string().required(),
  nif: yup.string().required(),
  stat: yup.string().required(),
  adresse: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  type: yup.mixed<FournisseurType>().oneOf(Object.values(FournisseurType)).required(),
})
export type DefaultFournisseurInput = yup.InferType<typeof DefaultFournisseurSchema>
