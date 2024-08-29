import React, { useState } from 'react';
import './index.css'; 
import Popup from '../PopupRegistro';

const diasDoMes = Array.from({ length: 30 }, (_, i) => i + 1);
const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const calcularDiaDaSemana = (dia) => {
  const data = new Date(2024, 7, dia);
  return diasDaSemana[data.getDay()];
};

const FolhaDePonto = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return (
    <div className="folhaponto">
      <h1>Folha de Ponto</h1>
      <button onClick={openPopup}>Registrar Ponto</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Dia da Semana</th>
              <th>Entrada P1</th>
              <th>Entrada P2</th>
              <th>Entrada P3</th>
              <th>Entrada P4</th>
              <th>Total Trabalhado</th>
              <th>Carga Horária</th>
              <th>Atrasos/Faltas</th>
              <th>Horas Extras</th>
            </tr>
          </thead>
          <tbody>
            {diasDoMes.map((dia) => (
              <tr key={dia}>
                <td>{dia}</td>
                <td>{calcularDiaDaSemana(dia)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FolhaDePonto;
