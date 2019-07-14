import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import UsersAPI from "../services/usersAPI";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firsName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    firsName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Gestion des changements d'input dans le form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  //Gestion de la soumission du formulaire d'inscription
  const handleSubmit = async event => {
    event.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Une erreur est survenue dans votre formulaire");
      return;
    }
    try {
      await UsersAPI.register(user);
      setErrors({});
      // TODO : Flash success
      toast.success("Vous êtes bien inscrit");
      history.replace("/login");
      console.log(response);
    } catch (error) {
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach(violation => {
          apiErrors[violations.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      // TODO: Flash erreurs
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name='firstName'
          label='Prénom'
          type='text'
          placeholder='Prénom'
          onChange={handleChange}
          value={user.firstName}
          error={errors.firstName}
        />
        <Field
          name='lastName'
          label='Nom'
          type='text'
          placeholder='Nom'
          onChange={handleChange}
          value={user.lastName}
          error={errors.lastName}
        />
        <Field
          name='email'
          label='Email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          value={user.email}
          error={errors.email}
        />
        <Field
          name='password'
          label='Mot de passe'
          type='password'
          placeholder='Mot de passe'
          onChange={handleChange}
          value={user.password}
          error={errors.password}
        />
        <Field
          name='passwordConfirm'
          label='Confirmation'
          type='password'
          placeholder='Confirmation du mot de passe'
          onChange={handleChange}
          value={user.passwordConfirm}
          error={errors.passwordConfirm}
        />
        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            S'inscrire
          </button>
          <Link to='/login' className='btn btn-link'>
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
