import { getSociete } from "../societe.service"

const societe = async () => {
  const societe = await getSociete()
  return societe
}

export default societe
