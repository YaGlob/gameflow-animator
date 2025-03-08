
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface GameLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

const GameLayout = ({ children, showBackButton = true, backTo = "/" }: GameLayoutProps) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-game-dark-blue">
      {/* Circuit board background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{ 
          backgroundImage: "url('/lovable-uploads/7b4da54a-2563-4645-a06c-f750d7bbe916.png')", 
          backgroundBlendMode: "overlay",
        }}
      />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 z-1 opacity-20 bg-[linear-gradient(to_right,#4fd1ff_1px,transparent_1px),linear-gradient(to_bottom,#4fd1ff_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>
      
      {/* Random stars */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-white animate-star-twinkle" style={{animationDelay: "0.5s"}}></div>
      <div className="absolute top-40 right-60 w-1 h-1 rounded-full bg-white animate-star-twinkle" style={{animationDelay: "1.2s"}}></div>
      <div className="absolute bottom-80 left-40 w-1.5 h-1.5 rounded-full bg-white animate-star-twinkle" style={{animationDelay: "2s"}}></div>
      <div className="absolute top-60 right-20 w-2 h-2 rounded-full bg-white animate-star-twinkle" style={{animationDelay: "0.8s"}}></div>

      {/* Back button - larger touch target for mobile */}
      {showBackButton && (
        <Link 
          to={backTo} 
          className="absolute top-4 left-4 z-50 text-white hover:text-game-blue transition-colors p-2 touch-manipulation"
        >
          <ArrowLeft className="h-8 w-8" />
        </Link>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default GameLayout;
