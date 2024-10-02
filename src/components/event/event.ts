/**
 * An interface describing the content of an event.
 * @field title The title of the event.
 * @field summary The summary of the event.
 * @field image The image to display in the event.
 * @field date The date of the event.
 */
export interface EventData {
  title: string;
  summary: string;
  image?: string;
  date?: string;
}

/**
 * An interface of props for the event components.
 * @field data The content of the event.
 */
export interface EventProps {
  data: EventData;
}
