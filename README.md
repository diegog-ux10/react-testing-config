# Configurar React Testing con Babel

## Paso 01 - Instalar y Configurar Jest

### 1.1 Instalar Jest

Para empezar a configurar nuestro ambiente de pruebas necesitamos instalar Jest. Aprovecharemos de instalar algunas dependencias que serán necesarias (*@testing-library/react* y *jest-environment-jsdom*). Ejecuta el siguiente comando:

```
npm install --save-dev jest @testing-library/react jest-environment-jsdom
```
#### ¿Por qué necesitamos instalar estas dependencias?

- Jest: es un Framework de prueba de JavaScript
- React Testing Library: contiene muchas utilidades para desarrollar nuestras pruebas con componentes de React
- Jest environment jsdom: jsdom es una implementación de JavaScript pura del DOM y las API del navegador que se ejecuta en node.

> #### ❗ Nota importante ❗
> 
> Utilizamos **--save-dev** para especificar que las dependencias son para ser utilizadas en un ambiente de desarrollo. Esto quiere decir, que cuando la aplicación sea desplegada en producción, no tomará en cuenta dichas dependencias.

#### Así debe verse nuestro archivo package.json luego de la instalación

![paso-01-devdependencies](https://github.com/diegog-ux10/react-testing-config/assets/86785486/08ac2eaf-9714-4f33-8e49-75dd88570310)


### 1.2 Configurar Jest

La manera de correr nuestras pruebas es ejecutando un comando en la terminal, por ello debemos agregar un script nuevo en nuestro archivo **package.json**

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Ahora cuando ejecutemos en nuestra terminal **npm test** Jest buscará y examinará nuestras pruebas.

Por último, vamos a agregar una configuración de Jest en nuestro **package.json**:

```json
{
  "jest": {
    "testEnvironment": "jsdom" 
  }
}
```

👆 Esta configuración le dice a Jest que utilice **jsdom** como **simulador del navegador** para nuestras pruebas.

### ✅ Checkpoint

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

🆗 Como podemos ver **Jest** está funcionando correctamente y nos dice que no encontró ninguna prueba, ya que no la hemos creado.
