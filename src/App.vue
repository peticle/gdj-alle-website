<script setup lang="ts">
import { Footer, Header } from "@/components";
import { Contact, Home, News, Planning, Presentation } from "@/views";
</script>

<template>
  <Header />
  <main>
    <Home />
    <Presentation />
    <Planning />
    <News />
    <Contact />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
header {
  grid-area: header;
}
</style>
