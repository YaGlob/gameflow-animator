
import { Story } from "@/components/reading-game/types";

// Sample reading content
export const READING_CONTENT: Story[] = [
  {
    id: 1,
    title: "Fun Stories",
    pages: [
      {
        id: 1,
        paragraphs: [
          {
            id: 1,
            text: "1. Lily cherishes her small kitten named Whiskers. The soft fur feels like velvet beneath her fingers. Gently, Lily strokes Whiskers and offers special treats from her pocket. Each evening finds them curled together on the sofa! Their favorite game involves a simple ball of colorful yarn."
          },
          {
            id: 2,
            text: "2. Ron treasures his shiny bicycle. The brilliant red paint catches sunlight as he rides. Weekends find Ron pedaling through winding park paths with determination. Nothing compares to the sensation of breeze rushing through his hair during these adventures. Neighborhood friends often join him for afternoon cycling excursions!"
          }
        ],
        images: [
          {
            id: 1,
            src: "/images/Visualaid/Lily.png",
            alt: "Lily and her cat Whiskers"
          },
          {
            id: 2,
            src: "/images/Visualaid/Ron.png",
            alt: "Ron on his red bike"
          }
        ],
        questions: [
          {
            id: "q1_1",
            text: "Q) What distinguishes these two passages from each other?",
            answers: [
              { id: "q1_1_a", text: "a) The main characters aren't the same gender." },
              { id: "q1_1_b", text: "b) There aren't any meaningful differences." },
              { id: "q1_1_c", text: "c) Neither character shows affection for anything." },
              { id: "q1_1_d", text: "d) Both characters have identical hair coloring." }
            ],
            correctAnswerId: "q1_1_a"
          },
          {
            id: "q1_2",
            text: "Q) Which color describes Ron's bicycle?",
            answers: [
              { id: "q1_2_a", text: "a) Grey" },
              { id: "q1_2_b", text: "b) Black" },
              { id: "q1_2_c", text: "c) Red" },
              { id: "q1_2_d", text: "d) Pink" }
            ],
            correctAnswerId: "q1_2_c"
          },
          {
            id: "q1_3",
            text: "Q) How would you describe Whiskers?",
            answers: [
              { id: "q1_3_a", text: "a) Lily's feline companion" },
              { id: "q1_3_b", text: "b) Lily's canine friend" },
              { id: "q1_3_c", text: "c) Lily's human friend" },
              { id: "q1_3_d", text: "d) Lily's father" }
            ],
            correctAnswerId: "q1_3_a"
          }
        ]
      },
      {
        id: 2,
        paragraphs: [
          {
            id: 1,
            text: "1. Julia nurtures her small garden with devotion. Vibrant blossoms create a tapestry of colors throughout the seasons. Carefully, Julia waters each plant and ensures they receive ample sunshine. Her patience rewards her with daily blooms throughout spring and summer! Genuine love transforms her simple patch of earth into something extraordinary."
          },
          {
            id: 2,
            text: "2. Lucas passionately plays his elegant piano. The polished black surface gleams under soft lighting. Afternoons find Lucas practicing in the studio until dinner time. Pure joy radiates from him when melodies flow perfectly from his fingertips. Family members gather around to appreciate his growing musical talents!"
          }
        ],
        images: [
          {
            id: 1,
            src: "/images/Visualaid/Julia.png",
            alt: "Julia and her garden"
          },
          {
            id: 2,
            src: "/images/Visualaid/Lucas.png",
            alt: "Lucas playing piano"
          }
        ],
        questions: [
          {
            id: "q2_1",
            text: "Q) What common element connects these passages?",
            answers: [
              { id: "q2_1_a", text: "a) Both characters have passionate interests" },
              { id: "q2_1_b", text: "b) Neither character pursues any hobbies" },
              { id: "q2_1_c", text: "c) Both individuals primarily enjoy athletics" },
              { id: "q2_1_d", text: "d) Piano playing appears in both narratives" }
            ],
            correctAnswerId: "q2_1_a"
          },
          {
            id: "q2_2",
            text: "Q) How would you describe Julia's garden?",
            answers: [
              { id: "q2_2_a", text: "a) Monotone and uninteresting" },
              { id: "q2_2_b", text: "b) Vibrant and diverse" },
              { id: "q2_2_c", text: "c) Impossible to determine" },
              { id: "q2_2_d", text: "d) Exclusively pink and green" }
            ],
            correctAnswerId: "q2_2_b"
          },
          {
            id: "q2_3",
            text: "Q) Where does Lucas typically play his instrument?",
            answers: [
              { id: "q2_3_a", text: "a) Within his residence" },
              { id: "q2_3_b", text: "b) In a dedicated music space" },
              { id: "q2_3_c", text: "c) Among garden plantings" },
              { id: "q2_3_d", text: "d) At a dining establishment" }
            ],
            correctAnswerId: "q2_3_b"
          }
        ]
      }
    ]
  }
];
