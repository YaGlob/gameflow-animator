
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GameScreen from "./pages/GameScreen";
import AlphabetsPage from "./pages/AlphabetsPage";
import VisualAidPage from "./pages/VisualAidPage";
import ListeningPage from "./pages/ListeningPage";
import ReadingPage from "./pages/ReadingPage";
import WritingPage from "./pages/WritingPage";
import SpeakingPage from "./pages/SpeakingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to landing page */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
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
