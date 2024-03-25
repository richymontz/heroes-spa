import { authReducer } from "../../../src/auth/"
import { types } from "../../../src/auth/types"

describe('authReducer', () => {

  const initialState = {
    logged: false,
  }

  test('should returns initial state', () => {
    const newState = authReducer(initialState, {})
    expect(newState).toBe(initialState)
  })

  test('should call login and stablish user', () => {

    const action = {
      type: types.login,
      payload: {
        id: 123,
        name: 'Foo Bar'
      }
    }

    const newState = authReducer(initialState, action)
    expect(newState.user).toEqual(action.payload)
  })

  test('should call logout and remove user', () => {

    const action = {
      type: types.logout
    }

    const newState = authReducer(initialState, action)

    expect(newState.logged).toBeFalsy();
  })

})
