import db from "db"

const delFournisseur = async (input: { id: number }) => {
  const result = await db.fournisseur.delete({ where: { id: input.id } })
  return result
}

export default delFournisseur
