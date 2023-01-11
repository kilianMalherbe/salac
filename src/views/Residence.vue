<template>
<!-- commentaire -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css">
  <div class="bg-white">
    <div class="pt-6 text-left">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
            <div class="flex items-center">
              <router-link to="/" class="mr-2 text-sm font-medium text-gray-900">
                Résidence
              </router-link>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <router-link :to="{ name: 'Residence', params: { idResidence: this.$route.params.idResidence }}" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">
              {{ this.nomResidence }}
            </router-link>
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
          <img :src="this.UrlPhotoResidence" alt="" class="w-full h-full object-center object-cover" />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img :src="this.UrlPhotoResidence" alt="" class="w-full h-full object-center object-cover" />
          </div>
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img :src="this.UrlPhotoResidence" alt="" class="w-full h-full object-center object-cover" />
          </div>
        </div>
        <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
          <img :src="this.UrlPhotoResidence" alt="" class="w-full h-full object-center object-cover" />
        </div>
      </div>

      <!-- Product info -->
      <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {{ this.nomResidence }}
          </h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <h2 class="sr-only">Tarif</h2>
          <p class="text-3xl text-gray-900">{{ this.tarifResidence }} €</p>

          <!-- Reviews -->
          <div class="mt-4 lg:mt-0 lg:row-span-3">
            <h3 class="sr-only">Standing</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon v-for="standing in [0, 1, 2, 3, 4]" :key="standing" :class="[this.standingResidence > standing ? 'text-gray-900' : 'hidden', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
            </div>
            <div id="map" style="width: 420px; height: 120px;"></div>
          </div>
          <button type="submit" class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Contactez-nous</button>
        </div>

        <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Adresse</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">{{ this.rueResidence + ' - ' + this.cpResidence + ' ' + this.villeResidence }}</p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Caractéristiques</h3>

            <div class="mt-4">
              <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                <li key="highlight" class="text-gray-400">
                  <span class="text-gray-600">{{ this.ascenseurResidence === true ? 'Présence d\'un ascenseur' : 'Pas d\'ascenseur' }}</span>
                </li>
                <li key="highlight" class="text-gray-400">
                  <span class="text-gray-600">{{ this.parkingResidence === true ? 'Présence d\'un parking' : 'Pas de parking' }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Description</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">{{ this.descriptionResidence ? this.descriptionResidence : 'Pas de description' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OSM, Vector as VectorSource } from 'ol/source';
import { ScaleLine, defaults as defaultControls } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from "ol/Map";
import { StarIcon } from '@heroicons/vue/solid';
import View from "ol/View";
import { db } from "@/main";

export default {
  components: {
    StarIcon,
  },
  mounted() {
    this.getResidenceById(this.$route.params.idResidence).then((data)=>{
      // data is the returned value from the getFromDatabase function
      this.UrlPhotoResidence = data.urlPhoto;
      this.ascenseurResidence = data.ascenseur;
      this.cpResidence = data.cp;
      this.descriptionResidence = data.description;
      this.nomResidence = data.nom;
      this.parkingResidence = data.parking;
      this.rueResidence = data.rue;
      this.standingResidence = data.standing;
      this.tarifResidence = data.tarif;
      this.villeResidence = data.ville;
    });
    this.initiateMap();
  },
  data() {
    return {
      UrlPhotoResidence: "",
      ascenseurResidence: false,
      cpResidence: "",
      descriptionResidence: "",
      nomResidence: "",
      numResidence: 0,
      parkingResidence: false,
      rueResidence: "",
      standingResidence: "",
      tarifResidence: 0,
      villeResidence: "",
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159]
    };
  },
  methods: {
    getResidenceById: async function(id) {
      const query = await db.collection('residences').doc(id).get();
      if (!query.empty) {
        const snapshot = query;
        const data = snapshot.data();
        return data;
      } else {
        console.log("Erreur : Résidence non trouvée");
      }
    },
    initiateMap() {
      // create vector layer
      const source = new VectorSource();
      const vector = new VectorLayer({
        source: source
      });
      // create title layer
      const raster = new TileLayer({
        source: new OSM({crossOrigin: null}),
      });
      // create map with 2 layer
      // eslint-disable-next-line no-unused-vars
      const map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: "degrees",
          }),
        ]),
        target: "map",
        layers: [raster, vector],
        view: new View({
          projection: "EPSG:4326",
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
  }
};
</script>
