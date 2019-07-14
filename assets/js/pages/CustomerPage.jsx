import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";

const CustomerPage = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [customer, setCustomer] = useState({
    lastName: "Nea",
    firstName: "",
    email: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const [editing, setEditing] = useState(false);

  // Récupération du customer en fonction de l'identifiant
  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      );

      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      console.log(error.response);
      // TODO: Notification flash
      history.replace("/customers");
    }
  };

  // Chargement du customer au chargement du composant ou de l'id
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }
  }, [id]);

  // Gestion des changements d'input dans le form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  // Gestion de la soumission du form
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        await CustomersAPI.update(id, customer);

        // TODO: Flash notification de succès
      } else {
        await CustomersAPI.create(customer);

        // TODO: Flash notification de succès
        history.replace("/customers");
      }

      setErrors({});
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violation.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);

        // TODO: Flash notification d'erreurs
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un client </h1>) || (
        <h1>Modification d'un client </h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          label='Nom de famille'
          name='lastName'
          placeholder='Nom de famille'
          value={customer.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          label='Prénom'
          name='firstName'
          placeholder='Prénom'
          value={customer.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          label='Email'
          name='email'
          placeholder='Adresse email'
          type='email'
          value={customer.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Field
          label='Entreprise'
          name='company'
          placeholder='Entreprise du client'
          value={customer.company}
          onChange={handleChange}
          error={errors.company}
        />
        <div className='form-group'>
          <button type='submit' className='btn btn-success'>
            Enregistrer
          </button>
          <Link to='/customers' className='btn btn-link'>
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
