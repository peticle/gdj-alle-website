<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
import type { AnimeTimelineInstance } from "animejs";
import { onMounted, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { toggleTimeline } from "@/helpers";

let timeline: AnimeTimelineInstance;

// Template refs
const navigation = useTemplateRef<HTMLElement>("navigation");
const background = useTemplateRef<HTMLElement>("background");

/**
 * Toggles the navigation.
 */
function toggle() {
  toggleTimeline(timeline);
}

// Emits
const emit = defineEmits(["backHome"]);

// Exposes
defineExpose({
  toggle,
});

// Lifecycle hooks
onMounted(() => {
  if (!navigation.value) {
    return;
  }
  timeline = anime.timeline({
    duration: 300,
    easing: "easeOutSine",
    autoplay: false,
    begin: () => {
      navigation.value.style.display = "flex";
    },
    loopComplete: () => {
      if (timeline.direction === "reverse") {
        navigation.value.style.display = "none";
      }
    },
  });
  timeline.add({
    targets: "nav>svg>circle",
    r: 225,
  });
  timeline.add(
    {
      targets: "nav>a",
      opacity: 1,
      delay: anime.stagger(100),
    },
    300,
  );
  timeline.add(
    {
      targets: "nav>div",
      opacity: 1,
      delay: anime.stagger(100, { direction: "reverse" }),
    },
    500,
  );
});
</script>

<template>
  <nav ref="navigation">
    <RouterLink @click="emit('backHome')" to="#home">Accueil</RouterLink>
    <div></div>
    <RouterLink
      @click="emit('backHome')"
      to="#presentation"
      title="Voir la présentation du groupe"
      >À propos</RouterLink
    >
    <div></div>
    <RouterLink
      @click="emit('backHome')"
      to="#planning"
      title="Voir notre agenda"
      >Agenda</RouterLink
    >
    <div></div>
    <RouterLink @click="emit('backHome')" to="#news" title="Voir les actualités"
      >Actualités</RouterLink
    >
    <div></div>
    <RouterLink
      @click="emit('backHome')"
      to="#contact"
      title="Voir les façons de nous contacter"
      >Contacts</RouterLink
    >

    <svg ref="background" viewBox="0 0 100 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="nav-gradient" gradientTransform="rotate(90)">
          <stop offset="50%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="0" r="1" fill="url(#nav-gradient)" />
    </svg>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  align-items: center;
  display: none;
  flex-direction: column;
  height: 100dvh;
  justify-content: space-evenly;
  padding: 15vh 0;
  transition: height 0.2s;
  width: 100%;
  z-index: 1;

  > a {
    color: var(--white-500);
    font-family: "Roboto", arial, sans-serif;
    font-size: 1.6em;
    font-weight: 300;
    opacity: 0;
    position: relative;
    text-decoration: none;
  }

  > div {
    background: var(--white-500);
    border-radius: 100%;
    height: 0.3em;
    opacity: 0;
    width: 0.3em;
  }

  > svg {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;

    > defs > #nav-gradient > stop {
      &:first-of-type {
        stop-color: var(--primary-500);
      }

      &:last-of-type {
        stop-color: #ef0325;
      }
    }
  }
}
</style>
