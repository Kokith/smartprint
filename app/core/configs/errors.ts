import SuperJson from "superjson"

export class InputError extends Error {
  name = "InputError"
  constructor() {
    super()
  }
}

export const registerAllErrors = () => {
  SuperJson.registerClass(InputError, { identifier: "InputError" })
}
