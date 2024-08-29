import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { useUsuarios } from '../../banco/firebase';
import Popup from '../Popup';

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [loginError, setLoginError] = useState('');
  const { loading, error, getUsuario, getUsuarioById } = useUsuarios();
  const navigate = useNavigate();
  const id = sessionStorage.getItem('userId'); // Armazenar ID do usuário no sessionStorage
  const autenticado = sessionStorage.getItem('autenticado') === 'true';

  // Função para buscar e definir o usuário atual
  const fetchUsuarioAtual = useCallback(async () => {
    if (id) {
      try {
        const usuario = await getUsuarioById(id);
        setUsuarioAtual(usuario);
      } catch (error) {
        console.error('Erro ao buscar usuário atual:', error);
      }
    }
  }, [id, getUsuarioById]);

  // Chama fetchUsuarioAtual somente quando necessário
  if (autenticado && !usuarioAtual) {
    fetchUsuarioAtual();
  }

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const handleClick = () => {
    navigate('/login/');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('autenticado');
    sessionStorage.removeItem('userId'); // Remover ID do usuário ao deslogar
    setUsuarioAtual(null);
    navigate('/login');
  };

  const handleLogin = async (login, senha) => {
    try {
      const usuarios = await getUsuario(login, senha);
      if (usuarios.length > 0) {
        const usuario = usuarios[0]; // Supondo que você queira o primeiro usuário da lista
        sessionStorage.setItem('autenticado', 'true');
        sessionStorage.setItem('userId', usuario.id); // Armazenar ID do usuário no sessionStorage
        setUsuarioAtual(usuario);
        closePopup();
      } else {
        setLoginError('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginError('Erro ao fazer login');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          <p>Bem-vindo(a), {usuarioAtual ? usuarioAtual.NOME : 'Usuário'}
            <br />
            <a onClick={handleLogout}>Deslogar-se</a>
          </p>
        ) : (
          <>
            <span onClick={openPopup}>Fazer Login</span>
            <Popup isOpen={isPopupOpen} onClose={closePopup} onLogin={handleLogin} />
            {loginError && <p>{loginError}</p>}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
