import { type AnimeTimelineInstance } from "animejs";

/**
 * Toggles an animation timeline.
 * @param timeline The animation timeline to toggle.
 */
export function toggleTimeline(timeline: AnimeTimelineInstance) {
  if (timeline.began) {
    timeline.reverse();
    if (timeline.progress === 100 && timeline.direction === "reverse") {
      timeline.completed = false;
    }
  } else {
    timeline.play();
  }
  if (timeline.paused) {
    timeline.play();
  }
}
