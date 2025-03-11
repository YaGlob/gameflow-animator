
interface CometProps {
  id: number;
  left: string;
  top: string;
  delay: string;
}

const Comet = ({ id, left, top, delay }: CometProps) => {
  return (
    <div
      key={`comet-${id}`}
      className="comet"
      style={{
        left,
        top,
        animationDelay: delay
      }}
    />
  );
};

export default Comet;
