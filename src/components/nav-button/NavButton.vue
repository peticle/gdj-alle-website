<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
import type { AnimeTimelineInstance } from "animejs";
import { onMounted, useTemplateRef } from "vue";
import { toggleTimeline } from "@/helpers";

const timeline: AnimeTimelineInstance = anime.timeline({
  duration: 500,
  autoplay: false,
});

// Template refs
const rect1 = useTemplateRef<HTMLElement>("rect1");
const rect2 = useTemplateRef<HTMLElement>("rect2");
const rect3 = useTemplateRef<HTMLElement>("rect3");
const rect4 = useTemplateRef<HTMLElement>("rect4");

/**
 * Toggles the navigation button.
 */
function toggle() {
  toggleTimeline(timeline);
}

// Exposes
defineExpose({
  toggle,
});

// Lifecycle hooks
onMounted(() => {
  if (!rect2.value || !rect3.value) {
    return;
  }
  timeline.add({
    targets: [rect1.value, rect4.value],
    opacity: 0,
  });
  timeline.add(
    {
      targets: rect2.value,
      rotate: "45deg",
    },
    0,
  );
  timeline.add(
    {
      targets: rect3.value,
      rotate: "-45deg",
    },
    0,
  );
});
</script>

<template>
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="nav-button">
    <g fill="white">
      <rect ref="rect1" x="0" y="6" width="100" height="14" rx="4" />
      <rect ref="rect2" x="0" y="43" width="100" height="14" rx="4" />
      <rect ref="rect3" x="0" y="43" width="100" height="14" rx="4" />
      <rect ref="rect4" x="0" y="80" width="100" height="14" rx="4" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
svg.nav-button > g > rect {
  fill: var(--white-500);
  transform-origin: center center;
}
</style>
