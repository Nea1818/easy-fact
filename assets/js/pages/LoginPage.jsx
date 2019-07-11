import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

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
        <div className='form-group'>
          <label htmlFor='username'>Adresse email</label>
          <input
            value={credentials.username}
            onChange={handleChange}
            type='email'
            placeholder='Adresse email'
            name='username'
            id='username'
            className={"form-control" + (error && " is-invalid")}
          />
          {error && (
            <p className='invalid-feedback'>
              Votre adresse mail ou mot de passe est incorrect.
            </p>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Mot de passe</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type='password'
            placeholder='Mot de passe'
            name='password'
            id='password'
            className='form-control'
          />
        </div>
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
