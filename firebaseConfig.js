// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Importações de Autenticação
import { 
    getAuth, 
    initializeAuth, // <- Usado para configurar a persistência
    getReactNativePersistence 
} from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // <- Importando o AsyncStorage

// Suas credenciais do Firebase
const firebaseConfig = {
  // ATENÇÃO: COLOQUE SUAS CHAVES AQUI
  apiKey: "AIzaSyCUZBJ9ZyHPPx83A5s1vvgeIbc7xvip6ak",
  authDomain: "vagaja-327e8.firebaseapp.com",
  projectId:"vagaja-327e8",
  // ... (o restante das suas chaves)
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize a autenticação com Persistência (essa linha resolve o WARN)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Usa o AsyncStorage para persistir o login
});

// Inicialize os serviços do Firebase que você vai usar
export const db = getFirestore(app);
export { auth }; // Exporta o auth configurado para as outras telas