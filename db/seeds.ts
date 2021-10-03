import db from "./index"
import faker from "faker"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

faker.locale = "fr"
const fakeNb = 25

const seed = async () => {
  // fournisseur
  for (let i = 0; i < fakeNb; i++) {
    const nom = faker.name.findName()
    await db.fournisseur.create({
      data: {
        nom,
        nif: faker.finance.mask(),
        stat: faker.finance.mask(),
        adresse: faker.address.country(),
        email: `${nom}@email.com`,
        contact: faker.phone.phoneNumber(),
        type: "IMPORT",
      },
    })
  }

  // user
  await db.user.create({
    data: {
      nom: "Joel Olivier",
      email: "joel@email.com",
      contact: "+ 0325846985",
      admin: true,
      mdp: "joelmdp",
    },
  })
  for (let i = 0; i < fakeNb; i++) {
    const nom = faker.name.findName()
    if (nom !== "Joel Olivier") {
      await db.user.create({
        data: {
          nom,
          email: `${nom}@email.com`,
          contact: faker.phone.phoneNumber(),
          admin: false,
          mdp: faker.internet.password(),
        },
      })
    }
  }
}

export default seed
