import db, { Client } from "db"
import { DefaultClientInput, DefaultClientSchema } from "app/client/validation"
import { ClientAlreadyExistError, InputError } from "app/core/configs/errors"

const updateClient = async (input: { id: number; data: DefaultClientInput }) => {
  let result: Client

  const isInputValid = await DefaultClientSchema.isValid(input.data)
  if (!isInputValid) throw new InputError()

  try {
    result = await db.client.update({
      where: { id: input.id },
      data: { ...input.data },
    })
  } catch (err) {
    throw new ClientAlreadyExistError({ info: err })
  }

  return result
}

export default updateClient
