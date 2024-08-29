import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

import Popup from '../Popup';
function Header() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const navigate = useNavigate();
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const handleClick = () => {
        navigate('/login/');
    };

    const handleLogout = () => {
      sessionStorage.removeItem('autenticado');
      sessionStorage.removeItem('nome');
      navigate('/login');
  };
    const nome = sessionStorage.getItem('nome');
    const autenticado = sessionStorage.getItem('autenticado') === 'true';
  return (
    <header className="header">
      <h1 onClick={handleClick}>.Digital</h1>
      {autenticado && (
                <div className="navmenu">
                    <Link to="relatorio">Relatório</Link>
                    <Link to="registrar-ponto">Registrar Ponto</Link>
                    <Link to="meus-dados">Meus Dados</Link>
                </div>
            )}
        <div className="login">
                {autenticado ? (
                    <p>Bem-vindo(a), {nome}
                    <br />
                    <a onClick={handleLogout}>Deslogar-se</a></p>
                    
                ) : (
                    <span onClick={openPopup}>Fazer Login</span>
                )}
                <Popup isOpen={isPopupOpen} onClose={closePopup} />
            </div>
    </header>
  );
}

export default Header;
