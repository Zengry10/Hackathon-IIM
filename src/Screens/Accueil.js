import React, { useState } from 'react';
import '../Style/accueil.css';
import '../assets/logo_safran.png'
import logo from '../assets/logo_safran.png'

export default function Accueil() {


  return (
    <div className='container'>
        <nav className='container-navbar'>
            <div className='container-navbar__left'>
                <img className='container-accueil__logo' src={logo} alt="logo" />
                <div className='container-navbar__left__part'>
                    <p>Groupe</p>
                    <p>Produits et service</p>
                    <p>Carrières</p>
                    <p>Finance</p>
                    <p>Médias</p>
                </div>
            </div>
            <div className='container-navbar__right'>
            <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"></path><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"></path></g></svg>
            </div>
        </nav>
        <div>
            <img className='container-image-principal' src={logo} alt="logo" />
        </div>
    </div>
  );

}


