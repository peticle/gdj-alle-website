﻿<script setup lang="ts">
import anime from "animejs/lib/anime.es";
import { onMounted, useTemplateRef } from "vue";
import { vElementVisibility } from "@vueuse/components";
import { Title } from "@/components";

const timeline = anime.timeline({
  autoplay: false,
  duration: 1000,
  easing: "easeInOutExpo",
});

// Template refs
const title = useTemplateRef<typeof Title>("title");
const halloween = useTemplateRef<HTMLElement>("halloween");
const contact = useTemplateRef<HTMLElement>("contact");
const socials = useTemplateRef<HTMLElement>("socials");

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
      title.value.show();
    },
  });
  timeline.add({
    targets: [halloween.value, contact.value, socials.value],
    opacity: 1,
    translateY: [-3, 0],
  });
});
</script>

<template>
  <section id="contact" class="flex-column">
    <h2>Nous contacter</h2>
    <Title
      v-element-visibility="showIfVisible"
      ref="title"
      viewBox="0 0 340 100"
    >
      <tspan x="0" y="40">NOUS</tspan>
      <tspan x="0" y="90">CONTACTER</tspan>
    </Title>
    <div class="flex-column">
      <div ref="halloween" id="contact-halloween" class="flex-column">
        <strong>Nous soutenir</strong>
        <a
          href="https://1drv.ms/b/s!AjLNjoQbJj96kXj_woWvlYPZOf2A?e=4r9813"
          title="Voir le document des sponsors"
          >Sponsor Halloween 2024 &gt;</a
        >
      </div>
      <div ref="contact" id="contact-contact" class="flex-column">
        <strong>Nous contacter</strong>
        <span>Groupe des jeunes Alle</span>
        <span>Chemin central 4</span>
        <span>2942 Alle</span>
        <a href="mailto:contact@gdj-alle.ch" title="Nous contacter par e-mail"
          >contact@gdj-alle.ch</a
        >
      </div>
      <div ref="socials" id="contact-socials" class="flex-column">
        <strong>Nos réseaux sociaux</strong>
        <div>
          <a
            href="https://www.instagram.com/groupe_des_jeunes_alle/"
            title="Voir notre page Instagram"
          >
            <svg viewBox="0 0 132.004 132">
              <path
                d="M66.033 1c-27.142 0-35.08.028-36.623.156-5.57.463-9.034 1.341-12.81 3.221-2.91 1.445-5.206 3.119-7.471 5.467-4.125 4.282-6.624 9.55-7.53 15.812-.44 3.04-.567 3.66-.593 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.028 35.05.158 36.59.45 5.42 1.302 8.83 3.102 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.019.12 34.439.12s32.84-.02 34.41-.1c4.4-.207 6.956-.55 9.78-1.28a27.222 27.222 0 0 0 17.75-14.53c1.766-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.978.125-36.81 0-17.837-.04-35.66-.129-36.78-.41-5.22-1.304-8.73-3.126-12.44-1.495-3.037-3.155-5.306-5.565-7.625-4.3-4.108-9.56-6.607-15.828-7.511-3.037-.44-3.644-.569-19.184-.596Zm-.045 17h.016c13.018 0 14.658.056 19.775.29 5.11.233 8.6 1.043 11.66 2.23 3.16 1.225 5.83 2.865 8.5 5.535 2.67 2.668 4.31 5.347 5.54 8.504 1.18 3.052 1.99 6.538 2.23 11.648.23 5.12.29 6.757.29 19.793s-.06 14.667-.29 19.787c-.24 5.108-1.05 8.597-2.23 11.65-1.23 3.157-2.87 5.834-5.54 8.502-2.667 2.67-5.342 4.315-8.498 5.541-3.054 1.187-6.546 1.997-11.656 2.23-5.12.234-6.75.29-19.787.29-13.035 0-14.671-.056-19.791-.29-5.109-.233-8.596-1.043-11.65-2.23-3.155-1.226-5.833-2.87-8.5-5.54-2.67-2.669-4.31-5.346-5.537-8.502-1.186-3.053-1.996-6.54-2.23-11.65C18.056 80.667 18 79.035 18 66c0-13.036.06-14.673.29-19.793.23-5.108 1.04-8.597 2.23-11.65 1.23-3.156 2.869-5.834 5.539-8.502 2.668-2.67 5.347-4.31 8.503-5.535 3.052-1.187 6.54-1.997 11.65-2.23 5.118-.234 6.762-.29 19.776-.29Zm-4.29 8.639c-8.947.01-10.663.07-15.09.27-4.68.214-7.22.994-8.913 1.654-2.24.871-3.84 1.911-5.52 3.591-1.68 1.68-2.723 3.282-3.593 5.522-.657 1.692-1.438 4.232-1.652 8.912-.23 5.06-.276 6.57-.276 19.389 0 12.818.046 14.338.276 19.398.213 4.68.995 7.22 1.652 8.91.872 2.241 1.914 3.838 3.594 5.518 1.68 1.68 3.28 2.72 5.52 3.59 1.692.657 4.231 1.438 8.911 1.654 5.06.23 6.58.28 19.397.28 12.816 0 14.336-.05 19.396-.28 4.68-.214 7.223-.994 8.913-1.654 2.24-.87 3.835-1.91 5.515-3.59 1.68-1.68 2.722-3.274 3.592-5.514.657-1.69 1.438-4.23 1.652-8.91.23-5.06.282-6.58.282-19.39s-.052-14.33-.282-19.39c-.213-4.68-.995-7.22-1.652-8.91-.872-2.24-1.912-3.84-3.592-5.52-1.679-1.68-3.276-2.72-5.515-3.59-1.692-.658-4.233-1.44-8.913-1.653-5.06-.23-6.58-.276-19.396-.276-1.602 0-3.029-.002-4.307 0zm29.929 7.978a5.761 5.761 0 1 1-5.762 5.762 5.762 5.762 0 0 1 5.762-5.76zM66.004 41.35C79.617 41.35 90.65 52.387 90.65 66c0 13.613-11.033 24.645-24.646 24.645-13.613 0-24.65-11.032-24.65-24.645s11.037-24.65 24.65-24.65zm0 8.65c-8.837 0-16 7.163-16 16 0 8.836 7.163 16 16 16 8.836 0 16-7.164 16-16 0-8.837-7.164-16-16-16z"
              />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/GDJAlle"
            title="Voir notre page Facebook"
          >
            <svg viewBox="73 0 267 266.9">
              <path
                d="M91.8008 4.5996c-7.8 0-14.2012 6.4012-14.2012 14.2012v229.2988c0 7.9 6.4012 14.2012 14.2012 14.2012h123.5V162.5h-33.6016v-38.9004h33.6016V94.9004c0-33.3 20.3-51.4004 50-51.4004 14.2 0 26.4 1 30 1.5v34.9004h-20.6016c-16.2 0-19.2988 7.6004-19.2988 18.9004v24.7988h38.5l-5 38.9004h-33.5v99.8008h65.6992c7.9 0 14.2012-6.4012 14.2012-14.2012V18.8008c0-7.9-6.4012-14.2012-14.2012-14.2012H91.8008z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#contact {
  background: var(--black-600);
  color: var(--white-400);
  gap: 1rem;
  padding: 3em 2em;

  a {
    color: var(--white-500);
  }

  > h2 {
    display: none;
  }

  > div {
    gap: 1rem;

    > div {
      font-size: 1.1em;
      opacity: 0;

      > strong {
        font-weight: 300;
        margin: 0.4rem 0;
      }

      > a,
      > span {
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
}

#contact-contact > a {
  text-transform: none;
}

#contact-socials > div {
  display: flex;
  gap: 0.8rem;

  > a > svg {
    width: 1.8em;
  }
}

@media screen and (min-width: 720px) {
  #contact > div {
    flex-flow: row wrap;

    > div {
      flex: 1 0 40%;
    }
  }

  #contact-contact {
    flex: 0 0 100%;
    order: -1;
  }
}

@media screen and (min-width: 1024px) {
  #contact {
    padding: 4em 6em;

    > div {
      align-items: flex-end;
      flex-flow: row nowrap;
      gap: 6rem;

      > div {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
