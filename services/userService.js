// services/userService.js
import { getAuth } from 'firebase/auth'; // Para obter o usuário logado
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'; // Para interagir com o Firestore
import { db } from '../firebaseConfig'; // Sua instância do Firestore

// Obtém os dados do usuário logado do Firebase Auth
export function getCurrentUserAuth() {
  const auth = getAuth();
  return auth.currentUser;
}

// Obtém o documento do usuário (para dados como telefone, foto, etc.)
export async function getUserProfile(userId) {
    const userRef = doc(db, "users", userId); // Referência ao documento na coleção 'users'
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Cria um documento básico se for o primeiro acesso
        await setDoc(userRef, { telefone: '', fotoUrl: '' });
        return { telefone: '', fotoUrl: '' };
    }
}

// Atualiza o documento do usuário
export async function updateProfile(userId, data) {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true }); // O merge: true só atualiza os campos fornecidos
}

export async function deleteUserProfile(userId) {
    try {
        const userRef = doc(db, "users", userId);
        await deleteDoc(userRef);
        console.log("Documento do usuário excluído do Firestore.");
        return true;
    } catch (error) {
        console.error("Erro ao excluir perfil do Firestore:", error);
        throw new Error("Falha ao excluir dados de perfil.");
    }
}