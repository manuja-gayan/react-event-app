import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const fbAdmin = firebase.initializeApp(config, 'Secondary'); // Intialise "fbAdmin" as instance named "Secondary".
export default firebase;
