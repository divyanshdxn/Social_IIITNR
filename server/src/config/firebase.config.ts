import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { envConfig } from "./env.config";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: envConfig.firebase.apiKey,
  authDomain: envConfig.firebase.authDomain,
  databaseURL: envConfig.firebase.databaseURL,
  storageBucket: envConfig.firebase.storageBucket
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);