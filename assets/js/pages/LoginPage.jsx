import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  //Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };

  //Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch (error) {
      setError(" Votre adresse mail ou mot de passe est incorrect.");
    }
  };

  return (
    <>
      <h1>Connexion à l'application</h1>

      <form onSubmit={handleSubmit}>
        <Field
          label='Adresse email'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          placeholder='Adresse email'
          error={error}
        />
        <Field
          label='Mot de passe'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder='Mot de passe'
          error={error}
        />
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
