import React from 'react';
import './Grid.css'; // Import the CSS file for styling

const Grid = () => {
  return (
    <div className="grid-container">
      {/* Render the grid items */}
      {Array.from({ length: 24 }).map((_, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {Array.from({ length: 7 }).map((_, colIndex) => (
            <div className="grid-item" key={colIndex}>
              {/* Render the content for each grid item */}
              Row {rowIndex + 1}, Column {colIndex + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

// static columns >> events column (pos: absolute) >>
