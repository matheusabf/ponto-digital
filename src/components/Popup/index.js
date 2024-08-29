import './index.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuarios } from '../../banco/firebase'; // Ajuste o caminho do import conforme necessário

function Popup({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login e registro
  const [login, setLogin] = useState(''); // Alterado para 'login' ao invés de 'username'
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Estado para o nome do usuário
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();
  const { getUsuario, registerUsuario } = useUsuarios();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const usuarios = await getUsuario(login, password);
      if (usuarios.length > 0) {
        const usuario = usuarios[0]; // Supondo que você quer o primeiro usuário da lista
        sessionStorage.setItem('autenticado', 'true');
        sessionStorage.setItem('userId', usuario.id); // Armazena o ID do usuário no sessionStorage
        sessionStorage.setItem('nome', usuario.NOME); // Armazena o nome do usuário no sessionStorage
        navigate('/registrar-ponto');
        onClose();
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login');
    }
  };

  const handleRegister = async () => {
    try {
      await registerUsuario(login, name, password, email, cpf); // Usa 'login' como login e 'name' como nome
      alert('Usuário registrado com sucesso');
      setLogin('');
      setPassword('');
      setName('');
      setEmail('');
      setCpf('');
      setIsRegister(false); // Volta para a tela de login após registro
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Erro ao registrar usuário');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h1>{isRegister ? 'Registrar' : 'Login'}</h1>
        {isRegister ? (
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="popup-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="popup-input"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="popup-input"
            />
            <button onClick={handleRegister} className="popup-button">Registrar</button>
            <p>Já tem uma conta? <span onClick={() => setIsRegister(false)}>Faça login</span></p>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
            <p>Não tem uma conta? <span onClick={() => setIsRegister(true)}>Registre-se</span></p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Popup;
