import superjson from "superjson"

export class InputError extends Error {
  name = "InputError"
  constructor() {
    super()
  }
}
superjson.registerClass(InputError)

// user

export class UserNotFoundError extends Error {
  name = "UserNotFoundError"
  constructor() {
    super()
  }
}
superjson.registerClass(UserNotFoundError)

export class IncorrectCredentialError extends Error {
  name = "IncorrectCredentialError"
  constructor() {
    super()
  }
}
superjson.registerClass(IncorrectCredentialError)

// client

export class ClientAlreadyExistError extends Error {
  name = "ClientAlreadyExistError"
  info: any
  constructor(args?: { info: any }) {
    super()
    this.info = args?.info
  }
}
superjson.registerClass(ClientAlreadyExistError)

// fournisseur

export class FournisseurAlreadyExistError extends Error {
  name = "FournisseurAlreadyExistError"
  info: any
  constructor(args: { info: any }) {
    super()
    this.info = args.info
  }
}
