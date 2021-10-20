import db, { Client } from "db"
import { Ctx } from "blitz"
import { DefaultClientInput, DefaultClientSchema } from "app/client/validation"
import { ClientAlreadyExistError, InputError } from "app/core/configs/errors"

export default async function createClient(input: DefaultClientInput, ctx: Ctx): Promise<Client> {
  let result: Client

  const isInputValid = await DefaultClientSchema.isValid(input)
  if (!isInputValid) throw new InputError()

  try {
    result = await db.client.create({
      data: {
        nom: input.nom,
        nif: input.nif,
        stat: input.stat,
        adresse: input.adresse,
        email: input.email,
        contact: input.contact,
      },
    })
  } catch (err) {
    throw new ClientAlreadyExistError({ info: err })
  }

  return result
}
