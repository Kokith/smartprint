import { paginate } from "blitz"
import db, { Prisma } from "db"

interface UsersInput extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const users = async ({ where, orderBy, skip, take }: UsersInput) => {
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.user.count({ where }),
    query: (paginateArgs) => db.user.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
}

export default users
