<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { onMounted, useTemplateRef } from "vue";
import { vElementVisibility } from "@vueuse/components";
import members from "@/assets/members.png";
import { Statistic, Title } from "@/components";

const timeline = anime.timeline({
  autoplay: false,
  duration: 1000,
  easing: "easeInOutExpo",
});

// Template refs
const title = useTemplateRef<typeof Title>("title");
const membersImage = useTemplateRef<typeof Statistic>("members-img");
const description = useTemplateRef<typeof Statistic>("description");
const membersStat = useTemplateRef<typeof Statistic>("members-stat");
const yearStat = useTemplateRef<typeof Statistic>("year-stat");

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
    targets: membersImage.value,
    opacity: [0, 1],
    translateY: [-5, 0],
  });
  timeline.add({
    targets: description.value,
    opacity: [0, 1],
    translateY: [5, 0],
  });
  timeline.add({
    begin: () => {
      membersStat.value?.show();
    },
  });
  timeline.add({
    begin: () => {
      yearStat.value?.show();
    },
  });
});
</script>

<template>
  <section id="presentation">
    <div id="presentation-content">
      <h2>Qui sommes-nous ?</h2>
      <Title ref="title" viewBox="0 0 340 100">
        <tspan x="0" y="40">Qui sommes-nous ?</tspan>
      </Title>
      <img
        v-element-visibility="showIfVisible"
        ref="members-img"
        :src="members"
        alt="A picture of the members"
      />
      <p ref="description">
        Notre objectif, la sociabilisation des jeunes du village. Pour ce faire,
        nous organisations divers sorties et voyages. Le tout financé par les
        événements organisés par notre société.
      </p>
      <div id="presentation-stats">
        <Statistic ref="members-stat">
          <template #default>81</template>
          <template #label>Membres</template>
        </Statistic>
        <Statistic ref="year-stat" :reversed="true">
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

  > h2 {
    display: none;
  }

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
