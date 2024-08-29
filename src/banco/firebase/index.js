import { useState, useEffect } from 'react';
import { getFirestore, getDocs, collection, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBKYm2pJva7-Ne-EfsJna4EnSaFoZdoYws",
  authDomain: "ponto-digital-f3f65.firebaseapp.com",
  projectId: "ponto-digital-f3f65",
});

const db = getFirestore(firebaseApp);
const userCollectionRef = collection(db, 'USUARIOS');

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        console.log("Fetching users...");
        const data = await getDocs(userCollectionRef);
        const usuariosList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Data received:", usuariosList);
        setUsuarios(usuariosList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const getUsuario = async (login, senha) => {
    const q = query(
      userCollectionRef,
      where('LOGIN', '==', login),
      where('SENHA', '==', senha)
    );

    try {
      const querySnapshot = await getDocs(q);
      const usuariosList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return usuariosList;
    } catch (error) {
      console.error("Error fetching user by login and password:", error);
      throw error;
    }
  };

  const registerUsuario = async (login, nome, senha, email, cpf) => {
    try {
      await setDoc(doc(db, 'USUARIOS', login), { LOGIN: login, NOME: nome, SENHA: senha, EMAIL: email, CPF: cpf });
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const getUsuarioById = async (id) => {
    const userDocRef = doc(db, 'USUARIOS', id);
    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        return { ...docSnapshot.data(), id: docSnapshot.id };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };

  return { usuarios, loading, error, getUsuario, registerUsuario, getUsuarioById };
}
