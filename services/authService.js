// services/authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";

export async function registerUser(email, password) {
  const user = { email, password };
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function loginUser(email, password) {
  const stored = await AsyncStorage.getItem(USER_KEY);
  if (!stored) return null;

  const user = JSON.parse(stored);
  if (user.email === email && user.password === password) {
    return user;
  }
  return null;
}

// Mock do login com Google
export async function loginWithGoogle() {
  const googleUser = { email: "user@gmail.com", provider: "google" };
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(googleUser));
  return googleUser;
}

export async function getUser() {
  const stored = await AsyncStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export async function logoutUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
