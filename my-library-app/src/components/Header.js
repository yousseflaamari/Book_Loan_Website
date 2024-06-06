import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // Ensure you have the necessary CSS

function Header() {
  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <i className="ri-book-3-line"></i> E-Book
        </a>
        <div className="nav__menu">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#home" className="nav__link active-link">
                <i className="ri-home-line"></i>
                <span>Home</span>
              </a>
            </li>
            <li className="nav__item">
              <a href="#featured" className="nav__link">
                <i className="ri-book-3-line"></i>
                <span>Featured</span>
              </a>
            </li>
            <li className="nav__item">
              <a href="#discount" className="nav__link">
                <i className="ri-price-tag-3-line"></i>
                <span>Discount</span>
              </a>
            </li>
            <li className="nav__item">
              <a href="#new" className="nav__link">
                <i className="ri-bookmark-2-line"></i>
                <span>New Books</span>
              </a>
            </li>
            <li className="nav__item">
              <Link to="/login" className="nav__link">
                <i className="ri-message-3-line"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav_actions">
          <i className="ri-search-line search-button" id="search-button"></i>
          <i className="ri-user-line login-button" id="login-button"></i>
          <i className="ri-moon-line change-theme" id="theme-button"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
