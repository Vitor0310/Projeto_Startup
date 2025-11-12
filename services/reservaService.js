// services/reservaService.js
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const reservasCollection = collection(db, "reservas");

// Função para buscar o histórico de reservas de um usuário (Locatário)
export async function getReservasByUser(userId) {
  try {
    const q = query(reservasCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const reservas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return reservas;
  } catch (error) {
    console.error("Erro ao buscar reservas: ", error);
    return [];
  }
}

// --- FUNÇÃO QUE ESTAVA FALTANDO ---
// Função para buscar reservas PELO DONO DA VAGA (Locador)
export async function getReservasByOwner(locadorId) {
  try {
    const q = query(reservasCollection, where("locadorId", "==", locadorId));
    const querySnapshot = await getDocs(q);

    const reservas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return reservas;
  } catch (error) {
    console.error("Erro ao buscar reservas do locador: ", error);
    return [];
  }
}
// --- FIM DA FUNÇÃO QUE FALTAVA ---

// Função para criar uma reserva no Firestore
export async function createReserva(reservaData) {
  try {
    const docRef = await addDoc(reservasCollection, reservaData);
    console.log("Reserva registrada com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao criar reserva: ", e);
    throw new Error("Falha ao registrar reserva.");
  }
}

// Função para buscar TODAS as reservas (para o Dashboard)
export async function getAllReservas() {
  try {
    const querySnapshot = await getDocs(reservasCollection);
    const reservas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return reservas;
  } catch (error) {
    console.error("Erro ao buscar TODAS as reservas: ", error);
    return [];
  }
}

// Função para atualizar o status de uma reserva
export async function updateReservaStatus(reservaId, newStatus) {
  try {
    const reservaRef = doc(db, "reservas", reservaId);
    await updateDoc(reservaRef, {
      status: newStatus
    });
    return true;
  } catch (e) {
    console.error("Erro ao atualizar status da reserva: ", e);
    throw new Error("Falha ao atualizar reserva.");
  }
}