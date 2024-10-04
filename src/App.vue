<script setup lang="ts">
import { RouterView } from "vue-router";
import { Footer, Header } from "@/components";
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
header {
  grid-area: header;
}
</style>
