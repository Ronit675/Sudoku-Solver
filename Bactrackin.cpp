public class Backtracking {
    int counter;
    public int[][] puzzle;

    public Backtracking(int[][] input) {
        counter = 0;
        puzzle = input;
    }

    public boolean solve(int row, int col) {
        if (row == 9) {
            return true; 
        }

        if (col == 9) {
            return solve(row + 1, 0);
        }

        if (puzzle[row][col] != 0) {
            return solve(row, col + 1);
        }

        for (int digit = 1; digit <= 9; digit++) {
            if (checkRow(row, digit) && checkCol(col, digit) && checkBox(row, col, digit)) {
                puzzle[row][col] = digit;
                if (solve(row, col + 1)) {
                    return true;
                }
                puzzle[row][col] = 0;
            }
        }
        return false;
    }

    protected boolean checkRow(int row, int digit) {
        for (int col = 0; col < 9; col++) {
            counter++;
            if (puzzle[row][col] == digit) {
                return false;
            }
        }
        return true;
    }

    protected boolean checkCol(int col, int digit) {
        for (int row = 0; row < 9; row++) {
            counter++;
            if (puzzle[row][col] == digit) {
                return false;
            }
        }
        return true;
    }

    protected boolean checkBox(int row, int col, int digit) {
        row = (row / 3) * 3;
        col = (col / 3) * 3;

        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                counter++;
                if (puzzle[row + r][col + c] == digit) {
                    return false;
                }
            }
        }
        return true;
    }
}
