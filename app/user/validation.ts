import { UserRole } from "db"
import * as yup from "yup"

export const LoginSchema = yup.object({
  email: yup.string().email().required(),
  mdp: yup.string().required(),
})
export type LoginInput = yup.InferType<typeof LoginSchema>

export const CreateUserSchema = yup.object({
  nom: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
  mdp: yup.string().required(),
})
export type CreateUserInput = yup.InferType<typeof CreateUserSchema>

export const UpdateUserSchema = yup.object({
  nom: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
})
export type UpdateUserInput = yup.InferType<typeof UpdateUserSchema>
