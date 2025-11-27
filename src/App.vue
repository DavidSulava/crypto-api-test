<script setup>
  import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="#app">
    <v-app>
      <v-main>
        <NavBar />
        <div class="page-content">
          <router-view/>
        </div>
      </v-main>
    </v-app>
  </div>
</template>
