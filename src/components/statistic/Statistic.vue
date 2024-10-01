<script setup lang="ts">
import { computed } from "vue";
import type { StatisticProps } from "./statistic";

// Props
const props = withDefaults(defineProps<StatisticProps>(), {
  reversed: false,
});

// Computed
const direction = computed(() => {
  return props.reversed ? "column-reverse" : "column";
});
</script>

<template>
  <div class="statistic">
    <strong><slot /></strong>
    <span><slot name="label" /></span>
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
