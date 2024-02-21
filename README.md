# Configurar React Testing con Babel

## Paso 01 - Instalar y Configurar Jest

### 1.1 Instalar Jest

Para empezar a configurar nuestro entorno de pruebas, necesitamos instalar Jest. Aprovecharemos para instalar algunas dependencias que serán necesarias (@testing-library/react y jest-environment-jsdom). Ejecuta el siguiente comando:

```
npm install --save-dev jest @testing-library/react jest-environment-jsdom
```

#### ⚠ ¿Por qué necesitamos instalar estas dependencias?

- Jest: es un marco de pruebas para JavaScript.
- React Testing Library: contiene muchas utilidades para desarrollar nuestras pruebas con componentes de React.
- Jest environment jsdom: jsdom es una implementación pura de JavaScript del DOM y las API del navegador que se ejecuta en Node.

> #### ❗ Nota importante ❗
>
> Utilizamos --save-dev para especificar que las dependencias están destinadas a ser utilizadas en un entorno de desarrollo. Esto significa que cuando la aplicación se despliegue en producción, no se tendrán en cuenta dichas dependencias.

### 1.2 Configurar Jest

La manera de correr nuestras pruebas es ejecutando un comando en la terminal; por ello, debemos agregar un nuevo script en nuestro archivo **package.json**.

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Ahora, cuando ejecutemos en nuestra terminal **npm test**, Jest buscará y examinará nuestras pruebas.

### 1.3 Configurar simulador del navegador

Por último, vamos a agregar una configuración extra de Jest en nuestro package.json.

```json
{
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

👆 Esta configuración le indica a Jest que utilice **jsdom** como simulador de navegador para nuestras pruebas.

### ✅ Checkpoint - Paso 01

Para comprobar que hemos instalado y configurado correctamente Jest, ejecutemos el siguiente comando:

```
npm test
```

Nuestra terminal debería mostrarnos un mensaje similar a este:

```
> react-testing-config@0.0.0 test
> jest

No tests found, exiting with code 1
Run with `--passWithNoTests` to exit with code 0
In C:\Users\dgl_1\Desktop\repo\react-testing-config
  9 files checked.
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches
  testPathIgnorePatterns: \\node_modules\\ - 9 matches
  testRegex:  - 0 matches
Pattern:  - 0 matches
```

🆗 Como podemos ver, Jest está funcionando correctamente y nos indica que no encontró ninguna prueba, ya que aún no la hemos creado.

## Paso 02 - Instalar y Configurar Babel

### 2.1 Crear archivo de pruebas

Para comenzar este paso, vamos a crear una prueba de ejemplo. Crea una carpeta llamada **tests** dentro del directorio **src**.

Ahora, crea un archivo de ejemplo para una prueba dentro de la carpeta **tests**.

![ss-carpeta-tests](https://github.com/diegog-ux10/react-testing-config/assets/86785486/5b72b432-51aa-4182-8fde-83ef676727bd)

```tsx
/* ejemplo.test.tsx */

import { render } from '@testing-library/react';

test('loads and displays greeting', () => {
  render(
    <div>
      <h1>Hola, Soy una prueba</h1>
    </div>
  );
});
```

### 2.2 Correr pruebas y analizar error

Corramos las pruebas ejecutando en la terminal **npm test**, y aparecerá un error como este:

```
  Details:

    SyntaxError: C:\Users\dgl_1\Desktop\repo\react-testing-config\src\__tests__\ejemplo.test.tsx: Support for the experimental syntax 'jsx' isn't currently enabled (4:10):
