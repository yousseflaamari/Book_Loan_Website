import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Assurez-vous d'importer le fichier CSS pour le style

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
