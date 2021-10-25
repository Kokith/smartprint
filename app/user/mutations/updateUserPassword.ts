import db from "db"

const updateUserPassword = async (input: { id: number; password: string }) => {
  await db.user.update({
    where: {
      id: input.id,
    },
    data: {
      mdp: input.password,
    },
  })
  return "ok"
}

export default updateUserPassword
