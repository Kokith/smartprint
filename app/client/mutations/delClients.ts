import db from "db"

const delClient = async ({ id }: { id: number }) => {
  const deletedClient = await db.client.delete({ where: { id } })
  return deletedClient
}

export default delClient
