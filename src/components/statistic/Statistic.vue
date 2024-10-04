<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { computed, onMounted, useTemplateRef } from "vue";
import type { StatisticProps } from "./statistic";

const timeline = anime.timeline({
  autoplay: false,
  duration: 500,
  easing: "easeInOutExpo",
});

// Props
const props = withDefaults(defineProps<StatisticProps>(), {
  reversed: false,
});

// Template refs
const statNumber = useTemplateRef<HTMLElement>("stat-number");
const statLabel = useTemplateRef<HTMLElement>("stat-label");

// Computed
const direction = computed(() => {
  return props.reversed ? "column-reverse" : "column";
});

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
    targets: statNumber.value,
    opacity: [0, 1],
    translateY: [props.reversed ? 5 : -5, 0],
  });
  timeline.add({
    targets: statLabel.value,
    opacity: [0, 1],
  });
});
</script>

<template>
  <div class="statistic">
    <strong ref="stat-number"><slot /></strong>
    <span ref="stat-label"><slot name="label" /></span>
  </div>
</template>

<style scoped lang="scss">
div.statistic {
  align-items: center;
  color: var(--white-500);
  display: flex;
  flex-direction: v-bind(direction);
  justify-content: center;

  > strong {
    font-size: 4em;
    font-weight: 900;
    line-height: 0.9em;
  }

  > span {
    font-size: 1.2em;
    max-width: 140px;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
