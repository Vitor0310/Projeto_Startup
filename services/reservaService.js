// services/reservaService.js
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const reservasCollection = collection(db, "reservas");

// Funções mock de teste (REMOVIDAS)

// FUNÇÃO ATUALIZADA: Agora busca o histórico de reservas de um usuário NO FIRESTORE
export async function getReservasByUser(userId) {
  try {
    // 1. Cria a consulta (query) para buscar documentos onde 'userId' é igual ao ID do usuário logado
    const q = query(reservasCollection, where("userId", "==", userId));
    
    // 2. Executa a consulta
    const querySnapshot = await getDocs(q);
    
    // 3. Mapeia os documentos para um formato de lista JS
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

// Função para criar uma reserva no Firestore (já implementada e correta)
export async function createReserva(reservaData) {
  try {
    // O addDoc envia o objeto da reserva para a coleção 'reservas'
    const docRef = await addDoc(reservasCollection, reservaData);
    console.log("Reserva registrada com ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Erro ao criar reserva: ", e);
    throw new Error("Falha ao registrar reserva.");
  }
}