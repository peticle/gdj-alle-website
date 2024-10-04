<script setup lang="ts">
import { useTemplateRef } from "vue";
import { NavButton, Navigation } from "@/components";

// Template refs
const button = useTemplateRef<typeof NavButton>("button");
const navigation = useTemplateRef<typeof Navigation>("navigation");

/**
 * Toggles the navigation and its button.
 */
function toggle() {
  button.value?.toggle();
  navigation.value?.toggle();
}
</script>

<template>
  <header>
    <h1>Groupe des jeunes Alle</h1>
    <NavButton ref="button" @click.prevent="toggle" />
    <Navigation @backHome="toggle" ref="navigation" />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-end;
  padding: 2em;
  position: absolute;
  width: 100%;

  > h1 {
    display: none;
  }

  &:deep(> svg.nav-button) {
    height: 3em;
    width: 3em;
    z-index: 2;
  }

  &:deep(> nav) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    > svg {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
