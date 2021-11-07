import db from "./index"
import faker from "faker"
import { Societe } from ".prisma/client"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

faker.locale = "fr"
const fakeNb = 25

async function societeSeed() {
  const societe = await db.societe.create({
    data: {
      gerant: "Jean De Dieu",
      adresse: "Antanimena",
      banque: "num banque",
      mobile: "num mobile",
      rcs: "num rcs",
      stat: "num stat",
      nif: "num nif",
    },
  })
  return societe
}

async function userSeed(args: { societe: Societe }) {
  await db.user.create({
    data: {
      nom: "Joel Olivier",
      email: "joel@email.com",
      contact: "+ 0325846985",
      role: "ADMIN",
      mdp: "joelmdp",
      societeId: args.societe.id,
    },
  })
  for (let i = 0; i < fakeNb; i++) {
    const nom = faker.name.findName()
    if (nom !== "Joel Olivier") {
      await db.user.create({
        data: {
          nom,
          email: `${nom.replace(/ +/g, "")}@email.com`,
          contact: faker.phone.phoneNumber(),
          role: "USER",
          mdp: faker.internet.password(),
          societeId: args.societe.id,
        },
      })
    }
  }
}

async function fournisseurSeed() {
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
}

async function chargeSeed(args: { societe: Societe }) {
  for (let i = 0; i < fakeNb; i++) {
    await db.charge.create({
      data: {
        designation: faker.commerce.productName(),
        description: "super charge",
        prix: Number(faker.commerce.price(10000)),
        societeId: args.societe.id,
      },
    })
  }
}

const seed = async () => {
  const societe = await societeSeed()

  await userSeed({ societe })

  await fournisseurSeed()

  await chargeSeed({ societe })
}

export default seed
