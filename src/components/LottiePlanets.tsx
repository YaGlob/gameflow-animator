
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottiePlanets = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-20">
      {/* First planet (blue one) positioned in top-right */}
      <div className="absolute top-10 right-10 w-32 h-32 md:w-40 md:h-40 md:right-20">
        <DotLottieReact
          src="https://lottie.host/654eb9ab-7401-496f-a102-63568e98c64f/fj9CbD4sSE.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LottiePlanets;
