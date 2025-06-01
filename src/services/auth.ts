import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Mentor } from '../types';

export const registerTutor = async (
  email: string,
  password: string,
  userData: Omit<Mentor, 'uid' | 'email' | 'role' | 'createdAt' | 'updatedAt'>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const tutorData: Mentor = {
      uid: user.uid,
      email: user.email!,
      role: 'mentor',
      ...userData,
      rating: 0,
      sessionsCompleted: 0,
      skills: userData.skills || [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    await setDoc(doc(db, 'mentors', user.uid), tutorData);
    return tutorData;
  } catch (error: any) {
    console.error('Error registering tutor:', error);
    throw error;
  }
};

export const loginTutor = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const tutorDoc = await getDoc(doc(db, 'mentors', user.uid));
    
    if (!tutorDoc.exists()) {
      throw new Error('No tutor profile found');
    }

    const tutorData = tutorDoc.data() as Mentor;
    
    if (tutorData.role !== 'mentor') {
      throw new Error('This account is not registered as a tutor');
    }

    return tutorData;
  } catch (error: any) {
    console.error('Error logging in tutor:', error);
    throw error;
  }
};

export const googleTutorSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const tutorDoc = await getDoc(doc(db, 'mentors', user.uid));

    if (!tutorDoc.exists()) {
      // Create new tutor profile
      const tutorData: Mentor = {
        uid: user.uid,
        email: user.email!,
        role: 'mentor',
        name: user.displayName || '',
        profileImage: user.photoURL || undefined,
        skills: [],
        bio: '',
        rating: 0,
        sessionsCompleted: 0,
        yearsOfExperience: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(doc(db, 'mentors', user.uid), tutorData);
      return tutorData;
    }

    return tutorDoc.data() as Mentor;
  } catch (error: any) {
    console.error('Error with Google sign-in:', error);
    throw error;
  }
};
