
import { useState, useRef, useEffect } from "react";
import { SPEAKING_CONTENT, SpeakingExercise } from "@/data/speaking-content";
import { useToast } from "@/hooks/use-toast";

export function useSpeakingGame() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toast = useToast();

  const currentExercise = SPEAKING_CONTENT[currentExerciseIndex];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => setIsAudioPlaying(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset timer
  const resetTimer = () => {
    setTimeElapsed(0);
    setIsPlaying(false);
  };

  // Play audio of current exercise
  const playAudio = () => {
    if (!audioRef.current) return;
    
    // This would normally use a real TTS API
    // For now, we'll just simulate the audio playing
    setIsAudioPlaying(true);
    
    toast.toast({
      title: "Audio Feature",
      description: "In a production environment, this would use a text-to-speech API to read the text aloud.",
      duration: 3000,
    });
    
    // Simulate audio playing for 3 seconds
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 3000);
  };

  // Go to next exercise
  const goToNextExercise = () => {
    if (currentExerciseIndex < SPEAKING_CONTENT.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetTimer();
    } else {
      // Loop back to the first exercise if we're at the end
      setCurrentExerciseIndex(0);
      resetTimer();
      toast.toast({
        title: "All exercises completed!",
        description: "Starting from the beginning again.",
        duration: 3000,
      });
    }
  };

  // Go to previous exercise
  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      resetTimer();
    }
  };

  return {
    currentExercise,
    isPlaying,
    timeElapsed,
    formatTime,
    togglePlayPause,
    resetTimer,
    playAudio,
    isAudioPlaying,
    goToNextExercise,
    goToPreviousExercise,
  };
}
