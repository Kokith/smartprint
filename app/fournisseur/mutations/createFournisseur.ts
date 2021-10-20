import db, { Fournisseur } from "db"
import { DefaultFournisseurInput, DefaultFournisseurSchema } from "app/fournisseur/validation"
import { FournisseurAlreadyExistError, InputError } from "app/core/configs/errors"

const createFournisseur = async (input: DefaultFournisseurInput) => {
  let result: Fournisseur
  const isInputValid = await DefaultFournisseurSchema.isValid(input)
  if (!isInputValid) throw new InputError()

  try {
    result = await db.fournisseur.create({
      data: {
        nom: input.nom,
        nif: input.nif,
        stat: input.stat,
        adresse: input.adresse,
        email: input.email,
        contact: input.contact,
        type: input.type,
      },
    })
  } catch (err) {
    throw new FournisseurAlreadyExistError({ info: err })
  }

  return result
}

export default createFournisseur
