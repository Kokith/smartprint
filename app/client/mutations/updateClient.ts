import db from "db"
import { DefaultClientInput } from "app/core/libs/yup"

const updateClient = async (input: { id: number; data: DefaultClientInput }) => {
  const result = await db.client.update({
    where: { id: input.id },
    data: { ...input.data },
  })
  return result
}

export default updateClient
