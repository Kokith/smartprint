import db, { User } from "db"
import { IncorrectCredentialError, InputError, UserNotFoundError } from "app/core/configs/errors"
import { LoginInput, LoginSchema } from "app/core/libs/yup"
import { Ctx } from "blitz"

export default async function login(input: LoginInput, ctx: Ctx): Promise<User> {
  try {
    await LoginSchema.validate(input)
  } catch (err) {
    throw new InputError()
  }

  const user = await db.user.findUnique({ where: { email: input.email } })
  if (!user) throw new UserNotFoundError()
  if (user.mdp !== input.mdp) throw new IncorrectCredentialError()

  await ctx.session.$create({ userId: user.id, role: user.role })

  return user
}
