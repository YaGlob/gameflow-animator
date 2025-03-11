
/**
 * Types for reading game data structure
 */

/**
 * Paragraph - A single block of text in a reading passage
 */
export interface Paragraph {
  id: number;    // Unique identifier
  text: string;  // Content of the paragraph
}

/**
 * Image - An illustration associated with the story
 */
export interface Image {
  id: number;    // Unique identifier
  src: string;   // Path to the image file
  alt: string;   // Alt text for accessibility
}

/**
 * Answer - A possible answer to a question
 */
export interface Answer {
  id: string;    // Unique identifier
  text: string;  // Text of the answer option
}

/**
 * Question - A comprehension question about the story
 */
export interface Question {
  id: string;            // Unique identifier
  text: string;          // Text of the question
  answers: Answer[];     // Available answer options
  correctAnswerId: string; // ID of the correct answer
}

/**
 * Page - A single page in the story with text, images, and questions
 */
export interface Page {
  id: number;          // Unique identifier
  paragraphs: Paragraph[]; // Text paragraphs on this page
  images: Image[];         // Images on this page
  questions: Question[];   // Questions for this page
}

/**
 * Story - A complete reading story with multiple pages
 */
export interface Story {
  id: number;       // Unique identifier
  title: string;    // Title of the story
  pages: Page[];    // Pages in the story
}

/**
 * Robot animation states for visual feedback
 */
export type RobotVariant = "normal" | "thinking" | "happy";
