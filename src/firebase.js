import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// firebase config after setting up app
const firebaseConfig = {
  apiKey: "AIzaSyB595wQxeeAWBOnerX3qGHNNfzZDc1D79E",
  authDomain: "whatsapp-clone-4d465.firebaseapp.com",
  projectId: "whatsapp-clone-4d465",
  storageBucket: "whatsapp-clone-4d465.appspot.com",
  messagingSenderId: "715383019028",
  appId: "1:715383019028:web:21cf635e99fc2744cc3901",
  measurementId: "G-1NB92RJS54"
};

// initialize app to use functions of firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// get basic  functions of firebase, db auth, google-auth ...
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const googleAuth = new firebase.auth.GoogleAuthProvider()

export { auth, googleAuth };
export default db;