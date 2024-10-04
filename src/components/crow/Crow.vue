<script setup lang="ts">
import type { Object3D } from "three";
import { onMounted, useTemplateRef } from "vue";
import { vResizeObserver } from "@vueuse/components";
import { CrowScene } from "./crow";

// Exposes
defineExpose({
  appear,
});

const crowScene: CrowScene = new CrowScene();
await crowScene.loadModel().then((crow: Object3D) => {
  crow.position.set(0, 2.2, -1.6);
  crow.rotation.set(0, -0.3, 0);
});

// Template refs
const sceneDiv = useTemplateRef<HTMLElement>("scene");

/**
 * Resizes the scenes rendering the crow.
 */
function resizeScene() {
  if (sceneDiv.value) {
    crowScene.resizeRenderer();
  }
}

/**
 * Makes the crow appear.
 */
function appear() {
  crowScene.appear();
}

// Lifecycle hooks
onMounted(() => {
  if (!sceneDiv.value) {
    return;
  }
  crowScene.setContainer(sceneDiv.value);
  appear();
});
</script>

<template>
  <div v-resize-observer="resizeScene" ref="scene" class="crow"></div>
</template>

<style lang="scss" scoped></style>
