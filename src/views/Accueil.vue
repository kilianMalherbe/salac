<template>
    <div class="bg-[#1a1a1a] relative -top-16 z-0">
      <div class="max-w-7xl mx-auto relative py-4 md:py-8 lg:py-20">
          <div class="flex flex-col text-left pl-6 lg:pl-8">
              <h1 id="title" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-5 mt-24">Découvrez<br>Votre prochaine<br>Résidence</h1>
              <p class="text-[#727272] text-sm md:text-base lg:text-lg max-w-[35%]">Trouvez une variété de résidences vous correspondant aisaiment. Oubliez les difficultés de trouver une résidence pour vous</p>
              <SearchBar />
              <div class="flex mt-14 justify-between gap-6 flex-wrap max-w-[30%]">
                <div class="flex flex-col">
                  <p class="text-white text-2xl md:text-4xl lg:text-5xl">
                    {{ nbResidences }}
                    <span class="text-[#ec7722]">+</span>
                  </p>
                  <p class="text-[#727272] ">Résidences</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-white text-2xl md:text-4xl lg:text-5xl">
                    200
                    <span class="text-[#ec7722]">+</span>
                  </p>
                  <p class="text-[#727272]">Client Heureux</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-white text-2xl md:text-4xl lg:text-5xl">
                    28
                    <span class="text-[#ec7722]">+</span>
                  </p>
                  <p class="text-[#727272] flex-wrap">Prix décernées</p>
                </div>
              </div>
          </div>
          <img class="w-96 sm:w-[450px] md:w-[500px] lg:w-[600px] absolute -bottom-[98px] sm:-bottom-[114.5px] md:-bottom-[127.5px] lg:-bottom-[154px] right-2 sm:right-6 lg:right-8 -z-10" src="@/assets/img/residences.webp" alt="residences">
      </div>
    </div>
      <div class="flex py-20 justify-center gap-24 flex-wrap">
      <img class="w-24 lg:w-48" src="@/assets/img/partenaires/prologis.webp" alt="Prologis">
      <img class="w-32 lg:w-64" src="@/assets/img/partenaires/americain_tower.webp" alt="Americain Tower">
      <img class="w-24 lg:w-48" src="@/assets/img/partenaires/equinix.webp" alt="Equinix">
      <img class="w-32 lg:w-64" src="@/assets/img/partenaires/digital_reality.webp" alt="Digital Reality">
    </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import { db } from "@/main";

export default {
  components: { SearchBar },
  data() {
    return {
      nbResidences: 0
    };
  },
  created() {
    db.collection("residences")
      .get()
      .then((snapshot) => {
        snapshot.forEach(() => {
          this.nbResidences++;
        });
      });
  },
};
</script>

<style lang="scss">

#title {
    font-family: "GalanoGrotesqueAltSemiBold";
    position: relative;
    z-index: 0;

    &::after {
      content:"";
      position: absolute;
      top: 0;
      width: 24px;
      height: 24px;
      background-image: linear-gradient(60deg,#fc9848 0%, #e06008 100%);
      border-radius: 50%;
      z-index: -1;
    }
}
</style>