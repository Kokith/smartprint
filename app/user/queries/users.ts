import { Ctx, paginate } from "blitz"
import db, { Prisma } from "db"

interface UsersInput extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const users = async ({ where, orderBy, skip, take }: UsersInput, ctx: Ctx) => {
  const _where = {
    ...where,
    NOT: {
      id: ctx.session.userId || undefined,
    },
  }
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () =>
      db.user.count({
        where: _where,
      }),
    query: (paginateArgs) => db.user.findMany({ ...paginateArgs, where: _where, orderBy }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
}

export default users
