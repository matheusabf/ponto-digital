import React, { useState } from 'react';
import './index.css';

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

const Relatorio = () => {
  const [mes, setMes] = useState(meses[0]);
  const [ano, setAno] = useState(anos[0]);

  const handleMesChange = (e) => setMes(e.target.value);
  const handleAnoChange = (e) => setAno(e.target.value);

  const gerarRelatorio = () => {
    alert(`Gerando relatório para ${mes} ${ano}`);
    // Adicione aqui a lógica para gerar o relatório
  };

  return (
    <div className="relatorio-container">
      <h1>Relatório do Mês</h1>
      <div className="form-group">
        <label htmlFor="mes">Mês:</label>
        <select id="mes" value={mes} onChange={handleMesChange}>
          {meses.map((mês, index) => (
            <option key={index} value={mês}>{mês}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ano">Ano:</label>
        <select id="ano" value={ano} onChange={handleAnoChange}>
          {anos.map((ano, index) => (
            <option key={index} value={ano}>{ano}</option>
          ))}
        </select>
      </div>
      <button onClick={gerarRelatorio}>Gerar Relatório</button>
    </div>
  );
};

export default Relatorio;
