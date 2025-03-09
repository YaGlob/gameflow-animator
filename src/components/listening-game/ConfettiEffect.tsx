
const ConfettiEffect = () => {
  return (
    <style>
      {`
      .confetti {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 100;
        background-image: 
          radial-gradient(circle at 20% 35%, #4fd1ff 0.2%, transparent 0.5%),
          radial-gradient(circle at 75% 44%, #50ff8d 0.2%, transparent 0.4%),
          radial-gradient(circle at 46% 22%, #4fd1ff 0.3%, transparent 0.6%),
          radial-gradient(circle at 83% 66%, #50ff8d 0.2%, transparent 0.4%),
          radial-gradient(circle at 33% 76%, #4fd1ff 0.3%, transparent 0.6%),
          radial-gradient(circle at 80% 20%, #50ff8d 0.4%, transparent 0.8%),
          radial-gradient(circle at 65% 85%, #4fd1ff 0.2%, transparent 0.4%),
          radial-gradient(circle at 13% 55%, #50ff8d 0.3%, transparent 0.6%);
        animation: confetti-fade 3s ease-in forwards;
        background-size: 150% 150%;
      }
      
      @keyframes confetti-fade {
        0% {
          opacity: 0;
          background-position: 0% 0%;
        }
        5% {
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          background-position: 130% 130%;
        }
      }
      `}
    </style>
  );
};

export default ConfettiEffect;
