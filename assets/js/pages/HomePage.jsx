import React from 'react'

const HomePage = props => {
  return (
    <div className='jumbotron'>
      <div className='container'>
        <h1 className='display-3'>Gestion de factures</h1>
        <p className='lead my-3'>
          Cette API a été créee à partir d'une formation e-learning sur le site
          Udemy. Les outils utilisés lors de ce tutoriel sont Symfony 4, API
          Platform et React.
        </p>
        <hr className='my-4' />
        <p className='lead my-2'>
          <a
            className='btn btn-primary'
            href='https://www.udemy.com/symfony-api-platform-react/'
            target='_blank'
            role='button'
          >
            En savoir plus
          </a>
        </p>
      </div>
    </div>
  )
}

export default HomePage
