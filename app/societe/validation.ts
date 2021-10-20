import * as yup from "yup"

export const UpdateSocieteSchema = yup.object({
  gerant: yup.string().required(),
  adresse: yup.string().required(),
  banque: yup.string().required(),
  mobile: yup.string().required(),
  rcs: yup.string().required(),
  stat: yup.string().required(),
  nif: yup.string().required(),
})
export type UpdateSocieteInput = yup.InferType<typeof UpdateSocieteSchema>
