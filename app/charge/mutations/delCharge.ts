import db, { Charge } from "db"

const delCharge = async (id: number): Promise<Charge> => {
  const deletedCharge = await db.charge.delete({ where: { id } })
  return deletedCharge
}

export default delCharge
