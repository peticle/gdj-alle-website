<script setup lang="ts">
import anime from "animejs/lib/anime.es.js";
import { onMounted, useTemplateRef } from "vue";
import { Crow } from "@/components";

const timeline = anime.timeline({
  duration: 2000,
  easing: "easeInOutExpo",
});

// Template refs
const titleBg = useTemplateRef<HTMLElement>("title-bg");
const titleFg = useTemplateRef<HTMLElement>("title-fg");
const subtitle = useTemplateRef<HTMLElement>("subtitle");
const scroll = useTemplateRef<HTMLElement>("scroll");

// Lifecycle hooks
onMounted(() => {
  if (!titleBg.value || !titleFg.value || !subtitle.value || !scroll.value) {
    return;
  }
  timeline.add({
    targets: titleFg.value,
    strokeDashoffset: [30, 0],
    opacity: 1,
  });
  timeline.add(
    {
      targets: titleBg.value,
      opacity: 1,
    },
    1000,
  );
  timeline.add(
    {
      targets: [titleFg.value, titleBg.value],
      translateY: 0.3,
    },
    1100,
  );
  timeline.add(
    {
      targets: titleBg.value,
      opacity: 1,
    },
    1000,
  );
  timeline.add(
    {
      targets: subtitle.value,
      opacity: 1,
      translateY: -0.3,
    },
    1200,
  );
  timeline.add(
    {
      targets: scroll.value,
      opacity: 1,
      strokeDashoffset: [25, 0],
    },
    2000,
  );
});
</script>

<template>
  <section id="home">
    <h2>Accueil</h2>
    <p>Jeunesse jurassienne depuis 2009</p>
    <Suspense>
      <Crow />
    </Suspense>
    <svg
      id="home-background"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <mask id="home-mask">
          <ellipse cx="100" cy="100" rx="120" ry="60" fill="white" />
          <circle cx="100" cy="100" r="12" fill="black" />
          <text ref="title-bg">
            <tspan x="100" y="58">GROUPE DES</tspan>
            <tspan x="100" y="65">JEUNES ALLE</tspan>
          </text>
          <text ref="title-fg">
            <tspan x="100" y="58">GROUPE DES</tspan>
            <tspan x="100" y="65">JEUNES ALLE</tspan>
          </text>
        </mask>
        <radialGradient id="home-gradient" cx="0.5" cy="0.5" r="1">
          <stop offset="0%" />
          <stop offset="100%" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="100" fill="url(#home-gradient)" />
      <rect x="0" y="0" width="200" height="100" mask="url(#home-mask)" />
      <text ref="subtitle">
        <tspan x="100" y="70">Jeunesse jurassienne</tspan>
        <tspan x="100" y="73.5">depuis 2009</tspan>
      </text>
    </svg>
    <a id="home-scroll" href="#">
      <svg ref="scroll" viewBox="0 0 26.46 26.46">
        <path
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.65"
          d="m5.15 9.15 8.16 8.16 8-8"
        />
      </svg>
    </a>
  </section>
</template>

<style lang="scss" scoped>
#home {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  position: relative;
  transition: height 0.2s;

  > h2,
  p {
    display: none;
  }

  &:deep(> div.crow) {
    height: 45dvh;
    transition: height 0.2s;
    width: 100%;

    > canvas {
      height: 100%;
      width: 100%;
    }
  }
}

#home-background {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;

  > defs {
    > mask#home-mask > text {
      opacity: 0;
      text-anchor: middle;
      font-family: "Bebas Neue", arial, sans-serif;
      font-size: 0.46em;
      letter-spacing: 0.04em;

      &:last-of-type {
        fill: none;
        stroke: black;
        stroke-width: 0.03em;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dashoffset: 30;
        stroke-dasharray: 30;
      }
    }

    > #home-gradient > stop {
      &:first-of-type {
        stop-color: var(--primary-500);
      }
      &:last-of-type {
        stop-color: var(--primary-600);
      }
    }
  }

  > rect:nth-of-type(2) {
    fill: var(--white-500);
  }

  > text {
    fill: var(--black-600);
    font-family: "Roboto", arial, sans-serif;
    font-size: 0.18em;
    font-weight: 300;
    opacity: 0;
    text-anchor: middle;
  }
}

#home-scroll {
  bottom: 0.4rem;
  position: absolute;
  width: 4em;

  > svg {
    opacity: 0;
    stroke: var(--white-500);
    stroke-dashoffset: 25;
    stroke-dasharray: 25;
  }
}
</style>
