import java.util.*;
import java.io.*;

public class PencilAndPaper {
    int counter;
    ArrayList<Integer> list;
    private static int[][] a;

    public PencilAndPaper(int[][] t) {
        counter = 0;
        a = t;
        list = new ArrayList<Integer>();
        
        for (int h = 0; h < 10; h++) {
            int[][] tmp = copy(a);
            if (complete()) {
                break;
            }
            if (tmp == a) {
                break;
            }
        }

        Backtracking b = new Backtracking(a);
        try {
            b.solve(0, 0);
        } catch (Exception e) {
            a = b.puzzle;
            counter += b.counter;
            System.out.println("This puzzle used also Backtracking method.");
        }

        printPuzzle();
    }

    public void printPuzzle() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                System.out.print(a[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    public void basic() {
        ArrayList<Integer> temp = new ArrayList<Integer>();
        for (int i = 0; i < 9; i++) {
            temp = new ArrayList<Integer>();
            for (int j = 0; j < 9; j++) {
                temp.add(a[i][j]);
            }
            temp = checkArray(temp);
            for (int j = 0; j < 9; j++) {
                a[i][j] = temp.get(j);
            }
        }
        for (int i = 0; i < 9; i++) {
            temp = new ArrayList<Integer>();
            for (int j = 0; j < 9; j++) {
                temp.add(a[j][i]);
            }
            temp = checkArray(temp);
            for (int j = 0; j < 9; j++) {
                a[j][i] = temp.get(j);
            }
        }
        checkBox(0, 0);
        checkBox(0, 3);
        checkBox(0, 6);
        checkBox(3, 0);
        checkBox(3, 3);
        checkBox(3, 6);
        checkBox(6, 0);
        checkBox(6, 3);
        checkBox(6, 6);
    }

    public ArrayList<Integer> checkArray(ArrayList<Integer> row) {
        int i = 0;
        list = resetList();
        for (int j = 0; j < row.size(); j++) {
            if (row.get(j) == 0) {
                i += 1;
            } else {
                list.remove(list.indexOf(row.get(j)));
            }
            if (i > 1) {
                break;
            }
        }
        if (list.size() == 1) {
            row.set(row.indexOf(0), list.get(0));
        }
        return row;
    }

    public void checkBox(int row, int col) {
        ArrayList<Integer> ret = getBox(row, col);
        if (ret.size() == 1) {
            row = (row / 3) * 3;
            col = (col / 3) * 3;
            for (int r = 0; r < 3; r++) {
                for (int c = 0; c < 3; c++) {
                    if (a[row + r][col + c] == 0) {
                        a[row + r][col + c] = ret.get(0);
                    }
                }
            }
        }
    }

    public ArrayList<Integer> getBox(int row, int col) {
        ArrayList<Integer> ret = resetList();
        row = (row / 3) * 3;
        col = (col / 3) * 3;
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                counter++;
                if (a[row + r][col + c] != 0) {
                    ret.remove(ret.indexOf(a[row + r][col + c]));
                }
            }
        }
        return ret;
    }

    public void singleNaked() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (a[i][j] == 0) {
                    ArrayList<Integer> l1 = getRow(i);
                    ArrayList<Integer> l2 = getColumn(j);
                    ArrayList<Integer> l3 = getBox(i, j);
                    ArrayList<Integer> tmp = new ArrayList<Integer>();
                    for (int m = 0; m < 9; m++) {
                        counter++;
                        if (l1.contains(m + 1) && l2.contains(m + 1) && l3.contains(m + 1)) {
                            tmp.add(m + 1);
                        }
                    }
                    if (tmp.size() == 1) {
                        a[i][j] = tmp.get(0);
                    }
                }
            }
        }
    }

    private boolean complete() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (a[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    public int[][] copy(int[][] a) {
        int[][] tmp = new int[9][9];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                tmp[i][j] = a[i][j];
            }
        }
        return tmp;
    }

    private ArrayList<Integer> resetList() {
        ArrayList<Integer> tmp = new ArrayList<>();
        for (int i = 1; i <= 9; i++) {
            tmp.add(i);
        }
        return tmp;
    }

    public ArrayList<Integer> getRow(int row) {
        ArrayList<Integer> ret = resetList();
        for (int c = 0; c < 9; c++) {
            counter++;
            if (a[row][c] != 0) {
                ret.remove(ret.indexOf(a[row][c]));
            }
        }
        return ret;
    }

    public ArrayList<Integer> getColumn(int col) {
        ArrayList<Integer> ret = resetList();
        for (int r = 0; r < 9; r++) {
            counter++;
            if (a[r][col] != 0) {
                ret.remove(ret.indexOf(a[r][col]));
            }
        }
        return ret;
    }

    public static void main(String[] args) {
        int[][] E1 = {
                {3, 0, 9, 0, 7, 0, 2, 0, 0},
                {7, 0, 0, 0, 0, 6, 4, 0, 5},
                {4, 2, 5, 8, 0, 1, 0, 0, 0},
                {2, 9, 0, 0, 0, 0, 7, 1, 0},
                {0, 0, 0, 0, 4, 0, 0, 0, 0},
                {0, 5, 7, 0, 0, 0, 0, 6, 4},
                {0, 0, 0, 1, 0, 2, 9, 4, 3},
                {1, 0, 2, 6, 0, 0, 0, 0, 7},
                {0, 0, 3, 0, 5, 0, 1, 0, 6}
        };
        long startTime = System.currentTimeMillis();
        PencilAndPaper pP = new PencilAndPaper(E1);
        long timeAfter = System.currentTimeMillis();
        System.out.println("Total time is: " + (timeAfter - startTime) + " Millis.");
        System.out.println("Number of comparisons: " + pP.counter);
    }
}
