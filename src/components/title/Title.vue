<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { onMounted, useTemplateRef } from "vue";

const timeline = anime.timeline({
  autoplay: false,
  duration: 800,
  easing: "easeInOutExpo",
});

// Template refs
const titleFill = useTemplateRef<HTMLElement>("title-fill");
const titleStroke = useTemplateRef<HTMLElement>("title-stroke");

// Exposes
defineExpose({
  show,
});

/**
 * Show the title with an animation.
 */
function show() {
  timeline.play();
}

// Lifecycle hooks
onMounted(() => {
  timeline.add({
    targets: titleStroke.value,
    opacity: [0, 1],
    strokeDashoffset: [1000, 0],
    translateY: [-5, 0],
  });
  timeline.add(
    {
      targets: titleFill.value,
      opacity: [0, 1],
    },
    500,
  );
});
</script>

<template>
  <svg class="title">
    <text ref="title-fill">
      <slot />
    </text>
    <text ref="title-stroke">
      <slot />
    </text>
  </svg>
</template>

<style scoped lang="scss">
svg.title {
  > text {
    display: flex;
    font-family: "Bebas Neue", arial, sans-serif;
    font-size: 3em;
    letter-spacing: 0.1em;

    &:first-of-type {
      fill: var(--white-400);
    }

    &:last-of-type {
      fill: none;
      stroke: var(--white-400);
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
  }
}
</style>
