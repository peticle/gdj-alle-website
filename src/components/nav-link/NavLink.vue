<script setup lang="ts">
import { type NavLinkProps } from "./nav-link.ts";

// Props
const props = defineProps<NavLinkProps>();
</script>

<template>
  <div class="nav-link">
    <div class="nav-link-dot"></div>
    <RouterLink :to="props.to" :title="props.title"><slot /></RouterLink>
  </div>
</template>

<style scoped lang="scss">
div.nav-link {
  align-items: center;
  display: flex;
  gap: 1rem;

  > div.nav-link-dot {
    background: var(--white-500);
    border-radius: 100%;
    height: 0.6em;
    transition: transform 0.2s;
    width: 0.6em;
  }

  > a {
    color: var(--white-500);
    font-family: "Roboto", arial, sans-serif;
    font-size: 1.6em;
    font-weight: 300;
  }

  &:hover {
    cursor: pointer;

    > div.nav-link-dot {
      transform: translateX(0.2em);
    }
  }
}
</style>
