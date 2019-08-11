import React from 'react'

const HomePage = props => {
  return (
    <div className='jumbotron'>
      <div className='container'>
        <h1 className='display-4'>Gestion de factures</h1>
        <p className='lead my-3'>
          Cette API a été créée à partir d'une formation e-learning. Les outils
          utilisés lors de ce tutoriel sont Symfony 4, API Platform et React.
          Ci-dessous des identifiants de connexion d'un compte avec des données
          enregistrées:
        </p>
        <h5 className='mt-5 mb-2'>Email: api@gmail.com</h5>
        <h5 className='mb-5'> Mot de passe: api</h5>
        <p className='lead'>Bonne visite!</p>
        <hr className='my-4' />
        <p className='lead my-2'>
          <a
            className='btn btn-primary'
            href='https://www.udemy.com/symfony-api-platform-react/'
            target='_blank'
            role='button'
          >
            Accès à la formation e-learning
          </a>
        </p>
      </div>
    </div>
  )
}

export default HomePage
