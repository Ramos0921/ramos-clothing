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
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(item => {
        const docRef = doc(collectionRef, item.title.toLowerCase());
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log('complete')
};   

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const qSnapshot = await getDocs(q);
    return qSnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalUserInfo = {}) => {
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
            console.error(e.message);
        }
    }
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (c) => onAuthStateChanged(auth, c);

export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            },
            reject 
        )
    })
}
