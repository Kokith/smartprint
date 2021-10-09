import db, { Societe } from "db"
import { SocieteNotFoundError } from "app/core/configs/errors"

export const getSociete = async (): Promise<Societe> => {
  const societes = await db.societe.findMany()
  if (societes.length !== 1) throw new SocieteNotFoundError()
  return societes[0] as Societe
}
