import { FournisseurAlreadyExistError } from "app/core/configs/errors"
import { DefaultFournisseurInput } from "app/core/libs/yup"
import db, { Fournisseur } from "db"

const updateFournisseur = async (input: { id: number; data: DefaultFournisseurInput }) => {
  let result: Fournisseur
  try {
    result = await db.fournisseur.update({
      where: {
        id: input.id,
      },
      data: {
        nom: input.data.nom,
        nif: input.data.nif,
        stat: input.data.stat,
        adresse: input.data.adresse,
        email: input.data.email,
        contact: input.data.contact,
        type: input.data.type,
      },
    })
  } catch (err) {
    throw new FournisseurAlreadyExistError({ info: err })
  }

  return result
}

export default updateFournisseur
