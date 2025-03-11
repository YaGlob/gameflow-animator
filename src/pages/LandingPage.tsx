
import { motion } from "framer-motion";
import LottiePlanets from "@/components/LottiePlanets";
import LottieAstronaut from "@/components/LottieAstronaut";
import StarBackground from "@/components/StarBackground";
import TitleSection from "@/components/landing/TitleSection";
import PlayButton from "@/components/landing/PlayButton";
import CornerDecorations from "@/components/landing/CornerDecorations";
import BottomDecoration from "@/components/landing/BottomDecoration";

const LandingPage = () => {
  return (
    <div className="landing-page relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 to-slate-950">
      <StarBackground starCount={200} shootingStarCount={8} cometCount={3} />
      
      <CornerDecorations />

      <div className="scale-75 sm:scale-100">
        <LottiePlanets />
      </div>

      <div className="hidden sm:block">
        <LottieAstronaut />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-screen p-4">
        <TitleSection />
      </div>

      <PlayButton />
      <BottomDecoration />
    </div>
  );
};

export default LandingPage;
