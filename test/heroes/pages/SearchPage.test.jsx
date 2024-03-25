import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))


describe('<SearchPage/>', () => {
  test('should shows the page with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot();
  })

  test('should show batman and query input should have batman', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('batman')


    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('none')

  })

  test('should show error if any hero found', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=someone']}>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('');

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('someone')
  })

  test('should navigates to new page', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { name: input.name, value: 'batman' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockUseNavigate).toHaveBeenCalledWith('?q=batman');
  })
})
