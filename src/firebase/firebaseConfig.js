import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = { //Dev-Prod
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,

};


// if( process.env.NODE_ENV === 'test'){ // Dependiendo del entorno se usarán una u otra configuración.
//     // testing
//     firebase.initializeApp(firebaseConfigTesting)

// }else{
//     // dev/prod
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore(); // Referencia a la base de datos
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // Referencia a nuestro proveedor de autenticación de google

  export {
      db,
      googleAuthProvider,
      firebase
  }