<script setup lang="ts">
import { Header } from "@/components";
import { Home, News, Planning, Presentation } from "@/views";
</script>

<template>
  <Header />
  <main>
    <Home />
    <Presentation />
    <Planning />
    <News />
  </main>
</template>

<style lang="scss" scoped>
header {
  grid-area: header;
}
</style>
