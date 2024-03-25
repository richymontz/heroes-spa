import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('<Navbar />', () => {
  const contextValue = {
    logged: true,
    logout: jest.fn(),
    user: {
      id: 123,
      name: 'Ricardo Montes'
    }
  }

  beforeEach(() => jest.clearAllMocks());

  test('should show user name', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 123,
        name: 'Ricardo Montes'
      }
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Ricardo Montes')).toBeTruthy()
  });

  test('should call logout and navigate', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const logOutButton = screen.getByRole('button', { name: 'Logout' })

    fireEvent.click(logOutButton)
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { "replace": true });
  })

});
