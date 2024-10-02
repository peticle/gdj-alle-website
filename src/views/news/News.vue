<script setup lang="ts">
import { Event, EventData } from "@/components";
import committee from "@/assets/committee.webp";

const events: EventData[] = [
  {
    title: "Réélection du comité",
    summary:
      "Cette année, l'entièreté du comité est revoté lors de l'habituelle assemblée générale du groupe des jeunes.",
    image: committee,
  },
];
</script>

<template>
  <section id="news">
    <div id="news-content">
      <h2 class="section-title">Actualités</h2>
      <ul v-if="events.length > 0" class="no-style-list">
        <li v-for="(event, i) in events" :key="i">
          <Event :data="event" />
        </li>
      </ul>
      <span v-else>Aucune actualité à afficher.</span>
    </div>
    <svg
      id="news-background"
      viewBox="0 0 100 200"
      preserveAspectRatio="none"
      class="svg-background"
    >
      <rect x="0" y="0" width="100" height="100" />
      <rect x="0" y="100" width="100" height="100" />
      <path
        d="M77.677734.00390625C61.960855-.16027459 55.901034 6.0437175 40.814453 8.6542969 25.241205 11.349109 14.664245 4.9452569 0 12v176s3.8824931 11.35658 20.769531 11.96094c.527715.019 1.04571.02985 1.552735.03515 15.716879.16419 21.7767-6.03981 36.863281-8.65039C74.758795 188.65089 85.335755 195.05474 100 188V12S96.117507.6434229 79.230469.0390625c-.527715-.01898998-1.04571-.02982626-1.552735-.03515625z"
      />
    </svg>
  </section>
</template>

<style scoped lang="scss">
#news {
  position: relative;
}

#news-content {
  padding: 10vh 2em;

  > h2 {
    color: var(--white-500);
  }

  > ul {
    gap: 3rem;
    margin: 1rem 0;

    > li:deep(.event) > h3,
    > li:deep(.event) > p,
    > li:deep(.event) > a {
      color: var(--white-500);
    }
  }

  > span {
    font-size: 1.4em;
  }
}

#news-background {
  > rect:first-of-type {
    fill: var(--white-500);
  }

  > rect:last-of-type {
    fill: var(--black-500);
  }

  > path {
    fill: var(--primary-500);
  }
}
</style>
