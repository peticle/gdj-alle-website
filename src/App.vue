<script setup lang="ts">
import { Home } from "@/views";
import { Header } from "@/components";
</script>

<template>
  <Header />
  <main>
    <Home />
  </main>
</template>

<style lang="scss" scoped>
header {
  grid-area: header;
}
</style>
