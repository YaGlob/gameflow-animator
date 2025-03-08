
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameLayout from "@/components/GameLayout";
import Astronaut from "@/components/Astronaut";
import Robot from "@/components/Robot";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to landing page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/landing");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <GameLayout showBackButton={false}>
      <div className="flex flex-col items-center justify-center h-screen w-full max-w-5xl">
        <div className="relative w-full h-[70vh] bg-game-panel rounded-lg flex items-center justify-center p-6 shadow-2xl">
          {/* Animated astronaut */}
          <Astronaut className="absolute top-20 left-20" />
          
          {/* Robot assistant */}
          <Robot className="absolute bottom-6 right-6" />
          
          {/* Logo or title could go here */}
          <div className="hidden text-white text-4xl font-bold">Letter Venture</div>
        </div>
      </div>
    </GameLayout>
  );
};

export default SplashScreen;
