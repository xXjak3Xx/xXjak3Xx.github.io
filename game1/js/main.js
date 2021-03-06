


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

    function preload ()
    {
        //this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
		//this.load.image('test', '../assets/red.png');
		this.load.image('tiles', 'assets/tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/map2.json');
		
		//https://opengameart.org/content/game-character sprite sheet location
		this.load.spritesheet('actor', 'assets/BlobCharacter/Spritesheet/character_walk.png', {frameWidth: 56, frameHeight: 59});
		
		//http://soundbible.com/1949-Pew-Pew.html
		this.load.audio('pew', 'assets/pew.wav');
		
		//http://soundbible.com/1469-Depth-Charge-Short.html
		this.load.audio('boom', 'assets/boom.wav');
    }

    function create ()
    {	
		map = this.make.tilemap({key: 'map', tileWidth: 40, tileHeight: 40});
		tileset = map.addTilesetImage('tileset2', 'tiles');
		level = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		level.setCollisionByProperty({collision: true});
		
		player = this.physics.add.sprite(500, 560, 'actor');
		player.body.maxVelocity.set(300);
		
		this.physics.add.collider(player, level);
		
		
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(player);

		player.setCollideWorldBounds(false);
		
		
		pew = this.sound.add('pew');
		boom = this.sound.add('boom');
		
		this.anims.create({
    		key: 'left',
    		frames: this.anims.generateFrameNumbers('actor', { start: 0, end: 22 }),
    		frameRate: 30,
    		repeat: -1
		});
		
		this.anims.create({
    		key: 'still',
    		frames: this.anims.generateFrameNumbers('actor', { start: 0, end: 0 }),
    		frameRate: 1,
    		repeat: -1
		});
		player.setDisplaySize(38, 38);
		
    }
	
	//-1 is inverted, 0 is none, 1 is normal
	var xGrav = 0;
	var yGrav = 1;
	function update()
	{
		gravity = this.input.keyboard.createCursorKeys();
		cursors = this.input.keyboard.addKeys({left:"A",right:"D",up:"W",down:"S"});
		input();
		var tile = level.getTileAtWorldXY(player.body.x, player.body.y);
		if(tile != null)
			death();
	}
		
	function death()
	{
		boom.play();
		alert('you died');
		location.reload();
	}
		
	function input()
	{
		if(cursors.left.isDown)
		{
    		if(xGrav == 0)//So you don't do stuff when gravity is wonky
			{
				player.setVelocityX(player.body.velocity.x + (Math.abs(yGrav) * -8));
    			player.anims.play('left', true);
				
				//So animations sinc up when upside down
				if(yGrav == 1)
					player.flipX = false;
				else
					player.flipX = true;
			}
		}
		else if (cursors.right.isDown)
		{
			if(xGrav == 0)//So you don't do stuff when gravity is wonky
			{
				player.setVelocityX(player.body.velocity.x + (Math.abs(yGrav) * 8));
    			player.anims.play('left', true);
				
				//So animations sinc up when upside down
				if(yGrav == 1)
					player.flipX = true;
				else
					player.flipX = false;
			}
		}
		else if(cursors.up.isDown)
		{
			if(yGrav == 0)
			{	
				player.setVelocityY(player.body.velocity.y + (Math.abs(xGrav) * -8));//For x gravity
				player.anims.play('left', true);
				
				//So animations sinc up when upside down
				if(xGrav == 1)
					player.flipX = false;
				else
					player.flipX = true;
			}
		}
		else if(cursors.down.isDown)
		{
			if(yGrav == 0)
			{	
				player.setVelocityY(player.body.velocity.y + (Math.abs(xGrav) * 8));//For x gravity
				player.anims.play('left', true);
				
				//So animations sinc up when upside down
				if(xGrav == 1)
					player.flipX = true;
				else
					player.flipX = false;
			}
		}
		else
		{
    		if(xGrav == 0)
			{
				if(player.body.velocity.y == 0)
				{
					player.setVelocityX(0);
				}
			}
			else if(yGrav == 0)
			{
				if(player.body.velocity.x == 0)
				{
					player.setVelocityY(0);
				}
			}
			
			player.anims.play('still', true);
		}
		
		if(gravity.up.isDown)
		{
			player.setGravity(0, -800);
			player.angle = 180;
			
			yGrav = -1;
			xGrav = 0;
			pew.play();
		}
		else if(gravity.down.isDown)
		{
			player.setGravity(0,0);
			player.angle = 0;
			
			yGrav = 1;
			xGrav = 0;
			pew.play();
		}
		else if(gravity.right.isDown)
		{
			player.setGravity(400,-400);
			player.angle = 270;
			
			yGrav = 0;
			xGrav = -1;
			pew.play();
		}
		else if(gravity.left.isDown)
		{
			player.setGravity(-400,-400);
			player.angle = 90;
			
			yGrav = 0;
			xGrav = 1;
			pew.play();
		}
	}}