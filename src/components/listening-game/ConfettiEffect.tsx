
/**
 * ConfettiEffect Component
 * 
 * Creates a confetti-like celebration effect that appears when the user
 * gets an answer correct in the Listening Game. The effect consists of
 * colorful dots that fade in and move across the screen before fading out.
 * 
 * This component uses inline CSS styles to create the animated background
 * pattern, which is more efficient than creating many DOM elements.
 */
const ConfettiEffect = () => {
  return (
    <style>
      {`
      /* Main confetti container that covers the whole screen */
      .confetti {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;  /* Allow clicks to pass through */
        z-index: 100;          /* Show above most other elements */
        
        /* Create multiple colorful dots using radial gradients */
        background-image: 
          radial-gradient(circle at 20% 35%, #4fd1ff 0.2%, transparent 0.5%),
          radial-gradient(circle at 75% 44%, #50ff8d 0.2%, transparent 0.4%),
          radial-gradient(circle at 46% 22%, #4fd1ff 0.3%, transparent 0.6%),
          radial-gradient(circle at 83% 66%, #50ff8d 0.2%, transparent 0.4%),
          radial-gradient(circle at 33% 76%, #4fd1ff 0.3%, transparent 0.6%),
          radial-gradient(circle at 80% 20%, #50ff8d 0.4%, transparent 0.8%),
          radial-gradient(circle at 65% 85%, #4fd1ff 0.2%, transparent 0.4%),
          radial-gradient(circle at 13% 55%, #50ff8d 0.3%, transparent 0.6%);
        
        /* Animation that controls the fade in/out and movement */
        animation: confetti-fade 3s ease-in forwards;
        background-size: 150% 150%;
      }
      
      /* Animation keyframes for the confetti effect */
      @keyframes confetti-fade {
        0% {
          opacity: 0;
          background-position: 0% 0%;        /* Start position */
        }
        5% {
          opacity: 1;                        /* Quickly fade in */
        }
        70% {
          opacity: 1;                        /* Stay visible */
        }
        100% {
          opacity: 0;                        /* Fade out at the end */
          background-position: 130% 130%;    /* Move diagonally down-right */
        }
      }
      `}
    </style>
  );
};

export default ConfettiEffect;
