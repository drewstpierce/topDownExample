Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {
    create: function () {
        // create main menu text and images -
        
        this.loadingText = this.add.text(this.game.width/2, this.game.height / 2, "Press Enter to start", { font: "10px monospace", fill: "#fff" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.playGame, this);
    },
    playGame: function () {
        this.state.start('Level1');
    }
};