
import { RefObject } from "react";

/**
 * Props for the ConnectionLines component
 */
interface ConnectionLinesProps {
  lineRef: RefObject<SVGSVGElement>;    // Reference to the SVG element
  activeConnection: {                    // Currently active connection (if any)
    wordId: number | null;               // ID of the selected word
    imageId: number | null;              // ID of the selected image
  };
  completedConnections: number[];        // IDs of connections that are complete
  getCoordinates: (wordId: number | null, imageId: number | null) => {
    x1: number;                          // Starting x-coordinate of the line
    y1: number;                          // Starting y-coordinate of the line
    x2: number;                          // Ending x-coordinate of the line
    y2: number;                          // Ending y-coordinate of the line
  } | null;                              // Function to calculate line positions
}

/**
 * ConnectionLines Component
 * 
 * Renders the SVG lines that connect words to their matching images
 * in the Visual Aid game. Shows both active connections (currently being
 * made) and completed connections (already matched pairs).
 * 
 * @param lineRef - Reference to the SVG element
 * @param activeConnection - Information about the currently active connection
 * @param completedConnections - IDs of completed connections
 * @param getCoordinates - Function to calculate coordinates for the lines
 */
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
      {/* Active connection line - shown while user is making a connection */}
      {activeConnection.wordId !== null && activeConnection.imageId !== null && (
        <line
          x1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x1 || 0}
          y1={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y1 || 0}
          x2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.x2 || 0}
          y2={getCoordinates(activeConnection.wordId, activeConnection.imageId)?.y2 || 0}
          stroke="white"          // White color for active connection
          strokeWidth="2"         // Medium thickness
          strokeDasharray="5,5"   // Dashed line for in-progress connections
        />
      )}
      
      {/* Completed connection lines - permanent lines for matched pairs */}
      {completedConnections.map(id => (
        <line
          key={`connection-${id}`}
          x1={getCoordinates(id, id)?.x1 || 0}
          y1={getCoordinates(id, id)?.y1 || 0}
          x2={getCoordinates(id, id)?.x2 || 0}
          y2={getCoordinates(id, id)?.y2 || 0}
          stroke="#4fd1c5"        // Cyan color for completed connections
          strokeWidth="3"         // Thicker than active connections
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
