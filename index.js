const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor() {
    this.borad = [];
    this.p1 = null;
    this.p2 = null;
  }
  async init() {
    // init board
    this.board = [];
    for (var i = 0; i < 3; i++) {
      this.board.push([]);
      for (var j = 0; j < 3; j++) {
        this.board[i][j] = 0;
      }
    }

    // init p1
    this.p1 = await new Promise((resolve, reject) => {
      rl.question('> Please enter player 1 name: ', (answer) => resolve(answer));
    });
    // init p2
    this.p2 = await new Promise((resolve, reject) => {
      rl.question('> Please enter player 2 name: ', (answer) => resolve(answer));
    });
  }

  displayBoard() {
    for(var i = 0; i < 3; i++) {
      console.log(` ${this.board[i][0]} | ${this.board[i][1]} | ${this.board[i][2]}`);
      if (i !== 2) {
        console.log('___________');
        console.log('           ');
      }
    }
  }

  displayGame() {
    console.log(`Tic Tac Toe\n`);
    console.log(`Player1: ${this.p1}, Player2: ${this.p2}\n\n`);
    this.displayBoard();
  }

  async playerMove(player) {
    do {
      this.displayGame();
      console.log(`> Player${player} - Please select your next move: `);
      var y = await new Promise((resolve, reject) => { 
        rl.question(`y: `, (answer) => resolve(answer)); 
      });
      var x = await new Promise((resolve, reject) => { 
        rl.question(`x: `, (answer) => resolve(answer)); 
      });
      if (this.board[y][x] !== 0) {
        console.log('> Player move not valid');
      }
    } while (x > -1 && x < 3 && y > -1 && y < 3 && this.board[y][x] !== 0);

    this.board[y][x] = player;
  }

  detectWin() {
    return null;
  }

  async start() {
    await this.init();
    console.log('\n\n');

    var curPlayer = 2;
    while(!this.detectWin()) {
      curPlayer = curPlayer === 1 ? 2 : 1;
      await this.playerMove(curPlayer);
    }
  }

  

}


var temp = new Game();
temp.start();
// temp.displayGame();

