import db, { Charge } from "db"
import { InputError } from "app/core/configs/errors"
import { DefaultChargeInput, DefaultChargeSchema } from "../validation"

interface UpdateChargeInput {
  id: number
  data: DefaultChargeInput
}

const updateCharge = async (input: UpdateChargeInput): Promise<Charge> => {
  const isInputValid = await DefaultChargeSchema.isValid(input.data)
  if (!isInputValid) throw new InputError()

  const updatedCharge = await db.charge.update({
    where: {
      id: input.id,
    },
    data: {
      designation: input.data.designation,
      description: input.data.description,
      prix: input.data.prix,
      date: input.data.date,
    },
  })

  return updatedCharge
}

export default updateCharge
