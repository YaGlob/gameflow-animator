import { useState, useRef, useEffect } from "react";
import { SPEAKING_CONTENT, SpeakingExercise } from "@/data/speaking-content";
import { useToast } from "@/hooks/use-toast";

export function useSpeakingGame() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingResult, setRecordingResult] = useState<'success' | 'error' | null>(null);
  const [transcript, setTranscript] = useState('');
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
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

  // Toggle play/pause (recording)
  const togglePlayPause = () => {
    if (!isPlaying) {
      startRecording();
    } else {
      stopRecording();
    }
    setIsPlaying(!isPlaying);
  };

  // Reset timer
  const resetTimer = () => {
    setTimeElapsed(0);
    setIsPlaying(false);
    setRecordingResult(null);
    setTranscript('');
  };

  // Play audio of current exercise using Web Speech API
  const playAudio = () => {
    if (isAudioPlaying) return;
    
    setIsAudioPlaying(true);
    
    // Use the Web Speech API for text-to-speech
    const utterance = new SpeechSynthesisUtterance(currentExercise.text);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Set a voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    // When speech ends
    utterance.onend = () => {
      setIsAudioPlaying(false);
    };
    
    // Handle errors
    utterance.onerror = () => {
      setIsAudioPlaying(false);
      toast.toast({
        title: "Speech Error",
        description: "There was an error with the text-to-speech service.",
        variant: "destructive",
      });
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Start recording user's voice
  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize speech recognition if available
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;
        
        speechRecognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setTranscript(transcript.toUpperCase());
        };
        
        speechRecognitionRef.current.start();
      } else {
        // Fallback for browsers without speech recognition
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        
        toast.toast({
          title: "Recording Started",
          description: "Your browser doesn't support speech recognition. Recording audio only.",
        });
      }
      
      setIsRecording(true);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  // Stop recording and validate
  const stopRecording = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    
    // Validate the transcript against the exercise text
    if (transcript) {
      validateSpeech(transcript);
    } else {
      toast.toast({
        title: "No Speech Detected",
        description: "We couldn't detect any speech. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Validate the user's speech against the exercise text
  const validateSpeech = (userTranscript: string) => {
    const exerciseText = currentExercise.text.toUpperCase();
    
    // Calculate similarity score (simple word match percentage)
    const exerciseWords = exerciseText.split(' ');
    const userWords = userTranscript.split(' ');
    
    let matchedWords = 0;
    exerciseWords.forEach(word => {
      if (userWords.includes(word)) {
        matchedWords++;
      }
    });
    
    const similarityScore = (matchedWords / exerciseWords.length) * 100;
    
    // Determine result based on similarity score
    if (similarityScore >= 70) {
      setRecordingResult('success');
      toast.toast({
        title: "Great Job!",
        description: `You pronounced ${Math.round(similarityScore)}% of the words correctly!`,
        variant: "default",
      });
    } else {
      setRecordingResult('error');
      toast.toast({
        title: "Keep Practicing",
        description: `You pronounced ${Math.round(similarityScore)}% of the words correctly. Try again!`,
        variant: "destructive",
      });
    }
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
    isRecording,
    recordingResult,
    transcript,
    goToNextExercise,
    goToPreviousExercise,
  };
}
