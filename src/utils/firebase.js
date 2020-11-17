import firebase from "firebase/app";
   let firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "community-fc578.firebaseapp.com",
    databaseURL: "https://community-fc578.firebaseio.com",
    projectId: "community-fc578",
    storageBucket: "community-fc578.appspot.com",
    messagingSenderId: "441624182448",
    appId: "1:441624182448:web:fbd4caeed85da4b04cc575",
      measurementId: "G-23G3KFPWX3",
  
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase