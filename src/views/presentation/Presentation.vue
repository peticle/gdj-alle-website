<script setup lang="ts">
import members from "@/assets/members.png";
import { Statistic } from "@/components";
</script>

<template>
  <section id="presentation">
    <div id="presentation-content">
      <h2 class="section-title">Qui sommes-nous ?</h2>
      <img :src="members" alt="A picture of the members" />
      <p>
        Notre objectif, la sociabilisation des jeunes du village. Pour ce faire,
        nous organisations divers sorties et voyages. Le tout financé par les
        événements organisés par notre société.
      </p>
      <div id="presentation-stats">
        <Statistic>
          <template #default>81</template>
          <template #label>Membres</template>
        </Statistic>
        <Statistic :reversed="true">
          <template #default>2009</template>
          <template #label>Un groupe actif depuis</template>
        </Statistic>
      </div>
    </div>
    <svg
      id="presentation-background"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMax slice"
      class="svg-background"
    >
      <defs>
        <mask id="presentation-mask">
          <ellipse cx="100" cy="0" rx="400" ry="100" fill="white" />
        </mask>
        <linearGradient
          id="presentation-gradient"
          gradientTransform="rotate(90)"
        >
          <stop offset="60%" />
          <stop offset="100%" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="100" />
      <ellipse
        cx="100"
        cy="0"
        rx="400"
        ry="100"
        fill="url(#presentation-gradient)"
      />
    </svg>
  </section>
</template>

<style scoped lang="scss">
#presentation {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
}

#presentation-content {
  align-items: center;
  color: var(--white-500);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10vh 2em;

  > img {
    background: none;
    filter: grayscale(1);
    margin: 0 auto;
    width: 100%;
  }

  > p {
    font-size: 1.1em;
    font-weight: 300;
    max-width: 500px;
    text-align: justify;
  }

  #presentation-stats {
    display: flex;
    justify-content: space-between;
    max-width: 300px;
    width: 100%;
  }
}

#presentation-background {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;

  > rect:first-of-type {
    fill: var(--white-500);
  }

  #presentation-mask > text {
    font-family: "Bebas Neue", arial, sans-serif;
    font-size: 0.4em;
    line-height: 1em;
    width: 50%;
  }

  > defs > #presentation-gradient > stop {
    &:first-of-type {
      stop-color: #ef0325;
    }

    &:last-of-type {
      stop-color: var(--primary-500);
    }
  }
}
</style>
