Game.GameOver = function(game) {};

Game.GameOver.prototype = {
    create: function() {
console.log('Game Over');
music.stop();

this.gameOverText = this.add.text(this.game.width/2, this.game.height / 2, "Game Over", { font: '16px gold_boxregular', fill: "#fff" });
this.gameOverText.resolution = 3;
this.gameOverText.anchor.setTo(0.5, 0.5);
this.continueText = this.add.text(this.game.width/2, this.game.height / 2 + 12, "Retry", { font: '12px gold_boxregular', fill: "#F7DC6F" });
this.continueText.resolution = 3;
this.continueText.anchor.setTo(0.5, 0.5);
this.quitText = this.add.text(this.game.width/2, this.game.height / 2 + 22, "Quit", { font: '12px gold_boxregular', fill: "#fff" });
this.quitText.resolution = 3;
this.quitText.anchor.setTo(0.5, 0.5);
playerDead = this.add.image(player.x, player.y, 'playerDead');
playerDead.anchor.setTo(0.5, 0.5);

upKey.onDown.add(this.cursorUp, this);
downKey.onDown.add(this.cursorDown, this);
selectKey.onDown.add(this.selection, this);
    },

	update: function() {

    },

    cursorDown: function() {
    	if (this.continueText.fill === "#F7DC6F") {
    		this.continueText.fill = "#fff";
    		this.quitText.fill = "#F7DC6F";
    	} else if (this.continueText.fill === "#fff") {
    		this.continueText.fill = "#F7DC6F";
    		this.quitText.fill = "#fff";
    	}
    },

    cursorUp: function() {
    	if (this.quitText.fill === "#F7DC6F") {
    		this.quitText.fill = "#fff";
    		this.continueText.fill = "#F7DC6F";
    	} else if (this.quitText.fill === "#fff") {
    		this.quitText.fill = "#F7DC6F";
    		this.continueText.fill = "#fff";
    	}
    },

    selection: function() {
    	if ((this.continueText.fill === "#F7DC6F") && (this.quitText.fill === "#fff")) {
    		this.state.start("MainMenu");
    	} else if ((this.continueText.fill === "#fff") && (this.quitText.fill === "#F7DC6F")) {
    		this.state.start("Level1");
    	}
    } 
 };