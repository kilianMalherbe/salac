<template>
  <div class="vue-template">
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Mot de passe oublié
        </h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="forgetPassword">
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
                  autocomplete="email"
                  required=""
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
                  v-model="user.email"
                />
              </div>
            </div>

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
              Réinitialiser le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert(
            "Vérifiez la boîte mail enregistrée pour réinitialiser le mot de passe!"
          );
          this.user = {
            email: "",
          };
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
