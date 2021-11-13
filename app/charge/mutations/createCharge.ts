import { InputError } from "app/core/configs/errors"
import { DefaultChargeInput, DefaultChargeSchema } from "app/charge/validation"
import { getSociete } from "app/societe/societe.service"
import db, { Charge } from "db"

const createCharge = async (input: DefaultChargeInput): Promise<Charge> => {
  const isInputValid = await DefaultChargeSchema.isValid(input)
  if (!isInputValid) throw new InputError()

  const result = await db.charge.create({
    data: {
      designation: input.designation,
      description: input.description,
      prix: input.prix,
      date: input.date,
      societeId: (await getSociete()).id,
    },
  })

  return result
}

export default createCharge
