<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
import type { AnimeTimelineInstance } from "animejs";
import { onMounted, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { NavLink } from "@/components";
import { toggleTimeline } from "@/helpers";

let timeline: AnimeTimelineInstance;

// Template refs
const navMobile = useTemplateRef<HTMLElement>("navMobile");
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
  if (!navMobile.value) {
    return;
  }
  timeline = anime.timeline({
    duration: 300,
    easing: "easeOutSine",
    autoplay: false,
    begin: () => {
      navMobile.value.style.display = "flex";
    },
    loopComplete: () => {
      if (timeline.direction === "reverse") {
        navMobile.value.style.display = "none";
      }
    },
  });
  timeline.add({
    targets: "#nav-mobile > svg > circle",
    r: 225,
  });
  timeline.add(
    {
      targets: ".nav-link",
      opacity: 1,
      delay: anime.stagger(100),
    },
    300,
  );
  timeline.add(
    {
      targets: ".nav-dot",
      opacity: 1,
      delay: anime.stagger(100, { direction: "reverse" }),
    },
    500,
  );
});
</script>

<template>
  <nav>
    <div id="nav-normal">
      <NavLink to="#home" title="Aller à l'accueil">Accueil</NavLink>
      <NavLink to="#presentation" title="Voir la présentation du groupe"
        >À propos</NavLink
      >
      <NavLink to="#planning" title="Voir notre agenda">Agenda</NavLink>
      <NavLink to="#news" title="Voir les actualités">Actualités</NavLink>
      <NavLink to="#contact" title="Voir les façons de nous contacter"
        >Contacts</NavLink
      >
    </div>
    <div ref="navMobile" id="nav-mobile">
      <RouterLink @click="emit('backHome')" to="#home" class="nav-link"
        >Accueil</RouterLink
      >
      <div class="nav-dot"></div>
      <RouterLink
        @click="emit('backHome')"
        to="#presentation"
        title="Voir la présentation du groupe"
        class="nav-link"
        >À propos</RouterLink
      >
      <div class="nav-dot"></div>
      <RouterLink
        @click="emit('backHome')"
        to="#planning"
        title="Voir notre agenda"
        class="nav-link"
        >Agenda</RouterLink
      >
      <div class="nav-dot"></div>
      <RouterLink
        @click="emit('backHome')"
        to="#news"
        title="Voir les actualités"
        class="nav-link"
        >Actualités</RouterLink
      >
      <div class="nav-dot"></div>
      <RouterLink
        @click="emit('backHome')"
        to="#contact"
        title="Voir les façons de nous contacter"
        class="nav-link"
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
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  position: relative;
  width: 100%;

  a.nav-link {
    color: var(--white-500);
    font-family: "Roboto", arial, sans-serif;
    font-size: 1.6em;
    font-weight: 300;
  }
}

#nav-normal {
  display: none;
  flex-grow: 1;
  gap: 3rem;
  justify-content: flex-end;
  padding: 3em 4em;
}

#nav-mobile {
  align-items: center;
  display: none;
  flex-direction: column;
  height: 100dvh;
  justify-content: space-evenly;
  padding: 15vh 0;
  position: absolute;
  transition: height 0.2s;
  width: 100%;
  z-index: 1;

  > a {
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
        stop-color: var(--primary-600);
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  #nav-normal {
    display: flex;
  }
}
</style>
