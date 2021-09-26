export type CustomErrorType = "InputError"

export class InputError extends Error {
  name: CustomErrorType = "InputError"
  constructor() {
    super()
  }
}
