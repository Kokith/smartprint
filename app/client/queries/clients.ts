import { paginate } from "blitz"
import db, { Prisma } from "db"

interface ClientsInput
  extends Pick<Prisma.ClientFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const clients = async ({ where, orderBy, skip, take }: ClientsInput) => {
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.client.count({ where }),
    query: (paginateArgs) => db.client.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
}

export default clients
