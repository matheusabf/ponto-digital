import React, { useState, useCallback } from 'react';
import { useUsuarios } from '../../banco/firebase'; // Ajuste o caminho conforme necessário
import './index.css';

const MeusDados = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para verificar se os dados foram carregados
  const { getUsuarioById, updateUsuario } = useUsuarios();
  const userId = sessionStorage.getItem('userId');

  // Função para carregar os dados do usuário
  const loadUserData = useCallback(async () => {
    try {
      if (userId && !dataLoaded) {
        const user = await getUsuarioById(userId);
        if (user) {
          setFormData({
            nome: user.NOME || '',
            email: user.EMAIL || '',
            telefone: user.TELEFONE || '',
          });
          setDataLoaded(true); // Marca os dados como carregados
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }, [userId, getUsuarioById, dataLoaded]);

  // Chama a função de carregamento de dados somente quando o componente é montado
  useState(() => {
    loadUserData();
  }, [loadUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await updateUsuario(userId, formData);
        alert('Dados atualizados!');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  return (
    <div className="meus-dados-container">
      <h1>Meus Dados</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default MeusDados;
