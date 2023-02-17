"use strict";
const {
  createBoard,
  stackRight,
  stackLeft,
  getHorizontalAdjacentPieces,
  getVerticalAdjacentPieces,
  getForwardDiagonalAdjacentPieces,
  getBottomLeft,
  getTopRight,
  isWinningMove,
} = require("../src/sideStacker.js");

it("should create a new board with 7 rows and 7 columns", () => {
  const board = createBoard();
  expect(board.length).toBe(7);
  expect(board[0].row.length).toBe(7);
});

describe("stacking Right", () => {
  test("stack player x to the rightCount of an empty row", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedRight = stackRight(row, "x");
    expect(stackedRight.row.length).toBe(7);
    expect(stackedRight.row[6]).toBe("x");
    expect(stackedRight.rightCount).toBe(1);
  });

  test("stack player o to the rightCount of an empty row", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedRight = stackRight(row, "o");
    expect(stackedRight.row.length).toBe(7);
    expect(stackedRight.row[6]).toBe("o");
    expect(stackedRight.rightCount).toBe(1);
  });

  test("stack player x to the rightCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, "x"],
      leftCount: 0,
      rightCount: 1,
    };
    const stackedRight = stackRight(row, "x");
    expect(stackedRight.row[5]).toBe("x");
    expect(stackedRight.rightCount).toBe(2);
  });
});

describe("stacking Left", () => {
  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row[0]).toBe("o");
    expect(stackedLeft.leftCount).toBe(1);
  });

  test("stack player x to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "x");
    expect(stackedLeft.row[0]).toBe("x");
    expect(stackedLeft.leftCount).toBe(1);
  });

  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: ["x", 0, 0, 0, 0, 0, 0],
      leftCount: 1,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row[1]).toBe("o");
    expect(stackedLeft.leftCount).toBe(2);
  });
});

describe("stacking both ends", () => {
  test("stack player o to the leftCount of row with one x piece", () => {
    const row = {
      row: [0, 0, 0, 0, 0, 0, 0],
      leftCount: 0,
      rightCount: 0,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row[0]).toBe("o");
    expect(stackedLeft.leftCount).toBe(1);

    const stackedRight = stackRight(row, "x");
    expect(stackedLeft.row[6]).toBe("x");
    expect(stackedLeft.rightCount).toBe(1);
  });

  test("stack player x to the leftCount of row with one x piece", () => {
    const row = {
      row: ["x", "x", "o", 0, "x", "o", "x"],
      leftCount: 3,
      rightCount: 3,
    };
    const stackedLeft = stackLeft(row, "x");
    expect(stackedLeft.row[3]).toBe("x");
    expect(stackedLeft.leftCount).toBe(4);
    expect(stackedLeft.row).toEqual(["x", "x", "o", "x", "x", "o", "x"]);
  });

  test("don't stack anymore if row its already filled", () => {
    const row = {
      row: ["x", "x", "o", "x", "x", "o", "x"],
      leftCount: 4,
      rightCount: 3,
    };
    const stackedLeft = stackLeft(row, "o");
    expect(stackedLeft.row.length).toBe(7);
    expect(stackedLeft.row).toEqual(["x", "x", "o", "x", "x", "o", "x"]);
    expect(stackedLeft.leftCount).toBe(4);
  });
});

describe("board", () => {
  test("is empty", () => {
    const board = createBoard();
    const expectedBoard = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    expect(board).toEqual(expectedBoard);
  });
});

describe("get horizontal played row", () => {
  test("empty board", () => {
    const board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: stackedLeft.leftIndex, // 0 base index
    };
    expect(getHorizontalAdjacentPieces(board, move)).toEqual(["o", 0, 0, 0]);
  });

  test("right of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    board[firsRow] = stackRight(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: board[firsRow].rightIndex, // 0 base index
    };
    expect(getHorizontalAdjacentPieces(board, move)).toEqual([0, 0, 0, "o"]);
  });

  test("center of board", () => {
    let board = [
      { row: [0, 0, 0, 0, "x", "o", "o"], leftCount: 0, rightCount: 3 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    board[firsRow] = stackRight(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: board[firsRow].rightIndex, // 0 base index
    };
    const expectedArray = [0, 0, 0, "o", "x", "o", "o"];
    expect(getHorizontalAdjacentPieces(board, move)).toEqual(expectedArray);
  });
});

