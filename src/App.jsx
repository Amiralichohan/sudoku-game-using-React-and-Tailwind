import  { useState, useEffect } from "react";
import "./index.css";

const generateSudoku = () => {
  return [
    [1, 0, 0, 4, 5],
    [0, 0, 3, 0, 0],
    [0, 3, 0, 1, 0],
    [0, 0, 4, 0, 0],
    [5, 2, 0, 0, 3],
  ];
};

// Function to check if the Sudoku board is valid
const isValidSudoku = (grid) => {
  for (let i = 0; i < 5; i++) {
    let rowSet = new Set();
    let colSet = new Set();

    for (let j = 0; j < 5; j++) {
      let rowValue = grid[i][j];
      let colValue = grid[j][i];

      // Check row uniqueness
      if (rowValue !== 0) {
        if (rowSet.has(rowValue)) return false;
        rowSet.add(rowValue);
      }

      // Check column uniqueness
      if (colValue !== 0) {
        if (colSet.has(colValue)) return false;
        colSet.add(colValue);
      }
    }
  }
  return true;
};

// Function to check if the Sudoku is completely solved
const isSudokuSolved = (grid) => {
  return grid.flat().every((cell) => cell !== 0) && isValidSudoku(grid);
};

export default function App() {
  const [grid, setGrid] = useState(generateSudoku());
  const [isValid, setIsValid] = useState(true);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    setIsValid(isValidSudoku(grid));
    setIsSolved(isSudokuSolved(grid));
  }, [grid]);

  const handleChange = (row, col, value) => {
    if (value === "" || (value >= 1 && value <= 5)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = value === "" ? 0 : parseInt(value);
      setGrid(newGrid);
    }
  };

  const checkSolution = () => {
    if (isSudokuSolved(grid)) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  };

  const resetGame = () => {
    setGrid(generateSudoku());
    setIsSolved(false);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">5x5 Sudoku</h1>
      <div className="grid grid-cols-5 gap-1 border-2 border-black p-2">
        {grid.map((row, rowIndex) =>
          row.map((num, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="5"
              value={num || ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className="w-12 h-12 text-center border border-gray-400 text-lg font-bold"
            />
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={checkSolution}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Check Solution
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
      {!isValid && <p className="text-red-500 mt-2">Invalid Sudoku!</p>}
      {isSolved && <p className="text-green-500 mt-2">Congratulations! You solved it!</p>}
    </div>
  );
}
