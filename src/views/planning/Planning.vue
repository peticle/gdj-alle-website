<script setup lang="ts">
import { onMounted } from "vue";
import halloween from "@/assets/halloween.webp";
import { Event, type EventData } from "@/components";

const events: EventData[] = [
  {
    date: "26 octobre 2024",
    image: halloween,
    title: "Soirée Halloween",
    summary:
      "La soirée Halloween du groupe des jeunes revient pour sa 6ème édition. " +
      "Une soirée exceptionnelle à ne pas manquer !",
  },
];

// Lifecycle hooks
onMounted(() => {
  console.log("test");
});
</script>

<template>
  <section id="planning">
    <h2>Agenda</h2>
    <ul v-if="events.length > 0">
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
  padding: 2em;

  > h2 {
    font-family: "Bebas Neue", arial, sans-serif;
    font-size: 3.2em;
    letter-spacing: 0.1em;
  }

  > ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    list-style-type: none;
    padding: 0;
  }

  > span {
    font-size: 1.4em;
  }
}
</style>