```

❌ Este error aparece porque Jest solo puede procesar código de JavaScript. Necesitamos algo que nos permita convertir JSX a JavaScript, y ahí es donde entra Babel.

### 2.3 Instalar dependecias de Babel

Babel es una herramienta que nos permite convertir código JavaScript en una versión compatible con todos los navegadores. Debemos instalar las dependencias necesarias para utilizar Babel en un proyecto, teniendo en cuenta que está creado con Vite, React y TypeScript. Ejecuta el siguiente comando:

```
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react
```

#### ⚠ ¿Por qué necesitamos instalar estas dependencias?

- Babel core: es necesario para que Babel funcione correctamente.
- Babel Jest: permite utilizar Babel junto con Jest.
- Babel preset env: convierte la sintaxis de las características en las últimas versiones de JavaScript a versiones más antiguas que son actualmente soportadas por los navegadores.
- Babel preset TypeScript: es necesario si estamos usando TypeScript en nuestro proyecto.
- Babel preset React: añade soporte para JSX.

#### Así debe verse nuestro archivo package.json luego de la instalación

![paso-02-devdependencies](https://github.com/diegog-ux10/react-testing-config/assets/86785486/ba6f2124-474d-4daf-acd8-7b789a410cb2)

### 2.4 Crear archivo de configuración de Babel

Para utilizar Babel, debemos crear un archivo de configuración en la raíz de nuestro proyecto y agregarle todas las preconfiguraciones necesarias.

```cjs
/*babel.config.cjs*/

module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
```

> #### ❗ Nota importante ❗
>
> Como Jest funciona en un entorno de Node.JS, trabaja con un sistema de módulos tipo CommonJS (CJS). Por eso, necesitamos agregar la extensión cjs a nuestro archivo de configuración de Babel.

> #### ❗ Otra nota importante ❗
>
> Los presets permiten configurar Babel para que soporte todos los lenguajes y tecnologías aplicadas en nuestro proyecto.

### ✅ Checkpoint

Para comprobar que hemos instalado y configurado correctamente Babel, ejecutemos el siguiente comando:

```
npm test
```

Nuestra terminal debería mostrar un mensaje similar a este:

![paso-02-checkpoint](https://github.com/diegog-ux10/react-testing-config/assets/86785486/fbb7dc2c-5451-449a-aa4b-ac0ee3a0a642)

🆗 Ahora nuestras pruebas corren sin ningún error

## Paso 03 - Utilizar Mocks

### 3.1 Renderizar componente App

En el archivo de pruebas de ejemplo, cambia lo que estás renderizando por el componente **App**. Debería quedar así:

```tsx
import { render } from '@testing-library/react';
import App from '../App';

test('loads and displays greeting', () => {
  render(<App />);
});
```

### 3.2 Correr pruebas y analizar error

Corre las pruebas con **npm test** y debería aparecer un error como este:

```
     SyntaxError: Unexpected token '<'

      1 | import { useState } from 'react'
    > 2 | import reactLogo from './assets/react.svg'
        | ^
      3 | import viteLogo from '/vite.svg'
      4 | import './App.css'
      5 |

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
      at Object.require (src/App.tsx:2:1)
      at Object.require (src/__test__/ejemplo.test.tsx:2:1)
```

❌ Este error surge porque **Jest** intenta procesar un archivo **.svg** como si fuera código de JavaScript.

### 3.3 Crear carpeta de Mocks

Para solucionar este error, crea una carpeta nueva llamada **mocks** dentro del directorio **src**. Luego, agrega dentro de esa carpeta un archivo llamado **file-mock.js**.

![ss-carpeta-mocks](https://github.com/diegog-ux10/react-testing-config/assets/86785486/e51896b6-3dec-439d-a7b9-341eecfa53e8)

Ahora, dentro del archivo escribe el siguiente código:

```js
/*file-mock.js*/

module.exports = {};
```

### 3.4 Actualizar la configuración de Jest para utilizar mocks

Esto no es suficiente, necesitamos decirle a Jest que cuando encuentre una importación con el tipo de extensión **.svg**, utilice nuestro archivo file-mock. Para lograr esto, agrega lo siguiente a tu **package.json**:

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "\\.(svg)$": "<rootDir>/src/__mocks__/file-mock.js"
    }
  }
}
```

Si intentamos correr nuestras pruebas con **npm test**, ahora veremos un error como este:

```
  SyntaxError: Private field '#root' must be declared in an enclosing class

      2 | import reactLogo from './assets/react.svg'
      3 | import viteLogo from '/vite.svg'
    > 4 | import './App.css'
        | ^
      5 |
      6 | function App() {
      7 |   const [count, setCount] = useState(0)
```

❌ Similar al caso anterior, Jest ahora está intentando leer un archivo **.css** como si fuera de JavaScript.

