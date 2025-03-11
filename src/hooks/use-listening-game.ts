
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Sample word list - can be expanded with more words
const WORDS = [
  "cat", "dog", "hat", "sun", "moon", 
  "book", "tree", "fish", "bird", "apple",
  "star", "car", "ball", "house", "cake"
];

// Custom hook that contains all the logic for the listening game
export const useListeningGame = () => {
  // State variables to track the game's state
  const [currentWord, setCurrentWord] = useState<string>("");      // The word the user needs to spell
  const [typedWord, setTypedWord] = useState<string>("");          // What the user has typed so far
  const [attempts, setAttempts] = useState<number>(0);             // Number of failed attempts
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);  // Whether the current round is complete
  const [isSpeakerDisabled, setIsSpeakerDisabled] = useState<boolean>(false);  // Whether speaker button is disabled
  const [isSubmitShaking, setIsSubmitShaking] = useState<boolean>(false);      // Animation for wrong answers
  const [robotVariant, setRobotVariant] = useState<"normal" | "thinking" | "happy">("normal");  // Robot expression
  const [showInstructions, setShowInstructions] = useState<boolean>(false);    // Show/hide instructions

  // Get a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);  // Pick a random index
    return WORDS[randomIndex];  // Return the word at that index
  };

  // Initialize the game when component first loads
  useEffect(() => {
    const newWord = getRandomWord();  // Get a random word
    setCurrentWord(newWord);          // Set it as the current word
    setTypedWord("");                 // Clear user input
    setAttempts(0);                   // Reset attempts counter
    setGameCompleted(false);          // Reset game state
  }, []);  // Empty dependency array means this runs once when component mounts

  // Play the audio for the current word using speech synthesis
  const playWordAudio = () => {
    // If the speaker is disabled, do nothing
    if (isSpeakerDisabled) return;
    
    // Disable the speaker button to prevent multiple clicks
    setIsSpeakerDisabled(true);
    setRobotVariant("thinking");  // Show thinking robot
    
    // Create a new speech utterance with the current word
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.8;  // Slightly slower for better clarity
    
    // When the speech ends, re-enable the speaker button
    utterance.onend = () => {
      setIsSpeakerDisabled(false);
      setRobotVariant("normal");  // Return to normal robot
    };
    
    // Start speaking the word
    window.speechSynthesis.speak(utterance);
  };

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    // If the game is already completed, ignore key presses
    if (gameCompleted) return;
    
    if (key === "delete") {
      // Handle backspace/delete key - remove last character
      setTypedWord(prev => prev.slice(0, -1));
    } else {
      // Handle letter keys - add to typed word
      setTypedWord(prev => prev + key);
    }
  };

  // Handle word submission (checking if it's correct)
  const handleSubmit = () => {
    // Don't submit if nothing is typed
    if (typedWord.trim() === "") return;
    
    // Check if the typed word matches the current word (case insensitive)
    if (typedWord.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer!
      setGameCompleted(true);
      setRobotVariant("happy");
      toast({
        title: "Great job!",
        description: `You spelled "${currentWord}" correctly!`,
        variant: "default",
      });
      
      // Show celebration animation
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      document.body.appendChild(confetti);
      
      // Remove the animation element after 3 seconds
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    } else {
      // Incorrect answer - increment attempts counter
      setAttempts(prev => prev + 1);
      setIsSubmitShaking(true);
      
      // Stop shaking animation after 0.5 seconds
      setTimeout(() => {
        setIsSubmitShaking(false);
      }, 500);
      
      // After 5 attempts, show the correct answer
      if (attempts >= 4) {
        toast({
          title: "Keep practicing!",
          description: `The correct spelling was "${currentWord}".`,
          variant: "destructive",
        });
        setGameCompleted(true);
      } else {
        toast({
          title: "Try again!",
          description: "That's not quite right. Listen carefully and try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Move to the next word
  const handleNext = () => {
    const newWord = getRandomWord();   // Get a new random word
    setCurrentWord(newWord);           // Set it as the current word
    setTypedWord("");                  // Clear user input
    setAttempts(0);                    // Reset attempts counter
    setGameCompleted(false);           // Reset game state
    setRobotVariant("normal");         // Reset robot expression
  };

  // Return all the values and functions needed by the listening game component
  return {
    currentWord,
    typedWord,
    attempts,
    gameCompleted,
    isSpeakerDisabled,
    isSubmitShaking,
    robotVariant,
    showInstructions,
    setShowInstructions,
    handleKeyPress,
    handleSubmit,
    handleNext,
    playWordAudio,
    isCorrect: typedWord.toLowerCase() === currentWord.toLowerCase()  // Check if current input is correct
  };
};
