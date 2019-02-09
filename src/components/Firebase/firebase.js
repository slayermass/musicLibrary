import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_EAZYUP_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_EAZYUP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_EAZYUP_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_EAZYUP_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_EAZYUP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_EAZYUP_MESSAGINGSENDERID
};

export class FirebaseClass {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.dbStore = app.firestore();
    this.functions = app.functions();
    this.storage = app.storage();
    
    const settings = { timestampsInSnapshots: true };
    this.dbStore.settings(settings);
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
  
  reviews = () => this.dbStore.collection('reviews');
  
  projectStorage = (projectName, fileName) => this.storage.ref(`projects/${projectName}/${fileName}`);
}

export const Firebase = () => {
  if (Firebase.c) return Firebase.c;
  return Firebase.c = new FirebaseClass();
};
