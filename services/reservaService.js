// services/reservaService.js
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
// Você pode adicionar addDoc, updateDoc para criar e finalizar reservas futuramente

const reservasCollection = collection(db, "reservas");

// Funções mock de teste (você precisará criar a coleção 'reservas' no Firebase)
const mockReservas = [
  { id: 'res1', vagaNome: 'Vaga Perto do Shopping', data: '2025-11-01', status: 'Concluída' },
  { id: 'res2', vagaNome: 'Garagem no Centro', data: '2025-11-05', status: 'Cancelada' },
];

// Função para buscar o histórico de reservas de um usuário (mock por enquanto)
export async function getReservasByUser(userId) {
  // Em um app real, você faria uma consulta filtrada:
  // const q = query(reservasCollection, where("userId", "==", userId));
  // const querySnapshot = await getDocs(q);
  // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Por enquanto, retorna o mock para não exigir login real
  return mockReservas; 
}