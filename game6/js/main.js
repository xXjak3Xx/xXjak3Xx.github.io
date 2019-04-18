window.onload = function() {
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400 }
            }
        },
        scene: {
            preload: preload,
            create: create,
			update: update
        }
    };

	var game = new Phaser.Game(config);
    
    function preload() {
        // Load an image and call it 'logo'.

    }
    
    var bouncy;
    
    function create() {
		player1 = new Player('Player 1', new TwoTries(), 100);
		player2 = new Player('Player 2', new Flick(), 100);
		turn = 1;
        
    }
    
    function update() {
        //console.log(rollDice(2));
		player1.cards.attack(player1, player2);
		console.log(player2.hp);
    }
};