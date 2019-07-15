import React from "react";

const HomePage = props => {
  return (
    <div className='jumbotron'>
      <div className='container'>
        <h1 className='display-3'>Gestion de factures</h1>
        <p className='lead my-3'>
          Ce site a été crée pour faciliter la gestion administrative des
          auto-entrepreneurs.
        </p>
        <hr className='my-4' />
        <p>
          Il associe le framework Symfony à une API Platform et une librairie
          React pour une meilleure expérience utlisateur.
        </p>
        <p className='lead my-2'>
          <a className='btn btn-primary btn-lg' href='#' role='button'>
            En savoir plus
          </a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
