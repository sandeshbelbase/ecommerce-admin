// export const firebaseConfig = {
//   apiKey: "AIzaSyBop2JIVHPwFltjWtlVOaDeAEbhXx3uW5I",
//   authDomain: "vithoba-trading-nepal.firebaseapp.com",
//   projectId: "vithoba-trading-nepal",
//   storageBucket: "vithoba-trading-nepal.appspot.com",
//   messagingSenderId: "700990737362",
//   appId: "1:700990737362:web:d110116f1323ffd245d60b",
//   measurementId: "G-XLGCR7YGKW",
// };

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
