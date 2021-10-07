import { FournisseurType } from "db"
import * as yup from "yup"

// user

export const LoginSchema = yup.object({
  email: yup.string().email().required(),
  mdp: yup.string().required(),
})
export type LoginInput = yup.InferType<typeof LoginSchema>

// client

export const DefaultClientSchema = yup.object({
  nom: yup.string().required(),
  nif: yup.string().required(),
  stat: yup.string().required(),
  adresse: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
})
export type DefaultClientInput = yup.InferType<typeof DefaultClientSchema>

// fournisseur

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
