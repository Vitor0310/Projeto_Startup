// services/authService.js (AGORA COM FIREBASE AUTH REAL)
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

// A função de registro agora usa o Firebase Auth
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Retorna o objeto User do Firebase (com o UID real!)
    } catch (error) {
        console.error("Firebase Registration Error:", error.code);
        // Tratamento básico de erros comuns de cadastro
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("Este e-mail já está cadastrado.");
        } else if (error.code === 'auth/weak-password') {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }
        throw new Error("Falha ao registrar usuário.");
    }
}

// A função de login agora usa o Firebase Auth
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Retorna o objeto User do Firebase
    } catch (error) {
        console.error("Firebase Login Error:", error.code);
        if (error.code === 'auth/invalid-credential') { // Novo código de erro para credenciais inválidas (Firebase v9+)
             throw new Error("E-mail ou senha inválidos.");
        }
        throw new Error("Falha ao fazer login.");
    }
}

// A função de logout agora usa o Firebase Auth
export async function logoutUser() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error("Firebase Logout Error:", error);
        throw new Error("Falha ao fazer logout.");
    }
}

export async function changePassword(currentPassword, newPassword) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Nenhum usuário logado.");
    }
    
    // 1. Cria uma credencial para reautenticação
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    
    try {
        // 2. Reautentica o usuário com a senha atual (obrigatório pelo Firebase)
        await reauthenticateWithCredential(user, credential);
        
        // 3. Atualiza a senha
        await updatePassword(user, newPassword);
        return true;
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            throw new Error("Senha atual incorreta.");
        }
        if (error.code === 'auth/weak-password') {
            throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
        }
        if (error.code === 'auth/requires-recent-login') {
            throw new Error("Sua sessão expirou. Por favor, faça login novamente.");
        }
        console.error("Erro ao trocar senha:", error);
        throw new Error("Falha ao trocar senha. Tente novamente.");
    }
}

// Para obter o usuário logado em qualquer lugar do app
export function getCurrentUser() {
    return auth.currentUser;
}

// FUNÇÃO ATUALIZADA: Agora recebe a senha para reautenticar antes de deletar
export async function deleteCurrentUserWithReauth(currentPassword) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Nenhum usuário logado.");
    }
    
    // 1. Cria uma credencial para reautenticação
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    
    try {
        // 2. Reautentica o usuário (garante que a sessão é válida)
        await reauthenticateWithCredential(user, credential);
        
        // 3. Exclui o usuário (só roda se a reautenticação acima for bem-sucedida)
        await deleteUser(user);
        
        return true;
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            throw new Error("Senha atual incorreta. Não foi possível excluir a conta.");
        }
        console.error("Erro ao excluir usuário do Auth:", error);
        throw new Error("Falha ao excluir conta. Verifique sua senha e tente novamente.");
    }
}