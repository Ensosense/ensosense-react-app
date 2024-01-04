import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchArtworksPage } from './layouts/SearchArtworksPage/SearchArtworksPage';
import { Redirect, Route, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' exact>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchArtworksPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
