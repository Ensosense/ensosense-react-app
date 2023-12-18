import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreArtworks } from './layouts/HomePage/ExploreArtworks';
import { Carousel } from './layouts/HomePage/Carousel';
import { Heros } from './layouts/HomePage/Heros';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreArtworks />
      <Carousel />
      <Heros />
    </div>
  );
}

export default App;
