
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameLayout from "@/components/GameLayout";
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
      <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl">
        <div className="relative w-full h-[70vh] bg-gradient-to-b from-blue-900 to-indigo-900 rounded-lg flex items-center justify-center p-6 shadow-2xl">
          {/* Logo or title */}
          <div className="text-white text-6xl font-bold mb-8">Letter Venture</div>
          
          {/* Robot in the bottom right corner */}
          <div className="absolute bottom-6 right-6 z-50">
            <Robot />
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default SplashScreen;
