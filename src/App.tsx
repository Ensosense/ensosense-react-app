import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchArtworksPage } from './layouts/SearchArtworksPage/SearchArtworksPage';

export const App = () => {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchArtworksPage />
      <Footer />
    </div>
  );
}

export default App;
