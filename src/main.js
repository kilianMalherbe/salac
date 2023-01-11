import "firebase/firestore";
import "./index.css";
import App from "./App.vue";
import { createApp } from "vue";
import firebase from "firebase/app";
// eslint-disable-next-line sort-imports
import "firebase/auth";
import { firebaseConfig } from "../firebase-config.js";
import router from "./router";
import { store } from "./store";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

createApp(App).use(router).use(store).mount("#app");
