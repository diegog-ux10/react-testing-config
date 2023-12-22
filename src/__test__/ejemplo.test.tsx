import { render } from '@testing-library/react'

test('loads and displays greeting', () => {
  render(<div><h1>Hola, Soy una prueba</h1></div>)
})