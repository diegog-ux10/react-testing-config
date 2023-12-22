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
>
>☑☑☑

#### Así debe verse nuestro archivo package.json luego de la instalación

![paso-01-devdependencies](https://github.com/diegog-ux10/react-testing-config/assets/86785486/08ac2eaf-9714-4f33-8e49-75dd88570310)


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

Para comenzar este paso, vamos a crear una prueba de ejemplo. Crea una carpeta llamada **__tests__** dentro del directorio **src**.

Ahora, crea un archivo de ejemplo para una prueba dentro de la carpeta **__tests__**.

![ss-carpeta-tests](https://github.com/diegog-ux10/react-testing-config/assets/86785486/5b72b432-51aa-4182-8fde-83ef676727bd)

```tsx
/* ejemplo.test.tsx */

import { render } from "@testing-library/react";

test("loads and displays greeting", () => {
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
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
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
