import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

// Firebase dev config
const prodConfig = {
    apiKey: "AIzaSyCkVyyMw60AuU7Jt7wPOmecopBrk9D9sb4",
    authDomain: "todo-47720.firebaseapp.com",
    databaseURL: "https://todo-47720.firebaseio.com",
    projectId: "todo-47720",
    storageBucket: "todo-47720.appspot.com",
    messagingSenderId: "380211994548"
};

const devConfig = {
    apiKey: "AIzaSyCkVyyMw60AuU7Jt7wPOmecopBrk9D9sb4",
    authDomain: "todo-47720.firebaseapp.com",
    databaseURL: "https://todo-47720.firebaseio.com",
    projectId: "todo-47720",
    storageBucket: "todo-47720.appspot.com",
    messagingSenderId: "380211994548"
};

// Use different key depending on evironment (prod or dev)
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Firebase database call
const database = firebase.database();


export {
    database,
};