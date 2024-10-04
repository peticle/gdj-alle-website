<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { onMounted, useTemplateRef } from "vue";
import { vElementVisibility } from "@vueuse/components";
import halloween from "@/assets/halloween.webp";
import { Event, Title, type EventData } from "@/components";

const timeline = anime.timeline({
  autoplay: false,
  duration: 1000,
  easing: "easeInOutExpo",
});

const events: EventData[] = [
  {
    date: "26 octobre 2024",
    image: halloween,
    title: "Soirée Halloween",
    summary:
      "La soirée Halloween du groupe des jeunes revient pour sa 6ème édition. " +
      "Une soirée exceptionnelle à ne pas manquer !",
  },
  {
    date: "26 octobre 2024",
    image: halloween,
    title: "Soirée Halloween",
    summary:
      "La soirée Halloween du groupe des jeunes revient pour sa 6ème édition. " +
      "Une soirée exceptionnelle à ne pas manquer !",
  },
];

// Template refs
const title = useTemplateRef<typeof Title>("title");

/**
 * Shows the section if it's visible.
 *
 * @param isVisible If the section is visible.
 */
function showIfVisible(isVisible: boolean) {
  if (isVisible && !timeline.began) {
    timeline.play();
  }
}

// Lifecycle hooks
onMounted(() => {
  timeline.add({
    begin: () => {
      title.value?.show();
    },
  });
  timeline.add(
    {
      targets: "#planning li",
      opacity: 1,
      translateY: [-5, 0],
      delay: anime.stagger(500),
    },
    800,
  );
});
</script>

<template>
  <section id="planning">
    <h2>Agenda</h2>
    <Title
      v-element-visibility="showIfVisible"
      ref="title"
      viewBox="0 0 340 100"
    >
      <tspan x="0" y="40">Agenda</tspan>
    </Title>
    <ul v-if="events.length > 0" class="no-style-list">
      <li v-for="(event, i) in events" :key="i">
        <Event :data="event" />
      </li>
    </ul>
    <span v-else>Aucun événement à venir pour le moment.</span>
  </section>
</template>

<style scoped lang="scss">
#planning {
  background: var(--white-500);
  padding: 10vh 2em;

  > h2 {
    display: none;
  }

  &:deep(> svg.title) > text {
    &:first-of-type {
      fill: var(--black-500);
    }

    &:last-of-type {
      stroke: var(--black-500);
    }
  }

  > ul {
    gap: 3rem;
    margin: 1rem 0;

    > li {
      opacity: 0;

      &:deep(.event) > h3,
      &:deep(.event) > a {
        color: var(--primary-500);
      }
    }
  }

  > span {
    font-size: 1.4em;
  }
}
</style>
