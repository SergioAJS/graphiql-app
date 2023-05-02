import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  AuthError,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentSnapshot,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';

export type UserData = {
  displayName: string;
  email: string;
  createdAt: Date;
};

export type AdditionalInformation = {
  displayName?: string;
  lastName?: string;
  readonly email?: string;
  readonly createdAt?: Timestamp;
};

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDU99L5N3jM30koiaFpja--9bExctqvHZ4',
  authDomain: 'graphiql-app-rsschool.firebaseapp.com',
  projectId: 'graphiql-app-rsschool',
  storageBucket: 'graphiql-app-rsschool.appspot.com',
  messagingSenderId: '812165942457',
  appId: '1:812165942457:web:1248b6d49677fb2a759f68',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();

export const createUserDocFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | DocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userExist = userSnapshot.exists();

  if (!userExist) {
    const { displayName, email } = userAuth;
    const createdAt = Timestamp.fromDate(new Date());

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      if (error instanceof Error) console.log('error creating user', error.message);
    }
  }

  return userSnapshot as DocumentSnapshot<UserData>;
};

export const getUserDocFromAuth = async (userAuth: User): Promise<void | DocumentData> => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data();
};

export const createAuthUserWithEmailAndPass = async (email: string, password: string) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPass = async (email: string, password: string) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
