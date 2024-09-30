import { DirectiveBinding } from "vue";

/**
 * A directive for window resizing.
 *
 * @field {(event: Event) => void} The function to call on window resizing.
 */
interface HTMLElementWindowResize extends HTMLElement {
  windowResizeEvent: (event: Event) => void;
}

export const vWindowResize = {
  beforeMount: (el: HTMLElementWindowResize, binding: DirectiveBinding) => {
    el.windowResizeEvent = () => {
      binding.value();
    };
    window.addEventListener("resize", el.windowResizeEvent);
  },
  unmounted: (el: HTMLElementWindowResize) => {
    window.removeEventListener("resize", el.windowResizeEvent);
  },
};
