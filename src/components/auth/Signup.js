import { useState } from "react";
import axios from "axios";

import TextInput from "../TextInput";

function Signup() {
  // O useState é um Hook que recebe como argumento o state inicial, e retorna uma array com 2 elementos: o primeiro é o state, e o segundo, uma função para atualizar esse state
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleChange(event) {
    // Diferente das classes, a função de atualização de state dos Hooks é destrutiva, ou seja, substitui o state anterior pelo novo. Para não perdermos partes do state anterior no processo de atualização, precisamos primeiramente salvar o state anterior antes de atualizá-lo
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signup", state);
      setError(null);

      console.log(response);
    } catch (err) {
      console.log(err.response);

      // Garantindo que o objeto de erro tem as propriedades que precisamos para evitar tentar acessar propriedades de undefined
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <hr />

      {/* Campo de nome */}
      <TextInput
        label="Nome"
        name="name"
        type="text"
        id="SignupFormNameInput"
        onChange={handleChange}
        value={state.name}
      />

      {/* Campo de e-mail */}
      <TextInput
        label="E-mail"
        name="email"
        type="email"
        id="SignupFormEmailInput"
        onChange={handleChange}
        value={state.email}
      />

      {/* Campo de senha */}
      <TextInput
        label="Senha"
        name="password"
        type="password"
        id="SignupFormPasswordInput"
        onChange={handleChange}
        value={state.password}
      />

      <hr />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : null}
    </form>
  );
}

export default Signup;
