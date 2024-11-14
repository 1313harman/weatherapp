///Practicing complex UI 
//Doesn't have any link with weather app, this component only foor practice
import React, { useState } from 'react';

function Array_2D() {

    const [currentBox, setCurrentBox] = useState({ neighbors: [] });

    //wait for the click to restart coloring
    const [isWaitingForClick, setIsWaitingForClick] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);  // To track the current position in the sequence
    const [lastMissedIndex,setLastMissedIndex] = useState(0)
    const chekArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];   // Array to check whether the click is in sequence

    const rows = 15;
    const cols = 15;
    const array2D = [];
    let counter = 1;

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(counter++);
        }
        array2D.push(row);
    }


// 1 2 3  5
    const handleBox = (rowIndex, cellIndex) => {
        return () => {
           
            if (chekArray[currentIndex] === cellIndex) {
                console.log('Index matched');
                const neighbors = [{ row: rowIndex, col: cellIndex },{row: rowIndex, col: cellIndex+1},{row: rowIndex+1, col: cellIndex}];

                
                // Highlight all leftward cells in the current row
                for (let i = cellIndex; i >= 0; i--) {
                    neighbors.push({ row: rowIndex, col: i });
                }
                
                setCurrentBox({ neighbors });
                setCurrentIndex(currentIndex + 1);  // Move to the next position in the sequence
                console.log(currentIndex)
            } else {
                setLastMissedIndex(cellIndex)
                if(chekArray[currentIndex]!=cellIndex)
                    {
                        console.log('You missed the cell');
                    }
                if (isWaitingForClick) {
                    // Reset neighbors to leftmost cells
                    const newNeighbors = [];
                    for (let i = 0; i <= cellIndex; i++) {
                        newNeighbors.push({ row: rowIndex, col: i });
                    }
                        setCurrentBox({ neighbors: newNeighbors });
                        setCurrentIndex(lastMissedIndex+1)
                        setIsWaitingForClick(false);
                    }   

                else {
                    console.log(chekArray[currentIndex])
                    setCurrentBox({ neighbors: [] });
                    console.log(currentIndex)
                    setIsWaitingForClick(true);
                    }
                }
            };
        };

    return (
        <div>
            <div className="grid grid-cols-15 gap-1">
                {/* Mapping rows */}
                {array2D.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {/* Mapping cells */}
                        {row.map((cell, cellIndex) => {
                            // Check if the current cell is a neighbor
                            const isNeighbor = currentBox.neighbors.some(
                                (neighbor) =>
                                    neighbor.row === rowIndex &&
                                    neighbor.col === cellIndex
                            );
                            return (
                                <div
                                    key={cellIndex}
                                    className={`border p-2 ${isNeighbor ? 'bg-red-500' : ''}`}
                                >
                                    <button onClick={handleBox(rowIndex, cellIndex)}>
                                        <div
                                            className={`flex flex-row justify-center h-32 w-32 rounded-lg mt-2 ml-6 shadow-xl ${isNeighbor ? 'bg-red-500' : 'bg-blue-500'}`}
                                        >
                                            {/* {isNeighbor && (
                                                <img src="data:image/jpeg;base64,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" alt="" />
                                            )} */}
                                            {cell}
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Array_2D;
