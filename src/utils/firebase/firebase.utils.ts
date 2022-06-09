// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getAuth, 
    signInWithRedirect, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged, 
    User,
    NextOrObserver
} from 'firebase/auth'
import { 
    collection,
    writeBatch, 
    getFirestore, 
    doc, 
    getDoc,
    setDoc,
    query,
    getDocs,
    QueryDocumentSnapshot
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHf5xIA7fAxOuAYItsrUZEdHb2ysv1ZQ0",
  authDomain: "ramos-clothing-db.firebaseapp.com",
  projectId: "ramos-clothing-db",
  storageBucket: "ramos-clothing-db.appspot.com",
  messagingSenderId: "257496040850",
  appId: "1:257496040850:web:3b5e24291c28c942696d4b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(item => {
        const docRef = doc(collectionRef, item.title.toLowerCase());
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log('complete')
};   


export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const qSnapshot = await getDocs(q);
    return qSnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

export type AdditionalUserInfo = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (userAuth: User, additionalUserInfo = {} as AdditionalUserInfo): Promise<void | QueryDocumentSnapshot<UserData>>  => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalUserInfo,
            })
        } catch (e){
            console.error(e);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangeListener = (c: NextOrObserver<User>) => onAuthStateChanged(auth, c);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve,reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            },
            reject 
        )
    })
}
