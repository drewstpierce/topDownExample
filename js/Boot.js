var Game = {
    
    
};
   
Game.Boot = function(game) {
    
};

Game.Boot.prototype = {
    init:function() {
        
    
        
        
    },
    
    preload:function(){
        
        this.load.image('preloadBar', 'assets/preloadBar.png');
        
    },
    
    create:function() {
         //scaling options
        
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   
    //have the game centered horizontally
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;  
Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)  
       
        this.stage.disableVisibilityChange = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.state.start('Preloader');
    
    }
    
};


