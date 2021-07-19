import { useState } from "react";
import axios from "axios";

import TextInput from "../TextInput";

function Login() {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/login", state);

      setError(null);

      console.log(response);
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <hr />

      <TextInput
        label="E-mail"
        name="email"
        type="email"
        id="LoginFormEmailField"
        onChange={handleChange}
        value={state.email}
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        id="LoginFormPasswordField"
        onChange={handleChange}
        value={state.password}
      />

      <hr />
      <button type="submit" className="btn btn-primary">
        Login
      </button>

      {error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : null}
    </form>
  );
}

export default Login;
