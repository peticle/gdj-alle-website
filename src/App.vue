<script setup lang="ts">
import { Header } from "@/components";
import { Home, Presentation } from "@/views";
</script>

<template>
  <Header />
  <main>
    <Home />
    <Presentation />
  </main>
</template>

<style lang="scss" scoped>
header {
  grid-area: header;
}
</style>
