import { render } from "@testing-library/react";
// 👀 importa el componente App a este aquí ❗

test("loads and displays greeting", () => {
  render(
    <div>
      <h1>Hola, Soy una prueba</h1>
    </div> /* 👈 Cambia todo lo que se esta dentro de render por el componente App 😬*/
  );
});
