import db from "db"
import { InputError } from "app/core/configs/errors"
import { getSociete } from "../societe.service"
import { UpdateSocieteInput, UpdateSocieteSchema } from "../validation"

const updateSociete = async (input: UpdateSocieteInput) => {
  try {
    await UpdateSocieteSchema.validate(input)
  } catch (err) {
    throw new InputError()
  }

  const societe = await getSociete()
  const updatedSociete = await db.societe.update({
    where: {
      id: societe.id,
    },
    data: {
      gerant: input.gerant,
      adresse: input.adresse,
      banque: input.banque,
      mobile: input.mobile,
      rcs: input.rcs,
      stat: input.stat,
      nif: input.nif,
    },
  })

  return updatedSociete
}

export default updateSociete
