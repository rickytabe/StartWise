// authContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signOut, 
  User,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { toast } from 'react-toastify';

interface AuthContextProps {
  user: User | null;
  userData: any | null;
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  loginwithEmail: (
    email: string,
    password: string,
  ) => Promise<{ user: any; role: string; } | undefined>
  registerLearner: (
    email: string, 
    password: string, 
    userData: Record<string, any>
  ) => Promise<void>;
  loginWithGoogle: (role: 'mentor' | 'mentee') => Promise<void>;
  updateUserData: (data: Partial<Record<string, any>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userData: null,
  isLoading: true,
  error: null,
  logout: async () => {},
  registerLearner: async () => {},
  loginWithGoogle: async () => {},
  loginwithEmail: async (_email: string, _password: string) => undefined,
  updateUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Renamed to isLoading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      try {
        setUser(currentUser);
        if (currentUser) {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.warn("User document not found for:", currentUser.uid);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
        toast.error("Failed to load user data");
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
      setUserData(null);
      setError(null);
      toast.info("You've been logged out");
    } catch (error: any) {
      console.error("Logout error:", error);
      setError(error.message || "Failed to logout");
      toast.error(error.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  const registerLearner = async (
    email: string, 
    password: string, 
    additionalData: Record<string, any>
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name if available
      if (additionalData.name) {
        await updateProfile(user, { displayName: additionalData.name });
      }

      const userDoc = {
        uid: user.uid,
        name: additionalData.name || user.displayName || "New User",
        email: user.email,
        role: 'mentee',
        phoneNumber: additionalData.phoneNumber || '',
        dob: additionalData.dob || '',
        sex: additionalData.sex || 'other',
        level: 'beginner',
        completedMentorships: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...additionalData
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      setUserData(userDoc);
      
      toast.success("Account created successfully!");
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Check both mentee and mentor collections
    const menteeDoc = await getDoc(doc(db, 'mentees', user.uid));
    const mentorDoc = await getDoc(doc(db, 'mentors', user.uid));
  
    if (menteeDoc.exists()) {
      return { user: menteeDoc.data(), role: 'mentee' };
    } else if (mentorDoc.exists()) {
      return { user: mentorDoc.data(), role: 'mentor' };
    }
  };

  const loginWithGoogle = async (role: 'mentor' | 'mentee' = 'mentee') => {
    try {
      setIsLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const newUser = {
          uid: user.uid,
          name: user.displayName || "Google User",
          email: user.email,
          role: role,
          level: 'beginner',
          completedMentorships: 0,
          profileImage: user.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        await setDoc(docRef, newUser);
        setUserData(newUser);
      } else {
        setUserData(docSnap.data());
      }
      toast.success(`Signed in with Google as ${role}`);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async (data: Partial<Record<string, any>>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Determine the collection based on user role
      const collection = userData?.role === 'mentor' ? 'mentors' : 'mentees';
      const userRef = doc(db, collection, user.uid);

      // Update the document with new data and timestamp
      await setDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update local state
      setUserData((prev: any) => ({
        ...prev,
        ...data,
        updatedAt: new Date()
      }));

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating user data:', error);
      const errorMessage = error.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase error message mapping
  const getFirebaseErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already in use. Please use a different email.";
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/weak-password":
        return "Password is too weak. It should be at least 6 characters.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      case "auth/too-many-requests":
        return "Too many requests. Please try again later.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was canceled.";
      case "auth/cancelled-popup-request":
        return "Only one Google sign-in request allowed at a time.";
      default:
        return "An authentication error occurred. Please try again.";
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData, 
      isLoading, 
      error,
      logout,
      registerLearner,
      loginWithGoogle,
      loginwithEmail: loginWithEmail,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};