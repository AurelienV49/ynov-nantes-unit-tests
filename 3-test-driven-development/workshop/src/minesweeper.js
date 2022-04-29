var readline = require('readline-sync');
class MineSweeper {
    // Attributs 
    lignes = 0;
    colonnes = 0;
    nbBombes = 0;
    grille;
    // Constructeurs
    constructor() {}
    // Asseceurs
    get NbLignes() {
        return this.lignes;
    }
    get NbColonnes() {
        return this.colonnes;
    }
    get NbBombes() {
        return parseInt(this.nbBombes);
    }
    set Lignes(l) {
        this.lignes = l;
    }
    set NbColonnes(c) {
        this.lignes = c;
    }
    set NbBombes(c) {
        this.nbBombes = c;
    }
    // Méthodes
    Input_dimensionsGrille() {
        let isGrilleValide = false;
        let _lignes = readline.question("Nombre de lignes (entre 1 et 100): ");
        let _colonnes = readline.question("Nombre de colonne entre (1 et 100): ");
        // Test si la dimension de la grille demandé est dans les limites
        if ((_lignes > 0 && _lignes <= 100) && (_colonnes > 0 && _colonnes <= 100)) {
            this.lignes = _lignes;
            this.colonnes = _colonnes;
            isGrilleValide = true;
        }
        return isGrilleValide;
    }
    Input_dimensionsGrille_2(_lignes, _colonnes) {
        let isGrilleValide = false;
        // Test si la dimension de la grille demandé est dans les limites
        if ((_lignes > 0 && _lignes <= 100) && (_colonnes > 0 && _colonnes <= 100)) {
            this.lignes = _lignes;
            this.colonnes = _colonnes;
            isGrilleValide = true;
        }
        return isGrilleValide;
    }
    Input_nbBombe() {
        let nbBombeMax = (this.lignes * this.colonnes) - 1;
        let _nbBombes = readline.question("Nombre bombes (entre 1 et " + nbBombeMax + "): ");
        if (_nbBombes > 0 && _nbBombes <= nbBombeMax) {
            this.nbBombes = _nbBombes;
            return true;
        }
        return false;
    }
    GenererGrilleVide() {
        // Create one dimensional array
        this.grille = new Array(this.lignes);
        // Loop to create 2D array using 1D array
        for (var i = 0; i < this.lignes; i++) {
            this.grille[i] = new Array(this.colonnes);
        }
        // Initialise la grille à vide == '.'
        for (var i = 0; i < this.lignes; i++) {
            for (var j = 0; j < this.colonnes; j++) {
                this.grille[i][j] = ".";
            }
        }
        return this.grille;
    }
    GenererGrille_2(grd) {
        // Create one dimensional array
        this.grille = new Array(this.lignes);
        // Loop to create 2D array using 1D array
        for (var i = 0; i < this.lignes; i++) {
            this.grille[i] = new Array(this.colonnes);
        }
        // Initialise la grille à vide == '.'
        for (var i = 0; i < this.lignes; i++) {
            for (var j = 0; j < this.colonnes; j++) {
                if (grd[i][j] == "*") {
                    this.grille[i][j] = "*";
                } else if (grd[i][j] == ".") {
                    this.grille[i][j] = ".";
                }
            }
        }
        this.GenererNbBombesParCase();
        // On retourne la grille nouvellement construite
        return this.grille;
    }
    GenererAjouterBombesAGrille() {
        // Pose des bombes
        let _nbBombesAPoser = this.nbBombes;
        let _nbBombesPosees = 0;
        for (let i = 0; _nbBombesAPoser > _nbBombesPosees; i++) {
            let posL = this.getRandomInt(this.lignes);
            let posC = this.getRandomInt(this.colonnes);
            if (this.grille[posL][posC] != "*") {
                this.grille[posL][posC] = "*";
                _nbBombesPosees++;
            }
        }
        return parseInt(_nbBombesPosees);
    }
    GenererNbBombesParCase() {
        let isNbBombesPrCaseOk = false;
        let _nbBombesAdjacentes = 0;
        let _l_moins = 0,
            _l_plus = 0,
            _c_moins = 0,
            _c_plus = 0;
        // Parcours ligne/colonnes
        for (var x = 0; x < this.lignes; x++) {
            for (var y = 0; y < this.colonnes; y++) {
                // Calcul le nombre de bombe adjacente par case
                // Si ce n'est pas une bombe
                if (this.grille[x][y] != "*") {
                    // Calcul des indexes et de leurs limites
                    _l_moins = x - 1 < 0 ? 0 : x - 1;
                    _l_plus = x + 1 >= this.lignes ? x : x + 1;
                    _c_moins = y - 1 < 0 ? 0 : y - 1;
                    _c_plus = y + 1 >= this.colonnes ? y : y + 1;
                    for (var xx = _l_moins; xx <= _l_plus; xx++) {
                        for (var yy = _c_moins; yy <= _c_plus; yy++) {
                            // Compte le nombre de bombes autour, carré de 9 cases
                            if (this.grille[xx][yy] == "*") {
                                _nbBombesAdjacentes++;
                            }
                        }
                    }
                    if (_nbBombesAdjacentes != 0) {
                        if (this.grille[x][y] != ".") {
                            // garde la valeur la plus grande
                            if (parseInt(this.grille[x][y]) < _nbBombesAdjacentes) {
                                this.grille[x][y] = _nbBombesAdjacentes.toString();
                            }
                        } else {
                            // Si pas de valeur nbBombes sur la case
                            this.grille[x][y] = _nbBombesAdjacentes.toString();
                        }
                    }
                    _nbBombesAdjacentes = 0;
                }
            }
        }
        // Remplace les '.' par des '0'
        for (var x = 0; x < this.lignes; x++) {
            for (var y = 0; y < this.colonnes; y++) {
                if (this.grille[x][y] == ".") {
                    this.grille[x][y] = "0";
                }
            }
        }
        return isNbBombesPrCaseOk;
    }
    AfficherGrille() {
        console.log("\nYnov MineSweeper game :");
        for (let index = 0; index < this.colonnes; index++) {
            process.stdout.write("--");
        }
        process.stdout.write("-");
        console.log();
        // Loop to display the elements of 2D array. 
        for (var i = 0; i < this.lignes; i++) {
            for (var j = 0; j < this.colonnes; j++) {
                //  console.log(this.grille[i][j]);
                process.stdout.write("|");
                process.stdout.write(this.grille[i][j]);
            }
            process.stdout.write("|");
            console.log();
        }
        for (let index = 0; index < this.colonnes; index++) {
            process.stdout.write("--");
        }
        process.stdout.write("-");
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
// Pour les tests TDD
module.exports = {
  MineSweeper
}
// Pour jouer au jeu
/* var ret = new MineSweeper_game();
ret.Input_dimensionsGrille();
ret.Input_nbBombe();
ret.GenererGrilleVide();
ret.GenererAjouterBombesAGrille();
ret.GenererNbBombesParCase();
ret.AfficherGrille(); */
/*
const minesweeper_2 = new MineSweeper_game();
const aaa = minesweeper_2.Input_dimensionsGrille_2(4, 4);
const inputGrid = [
    ['*', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['.', '*', '.', '.'],
    ['.', '.', '.', '.']
];
const outputGrid_Attendu = [
    ['*', '0', '0', '0'],
    ['2', '2', '1', '0'],
    ['1', '*', '1', '0'],
    ['1', '1', '1', '0']
];
const grilleGeneree = minesweeper_2.GenererGrille_2(inputGrid);
console.log("ici");
*/