const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    }

    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if ( this.isHat()) {
                console.log('GZ, you found the hat!');
                playing = false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            default:
                console.log('Enter "u" for up, "d" for down, "l" for left and "r" for right.')
                break;
        }
    }

    isInBounds() {
        return (
            this.locationY >= 0 && this.locationX >= 0 && this.locationY < this.field.length && this.locationX < this.field[0].length
        )
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    print() {
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n')
        console.log(displayString)
    }

    static genereateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                const prob = Math.random();
                field[x][y] = prob > percentage ? fieldCharacter : hole;
            }
        }

        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
}

const myField = new Field(Field.genereateField(10, 10, 0.2));
myField.runGame();