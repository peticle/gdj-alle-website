<script setup lang="ts">
import members from "@/assets/members.png";
import { Statistic } from "@/components";
</script>

<template>
  <section id="presentation">
    <h2>Présentation</h2>
    <h3>Qui sommes-nous ?</h3>
    <div id="presentation-content">
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
    >
      <defs>
        <mask id="presentation-mask">
          <circle cx="100" cy="0" r="12" fill="white" />
          <ellipse cx="100" cy="55" rx="250" ry="38" fill="white" />
          <text fill="black" x="80" y="30">QUI SOMMES-NOUS ?</text>
        </mask>
        <radialGradient id="presentation-gradient" cx="0.5" cy="0.5" r="1">
          <stop offset="0%" />
          <stop offset="100%" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="100" />
      <rect
        x="0"
        y="0"
        width="200"
        height="100"
        fill="url(#presentation-gradient)"
        mask="url(#presentation-mask)"
      />
    </svg>
  </section>
</template>

<style scoped lang="scss">
#presentation {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  position: relative;
  transition: height 0.1s;

  > h2,
  > h3 {
    display: none;
  }
}

#presentation-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
  padding: 2em;
  position: absolute;
  top: 32dvh;
  width: 100%;

  > img {
    background: none;
    filter: grayscale(1);
    margin: 0 auto;
    width: 100%;
  }

  > p {
    color: var(--white-500);
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
      stop-color: var(--primary-500);
    }

    &:last-of-type {
      stop-color: var(--primary-600);
    }
  }
}
</style>
