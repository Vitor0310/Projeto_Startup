// services/authService.js (AGORA COM FIREBASE AUTH REAL)
import { auth } from "../firebaseConfig";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";

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

// Para obter o usuário logado em qualquer lugar do app
export function getCurrentUser() {
    return auth.currentUser;
}