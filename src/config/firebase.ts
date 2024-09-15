// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDUZVT3taNsRuz8hHs0JO6omRtmZ_H2CHA",
  authDomain: "fu-booking-room.firebaseapp.com",
  projectId: "fu-booking-room",
  storageBucket: "fu-booking-room.appspot.com",
  messagingSenderId: "65723309789",
  appId: "1:65723309789:web:4a652918c2fa95a662c534",
  measurementId: "G-7WFDQTWCVF",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
