import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCxXfO6WpDOzBXEaZTnXvFjZPAL66M_7_w",
    authDomain: "uppoint-8c867.firebaseapp.com",
    databaseURL: "https://uppoint-8c867-default-rtdb.firebaseio.com",
    projectId: "uppoint-8c867",
    storageBucket: "uppoint-8c867.appspot.com",
    messagingSenderId: "327377792442",
    appId: "1:327377792442:web:9dc5fe1110c616fb360183",
    measurementId: "G-S2MPVW8BHM"
  };


const firebaseapp = initializeApp(firebaseConfig)

const database = getFirestore(firebaseapp)

const auth = getAuth(firebaseapp)


export {auth,database}

