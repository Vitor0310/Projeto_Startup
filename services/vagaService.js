// services/vagaService.js
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

const vagasCollection = collection(db, "vagas");

export async function getAllVagas() {
  try {
    const querySnapshot = await getDocs(vagasCollection);
    const vagas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return vagas;
  } catch (error) {
    console.error("Erro ao buscar vagas: ", error);
    return [];
  }
}

export async function getVagaById(id) {
  try {
    const docRef = doc(db, "vagas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("Nenhuma vaga encontrada com o ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar vaga por ID: ", error);
    return null;
  }
}

export async function createVaga(vagaData) {
  try {
    const vagasCollection = collection(db, "vagas");
    // O addDoc envia o objeto da vaga para o Firebase e retorna uma referência
    const docRef = await addDoc(vagasCollection, vagaData);
    console.log("Documento escrito com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
    throw new Error("Falha ao cadastrar vaga.");
  }
}