
// Types for reading game data structure
export interface Paragraph {
  id: number;
  text: string;
}

export interface Image {
  id: number;
  src: string;
  alt: string;
}

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  correctAnswerId: string;
}

export interface Page {
  id: number;
  paragraphs: Paragraph[];
  images: Image[];
  questions: Question[];
}

export interface Story {
  id: number;
  title: string;
  pages: Page[];
}

// Robot animation states
export type RobotVariant = "normal" | "thinking" | "happy";
