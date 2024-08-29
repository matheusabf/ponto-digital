import {React, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import FolhaDePonto from '../../components/FolhaDePonto';
import Relatorio from '../../components/Relatorio';
import MeusDados from '../../components/MeusDados';
import './index.css';


import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore"; // pega aplicação e repassa pro getFirestore e permite conectar no banco

function Home() {
  
const firebaseApp = initializeApp ({
  apiKey: "AIzaSyBKYm2pJva7-Ne-EfsJna4EnSaFoZdoYws",
  authDomain: "ponto-digital-f3f65.firebaseapp.com",
  projectId: "ponto-digital-f3f65",
});

const [NOME, setNome] = useState("");
const [EMAIL, setEmail] = useState("");
const [CPF, setCpf] = useState("");
const [LOGIN, setLogin] = useState("");
const [SENNHA, setSenha] = useState("");
const [USUARIOS, setUsuarios] = useState("");

const db = getFirestore(firebaseApp);
const userCollectionRef = collection(db, 'USUARIOS');

useEffect(() => {
  const getUSUARIOS = async () => {
    const data = await getDocs(userCollectionRef)
    setUsuarios(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };
  getUSUARIOS();
}, [])
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
