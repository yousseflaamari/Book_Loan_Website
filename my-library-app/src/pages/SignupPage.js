import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign-up.css';

const SignupPage = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
  const [role, setRole] = useState('utilisateur');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNomChange = (e) => setNom(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMotDePasseChange = (e) => setMotDePasse(e.target.value);
  const handleConfirmMotDePasseChange = (e) => setConfirmMotDePasse(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Veuillez saisir une adresse email valide');
      return;
    }

    if (motDePasse !== confirmMotDePasse) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    setErrorMessage('');

    try {
      await axios.post('http://localhost:3001/api/users/register', { nom, email, motDePasse, role });
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className='signup-wrapper'>
      <form onSubmit={handleSignup} className='signup-form'>
        <h1>Sign Up</h1>
        <div className="signup-input-box">
          <input
            type="text"
            placeholder='Nom complet'
            value={nom}
            onChange={handleNomChange}
            required
          />
        </div>
        <div className="signup-input-box">
          <input
            type="email"
            placeholder='Votre email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="signup-input-box">
          <input
            type="password"
            placeholder='Mot de passe'
            value={motDePasse}
            onChange={handleMotDePasseChange}
            required
          />
          <span className="confirm-password-label">Confirmation de password</span>
          <input
            type="password"
            placeholder='Confirmer le mot de passe'
            value={confirmMotDePasse}
            onChange={handleConfirmMotDePasseChange}
            required
          />
          {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
        </div>
        <div className="signup-input-box">
          <label htmlFor="role">Je suis :</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="utilisateur">Utilisateur</option>
            <option value="administrateur">Administrateur</option>
          </select>
        </div>
        <div className="signup-register-link">
          <p>Déjà membre? <a href="/login">Se connecter</a></p>
        </div>
        <button type="submit" className='signup-button'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
