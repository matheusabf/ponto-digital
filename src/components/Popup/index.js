import './index.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Popup({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username == 'matheus' && password == 'senha') {
      navigate('/registrar-ponto');
      sessionStorage.setItem('autenticado', 'true');
      sessionStorage.setItem('nome', username);
      onClose();
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="popup-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="popup-input"
        />
        <button onClick={handleLogin} className="popup-button">Login</button>
      </div>
    </div>
  );
}

export default Popup;
