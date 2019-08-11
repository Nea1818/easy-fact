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
        <p className='lead mt-4 mb-2'>EMAIL: api@gmail.com</p>
        <p className='lead'> PASSWORD: api</p>
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
