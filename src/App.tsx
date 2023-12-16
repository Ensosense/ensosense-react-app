import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreArtworks } from './layouts/HomePage/ExploreArtworks';
import { Carousel } from './layouts/HomePage/Carousel';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreArtworks />
      <Carousel />
    </div>
  );
}

export default App;