describe("get vertical played column", () => {
  test("empty board firsts row", () => {
    const board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      column: stackedLeft.leftIndex, // 0 base index
    };
    const expectedColumn = ["o", 0, 0, 0];
    expect(getVerticalAdjacentPieces(board, move)).toEqual(expectedColumn);
  });

  test("empty board last row of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const lastRow = 6;
    board[lastRow] = stackRight(board[lastRow], "o");
    const move = {
      row: lastRow,
      column: board[lastRow].rightIndex, // 0 base index
    };

    expect(getVerticalAdjacentPieces(board, move)).toEqual([0, 0, 0, "o"]);
  });

  test("vertical center of board", () => {
    let board = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: ["o", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const centerRow = 3;
    board[centerRow] = stackLeft(board[centerRow], "o");
    const move = {
      row: centerRow,
      column: board[centerRow].leftIndex, // 0 base index
    };
    const verticalAdjacentPieces = getVerticalAdjacentPieces(board, move);
    const expectedArray = [0, "o", "x", "o", 0, "x", 0];

    expect(verticalAdjacentPieces.length).toBe(7);
    expect(verticalAdjacentPieces).toEqual(expectedArray);
  });
});

describe("diagonal functions", () => {
    test("bottom left to top right of 0,0 to be 0,0", () => {
        const expectedBottomLeft = { bottom: 0, left: 0 };
        const expectedTopRight = { top: 0, right: 0 };
        const  bottomLeft = getBottomLeft(0, 0);
        const  topRight = getTopRight(0, 0);
        expect(bottomLeft).toEqual(expectedBottomLeft);
        expect(topRight).toEqual(expectedTopRight);
    });

    test("bottom left to top right second row", () => {
        const expectedTopRight = { top: 0, right: 1 };
        const  topRight = getTopRight(1, 0);
        expect(topRight).toMatchObject(expectedTopRight);
    });

    test("bottom row left column", () => {
        const expectedTopRight = { top: 3, right: 3 };
        const  topRight = getTopRight(6, 0);
        expect(topRight).toMatchObject(expectedTopRight);
    });

    test("bottom left", () => {
        const expectedBottomLeft = { bottom: 1, left: 0 };
        const  bottomLeft = getBottomLeft(0, 1);
        expect(bottomLeft).toMatchObject(expectedBottomLeft);
    });

    test("bottom left 3,3 to be 6,0", () => {
        const expectedBottomLeft = { bottom: 6, left: 0 };
        const  bottomLeft = getBottomLeft(3, 3);
        expect(bottomLeft).toMatchObject(expectedBottomLeft);
    });

    test("bottom left 0,6 to be 3,3", () => {
        const expectedBottomLeft = { bottom: 3, left: 3 };
        const  bottomLeft = getBottomLeft(0, 6);
        expect(bottomLeft).toMatchObject(expectedBottomLeft);
    });

    test("bottom left to top right of 6,6 to be 6,6", () => {
        const expectedBottomLeft = { bottom: 6, left: 6 };
        const expectedTopRight = { top: 6, right: 6 };
        const  bottomLeft = getBottomLeft(6, 6);
        const  topRight = getTopRight(6, 6);
        expect(bottomLeft).toEqual(expectedBottomLeft);
        expect(topRight).toEqual(expectedTopRight);
    });
});

/*
describe("get played adjacent forward diagonal pieces", () => {
  let board = [
    { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    { row: ["o", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
    { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
    { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    { row: ["x", 0, 0, 0, 0, 0, 0], leftCount: 1, rightCount: 0 },
    { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
  ];
  const firstRow = 0;
  board[firstRow] = stackLeft(board[firstRow], "o");
  const move = {
    row: firstRow,
    column: board[firstRow].leftIndex, // 0 base index
  };
  const forwardDiagonalPieces = getForwardDiagonalAdjacentPieces(board, move);
  expect(move.column).toBe(0);
  expect(move.row).toBe(0);
  expect(forwardDiagonalPieces.length).toBe(1);
  expect(forwardDiagonalPieces).toEqual(expectedArray);
});
*/

describe("get played adjacent backward diagonal pieces", () => {

})

describe("win condition", () => {
  test("empty board", () => {
    const board = createBoard();
    const expectedBoard = [
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
      { row: [0, 0, 0, 0, 0, 0, 0], leftCount: 0, rightCount: 0 },
    ];
    const firsRow = 0;
    const stackedLeft = stackLeft(board[firsRow], "o");
    const move = {
      row: firsRow,
      col: stackedLeft.leftCount,
    };
    expect(isWinningMove(move, board)).toBe(false);
  });
});
