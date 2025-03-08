
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import LandingPage from "./pages/LandingPage";
import GameScreen from "./pages/GameScreen";
import NotFound from "./pages/NotFound";

// Empty placeholder pages for activities
const ReadingPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Reading Activity</h1>
  </div>
);

const WritingPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Writing Activity</h1>
  </div>
);

const SpeakingPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Speaking Activity</h1>
  </div>
);

const ListeningPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Listening Activity</h1>
  </div>
);

const VisualAidPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Visual Aid Activity</h1>
  </div>
);

const AlphabetsPage = () => (
  <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
    <h1 className="text-4xl font-bold">Alphabets Activity</h1>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/game" element={<GameScreen />} />
          
          {/* Activity routes */}
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/visual-aid" element={<VisualAidPage />} />
          <Route path="/alphabets" element={<AlphabetsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
