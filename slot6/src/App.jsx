import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import MenuSection from './components/MenuSection';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      <Navbar />
      <HeroCarousel />
      <MenuSection />
      <BookingForm />
    </div>
  );
}

export default App;