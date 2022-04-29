const { MineSweeper } = require("../src/minesweeper");
describe("MineSweeper", function () {
  const minesweeper = new MineSweeper();
  it("Input saisie dimension grille", function () {
    const isGrilleOk = minesweeper.Input_dimensionsGrille();
    expect(isGrilleOk).toBe(true);
  });
  it("Input saisie nombre de bombes dans interval", function () {
    const isNbBombeOk = minesweeper.Input_nbBombe();
    expect(isNbBombeOk).toBe(true);
  });
  it("Générer grille ", function () {
    const isGrilleGenerationOk = minesweeper.GenererGrilleVide();
    expect(isGrilleGenerationOk).not.toBeUndefined();
  });
  it("Test si les bombes on bien été générées sur la grille ", function () {
    const nbBombeSurLaGrille = minesweeper.GenererAjouterBombesAGrille();
    expect(minesweeper.NbBombes).toEqual(nbBombeSurLaGrille);
  });
  it("'Suggested Test Cases' de l'exercice ", function () {
    const minesweeper_2 = new MineSweeper();
    const aaa = minesweeper_2.Input_dimensionsGrille_2(4, 4);
    const inputGrid = [
      ["*", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "*", ".", "."],
      [".", ".", ".", "."],
    ];
    const outputGrid_Attendu = [
      ["*", "1", "0", "0"],
      ["2", "2", "1", "0"],
      ["1", "*", "1", "0"],
      ["1", "1", "1", "0"],
    ];
    const grilleGeneree = minesweeper_2.GenererGrille_2(inputGrid);
    expect(grilleGeneree).toEqual(outputGrid_Attendu);
  });
});
