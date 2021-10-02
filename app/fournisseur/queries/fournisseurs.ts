import { paginate } from "blitz"
import db, { Prisma } from "db"

interface FournisseursInput
  extends Pick<Prisma.FournisseurFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const fournisseurs = async ({ where, orderBy, skip, take }: FournisseursInput) => {
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.fournisseur.count({ where }),
    query: (paginateArgs) => db.fournisseur.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    items,
    hasMore,
    nextPage,
    count,
  }
}

export default fournisseurs
