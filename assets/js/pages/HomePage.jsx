import React from "react";

const HomePage = props => {
  return (
    <div className='jumbotron'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <h1 className='display-3'>Gestion de factures</h1>
            <p className='lead my-3'>
              Ce site a été crée pour faciliter la gestion administrative des
              auto-entrepreneurs.
            </p>
            <hr className='my-4' />
            <p>
              Il associe le framework Symfony à une API Platform et une
              librairie React pour une meilleure expérience utlisateur.
            </p>
            <p className='lead my-2'>
              <a className='btn btn-primary btn-lg' href='#' role='button'>
                En savoir plus
              </a>
            </p>
          </div>
          <div className='col-md-4'>
            <img
              src='https://s3-eu-west-1.amazonaws.com/assets.atout-on-line.com/images/commerce/Images%20Guide%20Formation/etudes_comptable_zoom.jpg'
              alt='comptabilité'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