### 3.5 Agregar extensión .css al mapper de Jest

Para corregir este error, solo tenemos que agregar una extensión más a nuestra configuración previa de Jest:

```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
      "\\.(svg|css)$": "<rootDir>/src/__mocks__/file-mock.js"
    }
  }
}
```

Si tienes dudas de lo que modificamos, puedes comparar el antes y después en esta imagen:

![diff-paso03-css](https://github.com/diegog-ux10/react-testing-config/assets/86785486/9957bbb7-a02e-47be-840a-3de22c58154a)

#### ⚠ ¿Por qué solamente debemos agregar **module.exports = {}**?

Cuando Jest renderiza un componente que importa algún archivo que no sea de JavaScript, redirige la importación al archivo mockeado y no genera un error de sintaxis. Dado que no necesitamos renderizar nada que afecte la visualización, ya que solo estamos simulando un navegador, exportar un módulo vacío es suficiente.

> #### ❗ Nota importante ❗
>
> Solo estamos agregando las extensiones .svg y .css en el mapper, ya que son las únicas que se están utilizando en nuestro componente App. Si necesitamos que nuestro mock sea utilizado por Jest con otros tipos de archivos, podemos agregar extensiones separándolas con 👉 **|**
> Ejemplo:
>
> ```
> "\\.(svg|png|jgp)$": "<rootDir>/src/__mocks__/file-mock.js"
>
> ```
>
> ☑☑☑☑

### ✅ Checkpoint

Para comprobar que hemos configurado correctamente nuestro mock, ejecutemos el siguiente comando:

```
npm test
```

Nuestra terminal debería mostrarnos un mensaje similar a este:

![paso-03-checkpoint](https://github.com/diegog-ux10/react-testing-config/assets/86785486/d1034f32-ca38-483a-8600-98e10395c7ae)

🆗 Ahora, nuestras pruebas se ejecutan sin ningún error de sintaxis.

## Paso 04 - Arrange

### 4.1 Crea un nuevo archivo de prueba

En el directorio de ****tests**** crea una nuevo archivo llamado _login.test.tsx_.

### 4.2 Encabezado de la Prueba

En el nuevo archivo _login.test.tsx_ escribe el encabezado de la prueba utilizando la función **describe**.

```tsx
// login.test.tsx

describe('Pruebas en Login', () => {});
```

### 4.3 Usar It

Dentro del callback que esta en el segundo argumento de _describe_, podemos empezar a crear todas las pruebas relacionadas con el Login (login). Para ello, utilizaremos _it_. _it_ es una funcion de Jest que nos permite ejecutar pruebas, y separarlas por lo que _deberian_ hacer.

```tsx
// login.test.tsx

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {});
});
```

### 4.4 Render

Utilizar la función render de React Testing Library, para renderizar el componente que necesitas testear:

```tsx
// login.test.tsx

import { render } from '@testing-library/react';
import { Login } from '../pages/login/login';

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {
    // Arrange
    render(<Login />);
  });
});
```

ℹ️ Debido a que estamos testeando el frontend de la aplicación, es muy común que dentro del arrange siempre necesitemos renderizar algún componente.

### 4.5 Jest Function y Mocks

Como nuestra prueba intenta verificar si navigate es llamado luego de la autenticación, Vamos a hacer un mock de navigate:

```tsx
// login.test.tsx

import { render } from '@testing-library/react';
import { Login } from '../pages/login/login';

const navigateMock = jest.fn(); // Mock de Navigate

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {
    // Arrange
    render(<Login />);
  });
});
```
**jest.fn()** es una función proporcionada por Jest que se utiliza para crear mocks de funciones. Un "mock" es una versión simulada de una función existente que se utiliza en pruebas para simular el comportamiento de la función real.

Ahora, navigate realmente no es importado directamente de una librería. De hecho, es una función que es retornada por el hook useNavigate. Necesitamos mockear useNavigate para que retorne navigateMock.

```tsx
// login.test.tsx

import { render } from '@testing-library/react';
import { Login } from '../pages/login/login';

const navigateMock = jest.fn();
const useNavigateMock = () => navigateMock; // Mock de useNavigate

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {
    // Arrange
    render(<Login />);
  });
});
```
Listo, ya tenemos los mocks. Ahora necesitamos reemplazarlos por los reales. Lo haremos creando un mock de un módulo completo, en este caso, de React Router.

```tsx
// login.test.tsx

import { render } from '@testing-library/react';
import { Login } from '../pages/login/login';

const navigateMock = jest.fn();
const useNavigateMock = () => navigateMock;
jest.mock('react-router', () => {
  return {
    useNavigate: useNavigateMock
  }
})

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {
    // Arrange
    render(<Login />);
  });
});
```
**jest.mock()** Es una función de Jest que simula de todo el módulo 'react-router'. Devuelve un objeto donde useNavigate se reemplaza con useNavigateMock. Esto significa que cada vez que useNavigate se utiliza dentro de la prueba, en realidad utilizará la función useNavigateMock, que a su vez devuelve navigateMock.

Al configurar estos mocks, puedes controlar el comportamiento del hook useNavigate dentro de tus pruebas, lo que te permite simular acciones de navegación sin realmente realizar la navegación dentro de tus pruebas. Esto es útil para probar componentes que utilizan la funcionalidad de navegación de React Router, como es el caso de nuestro componente Login.


### 4.6 screen.debug

Agrega **screen.debug()** justo despues de la reenderización. Se utiliza para imprimir en la consola el HTML actual del componente que se está probando. Esto es útil para depurar y comprender mejor el estado y la estructura del componente durante la ejecución de la prueba.

```tsx
// login.test.tsx

import { render, screen } from '@testing-library/react';
import { Login } from '../pages/login/login';

const navigateMock = jest.fn();
const useNavigateMock = () => navigateMock;
jest.mock('react-router', () => {
  return {
    useNavigate: useNavigateMock
  }
})

describe('Pruebas en Login', () => {
  it('Debe llamar navigate con / si los datos son correctos', () => {
    // Arrange
     render(<Login />);

    screen.debug(); // Con esto podras ver el html del componente en consola
  });
});
```

### 4.7 Agregar data-testid en el Formulario

Como necesitamos ingresar datos para probar el formulario de login. Debemos hacer referencia a los input's del formulario para luego ingresar la información. Para esto nos va a ayudar los data-testid.

**data-testid** es un atributo personalizado que se puede agregar a elementos HTML en tu código fuente para proporcionar identificadores específicos que se pueden utilizar en pruebas automatizadas. Es una práctica común en pruebas de frontend y es especialmente útil cuando se utilizan bibliotecas de pruebas como Testing Library.

```tsx
  <input
      type="text"
      id="email"
      name="email"
      placeholder="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      data-testid="login_form_email_input"
    />
  <input
    type="password"
    id="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleInputChange}
    required
    autoComplete="current-password"
    data-testid="login_form_password_input"
  />
  <button
    type="submit"
    disabled={loginStatus === 'loading'}
    data-testid="login_form_submit_button"
  >
    Login
  </button>
```

Como podrás ver, hemos agregado el atributo **data-testid** en 3 elementos del formulario; los dos input's y el botón de submit.

Ahora necesitamos utilizar este atributo en nuestra prueba:

```tsx
const { getByTestId } = render(<Login />);

const emailInput = getByTestId('login_form_email_input');
const passwordInput = getByTestId('login_form_password_input');
const submitButton = getByTestId('login_form_submit_button');
```

**render** además de mostrar el HTML retorna varias funciones útiles. Una de ella es getByTestId que nos permite encontrar y hacer referencia a los elementos que tenga el atributo data-testid.

### ✅ Checkpoint - Paso 04

Para verificar que todo esté funcionando bien. Agrega las siguientes líneas de código a tu prueba.

```tsx
console.log({ 'email input': emailInput });
console.log({ 'passwordd input': passwordInput });
console.log({ 'submit button': submitButton });
```

Esto nos servirá para poder ver en la consola si estamos haciendo la referencia correctamente. Por último ejecuta el siguiente comando:

```
npm run test login.test.tsx
```

Debido a que ahora tenemos más de un archivo de pruebas en nuestro proyecto, hemos agregado 'login.test.tsx' al comando para especificarle a jest que solo debe ejecutar ese archivo.

Deberias poder ver algo similar a esto:

![paso-04-checkpoint](https://github.com/diegog-ux10/react-testing-config/assets/86785486/adf09818-0617-4844-a814-2d985228d5f0)

🆗 Hemos logrado **preparar** (arrange) nuestra prueba para el siguiente paso.

## Paso 05 - Act

### 5.1 Instalar user event de testing library

Para realizar la interacción con el componente vamos a utilizar una nueva librería. Ejecuta el siguiente comando:

```
npm install --save-dev @testing-library/user-event
```

### 5.2 Utilizar userEvent

Ahora vamos a la prueba y utilicemos userEvent. Puedes agregar estas líneas de código a tu prueba:

```tsx
await userEvent.type(emailInput, 'email@example.com');
await userEvent.type(passwordInput, '123456');
await userEvent.click(submitButton);
```

Aquí es importante resaltar 2 cosas:

- La primera es que estamos usando await, por lo que debemos hacer nuestra función asíncrona.

```tsx
describe('Pruebas en Login', () => {
  // Hemos agregado async al callback
  it('Debe llamar navigate con / si los datos son correctos', async () => {
    // ...resto del código
    const emailInput = getByTestId('login_form_email_input');
    const passwordInput = getByTestId('login_form_password_input');
    const submitButton = getByTestId('login_form_submit_button');
    // ✅ Act
    await userEvent.type(emailInput, 'email@example.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(submitButton);
    // resto del código...
  });
});
```

- La segunda es el método que estamos usando de userEvent; para los input's usamos type debido a que necesitamos escribir y para el botón estamos usando click porque solo queremos hacer click luego de ingresar los datos.

### ✅ Checkpoint - Paso 05

Para verificar que lo hayas hecho bien. Ejecuta las pruebas

```
npm run test login.test.tsx
```

Deberiamos poder ver en la consola esto:

```js
console.log
   <form>
    <input
      data-testid="login_form_email_input"
      id="email"
      name="email"
      placeholder="email"
      required=""
      type="text"
      value="email@example.com" // valor ingresado
    />
    <input
      autocomplete="current-password"
      data-testid="login_form_password_input"
      id="password"
      name="password"
      placeholder="Password"
      required=""
      type="password"
      value="123456" // valor ingresado 
    />
    <button
      data-testid="login_form_submit_button"
      type="submit"
    >
      Login
    </button>
  </form>
```

🆗 Si aparece esto quiere decir que lograste ingresar los datos correctamente en los input's. Ahora podemos terminar nuestra prueba haciendo el **assert**.

## Paso 06 - Assert

### 6.1 Utilizar waitFor()

Agrega **waitFor()** para hacer las afirmaciones de tu prueba:

```tsx
import { render, screen, waitFor } from '@testing-library/react';

//...resto del código...

// ✅ Assert
await waitFor(() => {});
```

Esta función se utiliza para esperar a que se completen las operaciones asincrónicas en escenarios de prueba. Esto podría incluir esperar a que se resuelvan las promesas, se renderizen los elementos DOM u otras tareas asincrónicas finalicen antes de continuar con las afirmaciones.

### 6.2 afimar con expect()

La función **expect()** se utiliza para realizar afirmaciones o expectativas sobre el comportamiento de tu código durante la ejecución de pruebas. Básicamente, te permite verificar si ciertas condiciones son verdaderas o falsas.

```tsx
await waitFor(() => {
  expect(navigateMock).toHaveBeenCalledWith('/');
});
```

✅ Esto nos ayudará a afirmar que la aplicación a llamado al mock de navigate para redirigirnos a la página de incio.

```

### ✅ Checkpoint - Paso 06

Ejecuta el siguiente comando:

```
npm run test login
```

Deberías poder ver que las pruebas pasaron:

![checkpoint6](https://github.com/diegog-ux10/react-testing-config/assets/86785486/40d410aa-216e-4b26-b047-b274d98c8934)

🆗 Felicidades ahora sabes como configurar tus proyectos para hacer pruebas y como diseñarlas utilizando el patrón triple AAA.
