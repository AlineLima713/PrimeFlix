import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Filme from './pages/Filme';

import Header from './Components/Header';


function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/filme/:id' element={<Filme />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;