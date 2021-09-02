const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const validInputs = ["L", "R", "U", "D"];

class Field{
    constructor(field = Field.generateField(5,5,20)) {
        this.field = field;
        this.position = [0, 0];
        this.hBound = this.field[0].length;
        this.vBound = this.field.length;
        console.log(this.field);
        console.log(this.hBound, this.vBound);
    }

    makeMove() {
        const currentPosition = [];
        currentPosition[0] = this.position[0];
        currentPosition[1] = this.position[1];
        let move = prompt('Enter your move (l/r/u/d/e=exit): ');
        move = move.toUpperCase();
        switch (move) {
            case "U":
                this.position[0]-=1;
                break;
            case "D":
                this.position[0]+=1;
                break;
            case "L":
                this.position[1]-=1;
                break;
            case "R":
                this.position[1]+=1;
                break;
            case "E":
                console.log('Exit. Game over');
                return 'game-over'
                break;
            default:
                console.log('Invalid input! Try again.');
                return 'game-on';
                break;
        }
        if ((this.position.some(el => el<0)) || (this.position[0]>=this.hBound) || (this.position[1]>=this.vBound)) {
            console.log('Out of bounds! Game over.');
            return 'game-over'
        }
        else if (this.field[this.position[0]][this.position[1]] === hole) {
            console.log('You fell into a hole! Game over.');
            return 'game-over'
        }
        else if (this.field[this.position[0]][this.position[1]] === hat) {
            console.log('You found the hat! Game over.');
            return 'game-over'
        }
        else {
            this.field[currentPosition[0]][currentPosition[1]] = fieldCharacter;
            this.field[this.position[0]][this.position[1]] = pathCharacter;
            return 'game-on'
        };
    }
    print() {
        this.field.forEach(el => console.log(el.join('')))
    }

    static generateField(height, width, pctg) {
        const f = new Array(height);
        for (let i = 0; i < height; i++) {
            f[i] = new Array(width);
            for (let j = 0; j < width; j++) {
                if (Math.random()*100 < pctg) {
                    f[i][j] = hole;
                }
                else {
                    f[i][j] = fieldCharacter;
                }
            }
        }
        f[0][0] = pathCharacter;

        let hatPositionX = 0;
        let hatPositionY = 0;
        do {
            hatPositionX = Math.floor(Math.random() * width);
            hatPositionY = Math.floor(Math.random() * height);
        } while (hatPositionX * hatPositionY>0);
        f[hatPositionX][hatPositionY] = hat; 

        return f
    }
};



 myField = new Field(); 

let status = "game-on";
while (status === 'game-on') {
    myField.print();
    status = myField.makeMove();
}