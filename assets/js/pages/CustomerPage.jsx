import React, { useState, useEffect } from 'react'
import Field from '../components/forms/Field'
import { Link } from 'react-router-dom'
import CustomersAPI from '../services/customersAPI'
import { toast } from 'react-toastify'
import FormContentLoader from '../components/loaders/FormContentLoader'

const CustomerPage = ({ match, history }) => {
  const { id = 'new' } = match.params

  const [customer, setCustomer] = useState({
    lastName: '',
    firstName: '',
    email: '',
    company: ''
  })

  const [errors, setErrors] = useState({
    lastName: '',
    firstName: '',
    email: '',
    company: ''
  })

  const [loading, setLoading] = useState(false)

  const [editing, setEditing] = useState(false)

  // Récupération du customer en fonction de l'identifiant
  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      )

      setCustomer({ firstName, lastName, email, company })
      setLoading(false)
    } catch (error) {
      toast.error('Une erreur est survenue lors du chargement du client')
      history.replace('/customers')
    }
  }

  // Chargement du customer au chargement du composant ou de l'id
  useEffect(() => {
    if (id !== 'new') {
      setLoading(true)
      setEditing(true)
      fetchCustomer(id)
    }
  }, [id])

  // Gestion des changements d'input dans le form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setCustomer({ ...customer, [name]: value })
  }

  // Gestion de la soumission du form
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      setErrors({})
      if (editing) {
        await CustomersAPI.update(id, customer)

        toast.success('Le client a bien été modifié')
      } else {
        await CustomersAPI.create(customer)

        toast.success('Le client a bien été crée')
        history.replace('/customers')
      }
    } catch ({ response }) {
      const { violations } = response.data
      if (violations) {
        const apiErrors = {}
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        })
        setErrors(apiErrors)

        toast.error('Le formulaire est mal rempli')
      }
    }
  }

  return (
    <>
      {(!editing && <h1>Création d'un client </h1>) || (
        <h1>Modification d'un client </h1>
      )}
      {loading && <FormContentLoader />}
      {!loading && (
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
      )}
    </>
  )
}

export default CustomerPage
