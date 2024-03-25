import { types } from "../../../src/auth"

describe('types', () => {
  test('should have the types structure', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout'
    })
  })

})
