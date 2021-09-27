import { addNumber } from "./fake"

test("test env ok", () => {
  expect(addNumber(2, 2)).toBe(4)
})
