import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer section">
      <div className="footer__container container grid">
        <div className="footer__content">
          <h3 className="footer__title">E-Book</h3>
          <p className="footer__description">Find your next great read.</p>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Company</h3>
          <ul className="footer__links">
            <li><a href="#" className="footer__link">About Us</a></li>
            <li><a href="#" className="footer__link">Blog</a></li>
            <li><a href="#" className="footer__link">Careers</a></li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Support</h3>
          <ul className="footer__links">
            <li><a href="#" className="footer__link">Help Center</a></li>
            <li><a href="#" className="footer__link">Contact Us</a></li>
            <li><a href="#" className="footer__link">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer__content">
          <h3 className="footer__title">Follow Us</h3>
          <div className="footer__socials">
            <a href="#" className="footer__social"><i className="ri-facebook-fill"></i></a>
            <a href="#" className="footer__social"><i className="ri-instagram-fill"></i></a>
            <a href="#" className="footer__social"><i className="ri-twitter-fill"></i></a>
          </div>
        </div>
      </div>
      <span className="footer__copy">&#169; E-Book. All rights reserved.</span>
    </footer>
  );
}

export default Footer;
