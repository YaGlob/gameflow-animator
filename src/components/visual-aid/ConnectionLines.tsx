
import { RefObject } from "react";

interface ConnectionLinesProps {
  lineRef: RefObject<SVGSVGElement>;
  activeConnection: {
    wordId: number | null;
    imageId: number | null;
  };
  completedConnections: number[];
  getCoordinates: (wordId: number | null, imageId: number | null) => {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null;
}

const ConnectionLines = ({ 
  lineRef, 
  activeConnection, 
  completedConnections, 
  getCoordinates 
}: ConnectionLinesProps) => {
  return (
    <svg 
      ref={lineRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ overflow: 'visible' }}
    >
      {/* Active connection line */}
      {activeConnection.wordId !== null && activeConnection.imageId !== null && (
        <line
          x1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x1 || 0}
          y1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y1 || 0}
          x2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x2 || 0}
          y2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y2 || 0}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      )}
      
      {/* Completed connection lines */}
      {completedConnections.map(id => (
        <line
          key={`connection-${id}`}
          x1={getCoordinates(id, id)?.x1 || 0}
          y1={getCoordinates(id, id)?.y1 || 0}
          x2={getCoordinates(id, id)?.x2 || 0}
          y2={getCoordinates(id, id)?.y2 || 0}
          stroke="#4fd1c5"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
