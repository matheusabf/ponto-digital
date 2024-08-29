import React, { useState, useEffect } from 'react';
import './index.css'; 

const PopupRegistro = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(timer); 
  }, []);

  if (!isOpen) return null;

  const handleMarkPoint = () => {
    alert(`Ponto marcado às ${currentTime.toLocaleTimeString()}`);
    onClose(); 
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Horário Atual</h2>
        <p>{currentTime.toLocaleTimeString()}</p>
        <button onClick={handleMarkPoint}>Marcar Ponto</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default PopupRegistro;
