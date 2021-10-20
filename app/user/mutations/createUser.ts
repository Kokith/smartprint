import { InputError, UserAlreadyExistError } from "app/core/configs/errors"
import { CreateUserInput, CreateUserSchema } from "app/user/validation"
import { getSociete } from "app/societe/societe.service"
import db, { User } from "db"

const createUser = async (input: CreateUserInput) => {
  let response: User

  try {
    await CreateUserSchema.validate(input)
  } catch (err) {
    throw new InputError()
  }

  const societe = await getSociete()
  try {
    response = await db.user.create({
      data: {
        nom: input.nom,
        email: input.email,
        contact: input.contact,
        role: input.role,
        mdp: input.mdp,
        societeId: societe.id,
      },
    })
  } catch (err) {
    throw new UserAlreadyExistError()
  }

  return response
}

export default createUser
