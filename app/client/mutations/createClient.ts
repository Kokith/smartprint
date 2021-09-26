import db, { Client } from "db"
import { Ctx } from "blitz"
import { CreateClientInput, CreateClientSchema } from "app/core/libs/yup"
import { InputError } from "app/core/configs/errors"

export default async function createClient(input: CreateClientInput, ctx: Ctx): Promise<Client> {
  const isInputValid = await CreateClientSchema.isValid(input)
  if (!isInputValid) throw new InputError()
  const result = await db.client.create({
    data: {
      nom: input.nom,
      nif: input.nif,
      stat: input.stat,
      adresse: input.adresse,
      email: input.email,
      contact: input.contact,
    },
  })
  return result
}
