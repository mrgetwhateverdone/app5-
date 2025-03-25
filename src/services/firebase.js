// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgqtq-A39ERYhgJP3pnS8BSpHp-e2oNhI",
  authDomain: "nextt10gen.firebaseapp.com",
  projectId: "nextt10gen",
  storageBucket: "nextt10gen.appspot.com",
  messagingSenderId: "723919493861",
  appId: "1:723919493861:web:efd8f163a5cd7f1543d20c",
  measurementId: "G-4H91J4RG71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// User profile functions
export const createUserProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, "userProfiles", userId), {
      ...profileData,
      createdAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, "userProfiles", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { profile: docSnap.data(), error: null };
    } else {
      return { profile: null, error: "Profile not found" };
    }
  } catch (error) {
    return { profile: null, error: error.message };
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, "userProfiles", userId);
    await updateDoc(userRef, profileData);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Workout functions
export const saveWorkoutPlan = async (userId, workoutPlan) => {
  try {
    await setDoc(doc(db, "workoutPlans", userId), {
      plan: workoutPlan,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getWorkoutPlan = async (userId) => {
  try {
    const docRef = doc(db, "workoutPlans", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { plan: docSnap.data().plan, error: null };
    } else {
      return { plan: null, error: "Workout plan not found" };
    }
  } catch (error) {
    return { plan: null, error: error.message };
  }
};

// Workout tracking functions
export const saveWorkoutSession = async (userId, workoutData) => {
  try {
    const result = await addDoc(collection(db, "workoutSessions"), {
      userId,
      workoutData,
      completedAt: Timestamp.now()
    });
    return { id: result.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const getWorkoutHistory = async (userId) => {
  try {
    const q = query(
      collection(db, "workoutSessions"), 
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { sessions, error: null };
  } catch (error) {
    return { sessions: [], error: error.message };
  }
};

export { auth, db }; 