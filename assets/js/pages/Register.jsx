import React, { useState } from 'react'
import Field from '../components/forms/Field'
import { Link } from 'react-router-dom'
import UsersAPI from '../services/usersAPI'
import { toast } from 'react-toastify'

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firsName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const [errors, setErrors] = useState({
    firsName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  // Gestion des changements d'input dans le form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setUser({ ...user, [name]: value })
  }

  //Gestion de la soumission du formulaire d'inscription
  const handleSubmit = async event => {
    event.preventDefault()

    const apiErrors = {}
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original"
      setErrors(apiErrors)
      toast.error('Votre formulaire est mal rempli')
      return
    }
    try {
      await UsersAPI.register(user)
      setErrors({})
      // TODO : Flash success
      toast.success('Vous êtes bien inscrit')
      history.replace('/login')
      console.log(response)
    } catch (error) {
      const { violations } = error.response.data

      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message
        })
        setErrors(apiErrors)
      }
      // TODO: Flash erreurs
      toast.error('Votre formulaire est mal renseigné.')
    }
  }

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name='firstName'
          type='text'
          placeholder='Prénom'
          onChange={handleChange}
          value={user.firstName}
          error={errors.firstName}
        />
        <Field
          name='lastName'
          type='text'
          placeholder='Nom'
          onChange={handleChange}
          value={user.lastName}
          error={errors.lastName}
        />
        <Field
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          value={user.email}
          error={errors.email}
        />
        <Field
          name='password'
          type='password'
          placeholder='Mot de passe'
          onChange={handleChange}
          value={user.password}
          error={errors.password}
        />
        <Field
          name='passwordConfirm'
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
  )
}

export default RegisterPage
