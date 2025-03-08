
import { ReactNode } from "react";

interface AstronautProps {
  className?: string;
  withRocket?: boolean;
}

const Astronaut = ({ className = "", withRocket = true }: AstronautProps) => {
  // Return null instead of rendering the astronaut image
  return null;
};

export default Astronaut;
