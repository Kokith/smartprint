import superjson from "superjson"

export class InputError extends Error {
  name = "InputError"
  constructor() {
    super()
  }
}
superjson.registerClass(InputError)

export class ClientAlreadyExistError extends Error {
  name = "ClientAlreadyExistError"
  info: any
  constructor(args?: { info: any }) {
    super()
    this.info = args?.info
  }
}
superjson.registerClass(ClientAlreadyExistError)
