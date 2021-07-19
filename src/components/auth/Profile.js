import { useState, useEffect } from "react";

import api from "../../apis/api";

function Profile() {
  const [profile, setProfile] = useState({ _id: "", name: "", email: "" });

  // O useEffect executa a callback (primeiro argumento) uma vez caso a array de dependências (segundo argumento) estiver vazia (mesmo efeito do componentDidMount)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/profile");

        setProfile({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Seu perfil</h1>
      <p>
        <strong>ID: </strong>
        {profile._id}
      </p>
      <p>
        <strong>Nome: </strong>
        {profile.name}
      </p>
      <p>
        <strong>E-mail: </strong>
        {profile.email}
      </p>
    </div>
  );
}

export default Profile;
