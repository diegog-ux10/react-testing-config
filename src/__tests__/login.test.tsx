import { render, screen } from '@testing-library/react';
import { Login } from '../pages';
import userEvent from '@testing-library/user-event';

// 4.5 Jest Function
const navigateMock = jest.fn();
const useNavigateMock = () => navigateMock;
jest.mock('react-router', () => {
  return {
    useNavigate: useNavigateMock,
  };
});

// 4.2 Encabezado de la Prueba 👇
describe('Proceso de autenticación', () => {
  // 4.3 Usar It para separar las diferentes pruebas
  it('Debe llamar navigate con /', async () => {
    // ✅ Arrange
    //4.4 Renderizar el componente
    const { getByTestId } = render(<Login />);

    // 4.7 Usar getByTestId
    const emailInput = getByTestId('login_form_email_input');
    const passwordInput = getByTestId('login_form_password_input');
    const submitButton = getByTestId('login_form_submit_button');

    // ✅ Act
    // 5.2 Usar userEvent para actuar sobre el componente
    await userEvent.type(emailInput, 'email@example.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(submitButton);

    screen.debug(); // 4.6 Con esto podras ver el html del componente en consola
  });
});
