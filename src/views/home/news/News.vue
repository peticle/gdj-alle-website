<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { onMounted, useTemplateRef } from "vue";
import { vElementVisibility } from "@vueuse/components";
import { Event, EventData, Title } from "@/components";
import committee from "@/assets/committee.webp";

const timeline = anime.timeline({
  autoplay: false,
  duration: 1000,
  easing: "easeInOutExpo",
});

const events: EventData[] = [
  {
    title: "Réélection du comité",
    summary:
      "Cette année, l'entièreté du comité est revoté lors de l'habituelle assemblée générale du groupe des jeunes.",
    image: committee,
  },
  {
    title: "Réélection du comité",
    summary:
      "Cette année, l'entièreté du comité est revoté lors de l'habituelle assemblée générale du groupe des jeunes.",
    image: committee,
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
  timeline.add({
    targets: "#news li",
    opacity: 1,
    translateY: [-5, 0],
    delay: anime.stagger(500),
  });
});
</script>

<template>
  <section id="news">
    <div id="news-content">
      <h2>Actualités</h2>
      <Title
        v-element-visibility="showIfVisible"
        ref="title"
        viewBox="0 0 340 100"
      >
        <tspan x="0" y="40">Actualités</tspan>
      </Title>
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
      <defs>
        <linearGradient id="news-gradient" gradientTransform="rotate(90)">
          <stop offset="60%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" />
      <rect x="0" y="110" width="100" height="100" />
      <path
        d="M77.677734.00390625C61.960855-.16027459 55.901034 6.0437175 40.814453 8.6542969 25.241205 11.349109 14.664245 4.9452569 0 12v176s3.8824931 11.35658 20.769531 11.96094c.527715.019 1.04571.02985 1.552735.03515 15.716879.16419 21.7767-6.03981 36.863281-8.65039C74.758795 188.65089 85.335755 195.05474 100 188V12S96.117507.6434229 79.230469.0390625c-.527715-.01898998-1.04571-.02982626-1.552735-.03515625z"
        fill="url(#news-gradient)"
      />
    </svg>
  </section>
</template>

<style scoped lang="scss">
#news {
  position: relative;
}

#news-content {
  padding: 14vh 2em;

  > h2 {
    display: none;
  }

  > ul {
    gap: 3rem;
    margin: 1rem 0;

    > li {
      opacity: 0;

      &:deep(.event) > h3,
      &:deep(.event) > p,
      &:deep(.event) > a {
        color: var(--white-500);
      }
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
    fill: var(--black-600);
  }

  > defs > #news-gradient > stop {
    &:first-of-type {
      stop-color: #ef0325;
    }

    &:last-of-type {
      stop-color: var(--primary-500);
    }
  }
}
</style>
