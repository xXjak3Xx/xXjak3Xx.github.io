window.onload = function() {
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
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
        // https://opengameart.org/content/police-2d-sprite
        this.load.image( 'police', 'assets/0.png' );
		this.load.image('textbox', 'assets/box.png');
		
		//https://opengameart.org/content/sara-2-0
    }
    
    
    function create() {
        player = this.physics.add.sprite(100, 400, 'police');
		player.setDisplaySize(100, 200);
		textbox = this.add.image(400, 525, 'textbox');
		textbox.setDisplaySize(850, 150);
		text = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "I Am the Video Game Police \n ", {fontSize: 25}).setOrigin(.5);
		menu = this.add.text(textbox.getCenter().x, textbox.getCenter().y, "", {fontSize: 25, color:"RED"}).setOrigin(.5);
    }
	
	var choices = ["Roomate", "RA", "Neighbor", "Accuse"];
	var choice = 0;
	
	function menuChoice(up, down){
		if(up)
			choice ++;
		if(down)
			choice --;
		
		if(choice >= choices.length)
			choice = 0;
		if(choice < 0)
			choice = choices.length - 1;
		
		let temp;
		let tempText = "";
		let tempMenu = "";
		for(let i = 0; i < choices.length; i++){
			temp = choices[i];
			
			if(choice == i){
				tempMenu += temp;
				for(let j = 0; j < temp.length; j++)
					tempText += " ";
			}
			else{
				tempText += temp;
				for(let j = 0; j < temp.length; j++)
					tempMenu += " ";
			}
			
			if(i % 2 == 0){
				tempText += "    ";
				tempMenu += "    ";
			}
			else{
				tempText += "\n";
				tempMenu += "\n";
			}
		}
		
		text.setText(tempText);
		menu.setText(tempMenu);
	}
	
	function start(){
		return "You're called to Gregory Manson Unniversity to investigate a crime scene in the freshman dorm building. A student named Robert Cook was found murdered in his " +
			"dorm room late in the night, and you've been tasked with investigating and solving this horrible crime. The victim appears to have been killed by a single gunshot wound " +
			"to the chest. Additionally you find the victim's phone, but unfortunately it is passcode protected so no information can be gleaned from it. Who do you wish to investigate?";
	}
	
	//value is array of words to output
	function textOutput(value){
		let retArray, display = "";
		if(value.length > 24)
			retArray = value.slice(24);
		else
			retArray = null;
		
		for(let i = 0; i < value.length && i < 24; i++){
			display += value[i] + " ";
			if((i+1) % 6 == 0)
				display += "\n";
		}
		text.setText(display);
		return retArray;
	}
    
    function update() {
		cursors = this.input.keyboard.addKeys({select: "ENTER", up: "LEFT", down: "RIGHT"});
		input();
    }
	
	var reading = true;
	var release = true;
	var str = true;
	var output = start();
	function input() {
		if(cursors.select.isDown){
			if(release){
				if(reading){
					if(str){
						output = output.split(" ");
						str = false;
					}
					
					output = textOutput(output);
					release = false;
					if(output == null){
						reading = false;
						str = true;
					}
				}
				else{
					menuChoice(false, false);
				}
			}
		}
		else if(cursors.up.isDown){
			if(release){
				release = false;
				if(!reading){
					menuChoice(false, true);
				}
			}
		}
		else if(cursors.down.isDown){
			if(release){
				release = false;
				if(!reading){
					menuChoice(true, false);
				}
			}
		}
		else{
			release = true;
		}
	}
};
