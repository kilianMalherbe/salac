<template>
  <div class="flex flex-col p-3 box-content bg-white rounded-[12px] outline outline-offset-0 outline-4 outline-white/40 overflow-hidden mt-6 w-1/2">
    <div class="flex justify-between items-center sm:h-8 md:h-12 lg:h-12 ">
        <img class="object-contain w-6 mx-3" src="@/assets/img/location.webp" alt="search">
        <input class="outline-none w-full h-full text-lg truncate mx-3" type="text" name="search" id="search" placeholder="Chercher une résidence" v-model="searchQuery">
        <button id="btnSearch" class="text-white px-2 md:px-6 bg-[#3050ce] rounded-[8px] font-medium h-full"><span>Rechercher</span></button>
    </div>
    <div v-show="searchQuery != '' && searchQuery.length >=3">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="residence in searchedResidences" :key="residence.id">
          <router-link :to="{ name: 'Residence', params: { idResidence: residence.id }}" aria-current="page" class="block hover:bg-gray-50">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-md" :src="residence.urlPhoto" alt="" />
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p class="text-lg font-medium text-gray-900 truncate">{{ residence.nom }}</p>
                    <p class="mt-2 flex items-center text-sm text-gray-600">
                      <span class="truncate">{{ residence.ville }} | {{ residence.standing }}</span>
                      <StarIcon class="flex-shrink-0 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { StarIcon } from "@heroicons/vue/outline";
import firebase from "firebase";

export default {
  components: {
    StarIcon
  },
  setup() {
    const residences = reactive([]);
    const searchQuery = ref("");

    const searchedResidences = computed(() => residences.filter((residence) => (
      residence.nom
        .toLowerCase()
        .indexOf(searchQuery.value.toLowerCase()) !== -1
    )));

    onMounted(async () => {
      try {
        const residencesInstant = await firebase
          .firestore()
          .collection("residences")
          .get();
        residencesInstant.forEach((doc) => {
          residences.push({ ...doc.data(), id: doc.id});
        });
      } catch (e) {
        console.log("Erreur lors du chargement des résidences");
      }
    });
    return { searchedResidences, searchQuery };
  },
};
</script>

<style lang="scss">
  #btnSearch {
    box-shadow: 0px 22px 21px -12px #2444c280;
    transition: ease-in-out 300ms;
    position: relative;

    span {
      display: inline-block;
      position: relative;
      transition: padding-left 300ms ease-in-out;

      &::before {
        content: "\e8b6";
        font-family: "Material Icons";
        display: inline-block;
        position: absolute;
        left: -4rem;
        opacity: 0;
        transition: left 300ms ease-in-out, opacity 200ms ease-in-out;
      }
    }

    &:hover span {
      padding-left: 20px;

      &::before {
        left: -5px;
        opacity: 1;
      }
    }
  }
</style>