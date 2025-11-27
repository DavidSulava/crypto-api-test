<script setup>
  import router from "@/routes/index.js";

  const allowedLinks = router.options.routes.filter(route => !!route?.meta?.isNavbar);
</script>

<template>
  <v-app-bar
      app
      color="teal-darken-1"
  >
    <template v-slot:prepend>
      <v-icon >mdi-currency-eur</v-icon>
    </template>

    <v-btn
        v-for="link in allowedLinks"
        :key="link.name"
        router :to="link.path"
        :exact="true"
    >
      <span>
        {{ link.meta?.title || link.name }}
      </span>
    </v-btn>
  </v-app-bar>
</template>
