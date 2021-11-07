import { Ctx, paginate } from "blitz"
import db, { Prisma } from "db"

interface ChargesInput
  extends Pick<Prisma.UserFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const charges = async ({ where, orderBy, skip, take }: ChargesInput, ctx: Ctx) => {
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.charge.count({ where }),
    query: (paginateArgs) => db.charge.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
}

export default charges
