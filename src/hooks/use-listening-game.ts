
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Sample word list - can be expanded
const WORDS = [
  "cat", "dog", "hat", "sun", "moon", 
  "book", "tree", "fish", "bird", "apple",
  "star", "car", "ball", "house", "cake"
];

export const useListeningGame = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [typedWord, setTypedWord] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isSpeakerDisabled, setIsSpeakerDisabled] = useState<boolean>(false);
  const [isSubmitShaking, setIsSubmitShaking] = useState<boolean>(false);
  const [robotVariant, setRobotVariant] = useState<"normal" | "thinking" | "happy">("normal");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Get a random word from the list
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  };

  // Initialize the game
  useEffect(() => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setTypedWord("");
    setAttempts(0);
    setGameCompleted(false);
  }, []);

  // Play the audio for the current word
  const playWordAudio = () => {
    if (isSpeakerDisabled) return;
    
    setIsSpeakerDisabled(true);
    setRobotVariant("thinking");
    
    // In a real implementation, this would use a proper text-to-speech API
    // For now, we'll use the browser's built-in speech synthesis
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.8; // Slightly slower for better clarity
    
    utterance.onend = () => {
      setIsSpeakerDisabled(false);
      setRobotVariant("normal");
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    if (gameCompleted) return;
    
    if (key === "delete") {
      setTypedWord(prev => prev.slice(0, -1));
    } else {
      setTypedWord(prev => prev + key);
    }
  };

  // Handle word submission
  const handleSubmit = () => {
    if (typedWord.trim() === "") return;
    
    if (typedWord.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer
      setGameCompleted(true);
      setRobotVariant("happy");
      toast({
        title: "Great job!",
        description: `You spelled "${currentWord}" correctly!`,
        variant: "default",
      });
      
      // Show success animation
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    } else {
      // Incorrect answer
      setAttempts(prev => prev + 1);
      setIsSubmitShaking(true);
      
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
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setTypedWord("");
    setAttempts(0);
    setGameCompleted(false);
    setRobotVariant("normal");
  };

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
    isCorrect: typedWord.toLowerCase() === currentWord.toLowerCase()
  };
};
