
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
            text: "1. Lily loves her little cat, Whiskers. Whiskers is soft and cute. Lily likes to pet Whiskers and give her treats. They cuddle together every day! They have lots of fun playing with yarn!"
          },
          {
            id: 2,
            text: "2. Ron loves his big bike. His bike is red. Ron likes to ride his bike in the park. He feels happy when the wind blows through his hair. He loves riding with his friends!"
          }
        ],
        images: [
          {
            id: 1,
            src: "/lovable-uploads/0692117c-23a6-4a57-8e4f-530a1b6ab863.png",
            alt: "Lily and her cat Whiskers"
          },
          {
            id: 2,
            src: "/lovable-uploads/9c5dc57d-39c2-4ac1-b504-8232e674d7ca.png",
            alt: "Ron on his red bike"
          }
        ],
        questions: [
          {
            id: "q1_1",
            text: "Q) Pick a difference between both texts.",
            answers: [
              { id: "q1_1_a", text: "a) The characters are of different genders." },
              { id: "q1_1_b", text: "b) There is no difference." },
              { id: "q1_1_c", text: "c) The characters do not show love." },
              { id: "q1_1_d", text: "d) The characters have the same hair color." }
            ],
            correctAnswerId: "q1_1_a"
          },
          {
            id: "q1_2",
            text: "Q) What colour is Ron's bike?",
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
            text: "Q) Who is Whiskers?",
            answers: [
              { id: "q1_3_a", text: "a) Lily's cat" },
              { id: "q1_3_b", text: "b) Lily's dog" },
              { id: "q1_3_c", text: "c) Lily's friend" },
              { id: "q1_3_d", text: "d) Lily's dad" }
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
            text: "1. Julia loves her little garden. Her garden is colorful and bright. Julia likes to water flowers and give them sunshine. They bloom together every day! They have lots of fun growing with love!"
          },
          {
            id: 2,
            text: "2. Lucas loves his big piano. His piano is black. Lucas plays his piano in the studio. He feels happy when the music sounds beautiful. He loves playing with his family!"
          }
        ],
        images: [
          {
            id: 1,
            src: "/lovable-uploads/ca5f8d39-a241-47e8-b1ee-f127f1c0263b.png",
            alt: "Julia and her garden"
          },
          {
            id: 2,
            src: "/lovable-uploads/9c5dc57d-39c2-4ac1-b504-8232e674d7ca.png",
            alt: "Lucas playing piano"
          }
        ],
        questions: [
          {
            id: "q2_1",
            text: "Q) Pick a similarity between both texts.",
            answers: [
              { id: "q2_1_a", text: "a) Both have a hobby" },
              { id: "q2_1_b", text: "b) Both don't have a hobby" },
              { id: "q2_1_c", text: "c) Both like sports" },
              { id: "q2_1_d", text: "d) Both like playing the piano." }
            ],
            correctAnswerId: "q2_1_a"
          },
          {
            id: "q2_2",
            text: "Q) Julia's garden is...",
            answers: [
              { id: "q2_2_a", text: "a) Dull and black" },
              { id: "q2_2_b", text: "b) Colorful and bright" },
              { id: "q2_2_c", text: "c) No idea" },
              { id: "q2_2_d", text: "d) Pink and green" }
            ],
            correctAnswerId: "q2_2_b"
          },
          {
            id: "q2_3",
            text: "Q) Where does Lucas play piano?",
            answers: [
              { id: "q2_3_a", text: "a) Home" },
              { id: "q2_3_b", text: "b) Studio" },
              { id: "q2_3_c", text: "c) Garden" },
              { id: "q2_3_d", text: "d) Restaurant" }
            ],
            correctAnswerId: "q2_3_b"
          }
        ]
      }
    ]
  }
];
