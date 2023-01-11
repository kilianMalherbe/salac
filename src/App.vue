<template>
  <div id="nav">
    <Navbars current="true" />
  </div>
  <router-view />
</template>

<script>
import Navbars from "./components/Navbars.vue";
export default {
  name: "Salac",
  components: {
    Navbars,
  },
};
</script>

<style lang="scss">

#app {
  font-family: 'GalanoGrotesqueMedium', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  font-family: "GalanoGrotesqueMedium", sans-serif;
  a {
    font-weight: 400;
    color: #717171;

    &.router-link-exact-active {
      color: #d1d1d1;
    }
  }
}
</style>
