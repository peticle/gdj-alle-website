<script setup lang="ts">
import { type EventProps } from "./event";

// Props
const props = defineProps<EventProps>();
</script>

<template>
  <div class="event">
    <div v-if="props.data.date" class="event-date">
      <span>{{ props.data.date }}</span>
    </div>
    <div v-if="props.data.image" class="event-image">
      <img :src="props.data.image" alt="Picture of the event" />
    </div>
    <h3>{{ props.data.title }}</h3>
    <p>{{ props.data.summary }}</p>
    <a href="#">&gt; Lire la suite</a>
  </div>
</template>

<style scoped lang="scss">
$event--radius: 4px;

div.event {
  color: var(--black-500);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;

  > div.event-date {
    background: var(--primary-500);
    border-radius: $event--radius 0 $event--radius 0;
    color: var(--white-500);
    padding: 0.4em 0.6em;
    position: absolute;
    top: 0;
    z-index: 1;

    > span {
      font-size: 1.2em;
    }
  }

  > div.event-image {
    border-radius: $event--radius;
    height: 8em;
    overflow: hidden;

    > img {
      height: 100%;
      filter: grayscale(1);
      object-fit: cover;
      width: 100%;
    }
  }

  > h3 {
    font-family: "Bebas Neue", arial, sans-serif;
    font-size: 1.6em;
    margin: 0.6rem 0 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  > p {
    font-size: 1em;
    font-weight: 300;
    text-align: justify;
  }

  > a {
    font-size: 1.2em;
    font-weight: 400;
  }
}
</style>
