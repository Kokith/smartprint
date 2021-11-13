import * as yup from "yup"

export const DefaultChargeSchema = yup.object({
  designation: yup.string().required(),
  description: yup.string().required(),
  prix: yup.number().required(),
  date: yup.string().required(),
})
export type DefaultChargeInput = yup.InferType<typeof DefaultChargeSchema>
