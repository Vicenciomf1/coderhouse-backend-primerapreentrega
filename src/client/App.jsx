import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://es.vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://es.reactjs.org/" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Configurado el entorno de desarrollo con Vite y React para el frontend futuro, en las páginas en donde sea obligatorio, como por ejemplo
          en el login, se usará la vista desde el server de handlebars, aunque igual mi idea es que todo sea desde React comunicándose con la API.
        </p>
      </div>
      <p className="read-the-docs">
        Los logos de cada tecnología llevan a cada documentación.
      </p>
    </div>
  );
}

export default App;
