import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: () =>
      import("@/views/Accueil.vue"),
  },
  {
    path: "/Residence",
    name: "Residence",
    component: () =>
      import("@/views/Residence.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("@/views/About.vue")
  },
  {
    path: "/login",
    name: "Connexion",
    component: () =>
      import("@/views/Login.vue")
  },
  {
    path: "/signup",
    name: "Inscription",
    component: () =>
      import("@/views/Signup.vue")
  },
  {
    path: "/forgot-password",
    name: "Mot de passe oublié",
    component: () =>
      import("@/views/ForgotPassword.vue")
  },
  {
    path: "/profile",
    name: "ShowProfile",
    component: () =>
      import("@/views/ShowProfile.vue")
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: () =>
      import("@/views/EditProfile.vue")
  },
  {
    path: "/residence",
    name: "Residence",
    component: () =>
      import("@/views/Residence.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
