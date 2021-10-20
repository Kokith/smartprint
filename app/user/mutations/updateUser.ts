import { InputError, UserAlreadyExistError } from "app/core/configs/errors"
import { UpdateUserInput, UpdateUserSchema } from "app/user/validation"
import db, { User } from "db"

const updateUser = async (input: { id: number; data: UpdateUserInput }) => {
  let response: User

  try {
    await UpdateUserSchema.validate(input.data)
  } catch (err) {
    throw new InputError()
  }

  try {
    response = await db.user.update({
      where: {
        id: input.id,
      },
      data: {
        nom: input.data.nom,
        email: input.data.email,
        contact: input.data.contact,
        role: input.data.role,
      },
    })
  } catch (err) {
    throw new UserAlreadyExistError()
  }

  return response
}

export default updateUser
