import {React, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import FolhaDePonto from '../../components/FolhaDePonto';
import Relatorio from '../../components/Relatorio';
import MeusDados from '../../components/MeusDados';
import './index.css';

function Home() {

  return (
    <div className="home-container">
      <main>
        <Routes>
          <Route path="relatorio" element={<Relatorio />} />
          <Route path="registrar-ponto" element={<FolhaDePonto />} />
          <Route path="meus-dados" element={<MeusDados />} />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
