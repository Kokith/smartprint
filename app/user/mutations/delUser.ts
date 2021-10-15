import db from "db"

const delUser = async ({ id }: { id: number }) => {
  const deletedUser = await db.user.delete({ where: { id } })
  return deletedUser
}

export default delUser
