<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Modifier votre compte
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

    <form class="space-y-6" @submit.prevent="submit">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Prénom et Nom
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  type="text"
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  v-model="form.name"
                />
              </div>
            </div>
            <div>
              <label
                for="avatar"
                class="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div class="mt-1">
                <input
                  id="avatar"
                  name="avatar"
                  type="text"
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  v-model="form.avatar"
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  v-model="form.email"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    focus:outline-none
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  v-model="form.password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="
                  w-full
                  flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Enregistrer
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        avatar: firebase.auth().currentUser.photoURL,
        password: "",
      },
    };
  },
  methods: {
    submit(){
      const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.form.name,
        photoURL: this.form.avatar
      }).then(() => {
        // Update successful
        alert("Le Prénom/Nom à été mis à jour avec succès.");
        // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        // An error occurred
        // ...
      });

      user.updateEmail(this.form.email).then(() => {
        // Update successful
        alert("L'adresse e-mail à été mise à jour avec succès.");
        // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        // An error occurred
        // ...
      });

      user.updatePassword(this.form.password).then(() => {
        // Update successful.
        alert("Le mot de passe à été mis à jour avec succès, veuillez vous reconnecter.");
        this.$router.push("/login");
        // eslint-disable-next-line no-unused-vars
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    },
  },
  mounted() {
    //  document.getElementById("name").value(user.data.displayName);
    //  document.getElementById("email").value(user.data.email);
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>