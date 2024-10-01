/**
 * An interface describing the content of an event.
 * @field date The date of the event.
 * @field image The image to display in the event.
 * @field title The title of the event.
 * @field summary The summary of the event.
 */
export interface EventData {
  date: string;
  image: string;
  title: string;
  summary: string;
}

/**
 * An interface of props for the event components.
 * @field data The content of the event.
 */
export interface EventProps {
  data: EventData;
}
