import { Ctx } from "blitz"
import db, { User } from "db"

export default async function getCurrentUser(_ = null, ctx: Ctx) {
  ctx.session.$authorize()

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
  })

  return user as User
}
