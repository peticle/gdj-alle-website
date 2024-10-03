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
    <h2 class="section-title">Agenda</h2>
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

  > ul {
    gap: 3rem;
    margin: 1rem 0;

    > li:deep(.event) > h3,
    > li:deep(.event) > a {
      color: var(--primary-500);
    }
  }

  > span {
    font-size: 1.4em;
  }
}
</style>
