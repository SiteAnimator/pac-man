/*
    @package    SiteAnimator\Games\Pac-Man

    file:       main.js
    function:   This file contains the main application module.    
                handels start after page load
                creates service modules

    Last revision: 22-09-2022
 
*/    

// create module function
( function( pacManApp ){
    
    // MODULE: mainModule( void ) void 
    pacManApp.mainModule = function( ) {
    
        // PRIVATE:
        
        // MEMBERS
        var self = this;                        // object
        self.moduleName = 'main';               // string
        self.modules = {};                      // named array
    
        self.start = function() {
        // FUNCTION: start( void ) void

            // create services
            self.createServices();

            // create animation services
            self.createAnimationServices();

            // create audio services
            self.createAudioServices();

            // create game
            self.createGame();

        // DONE FUNCTION: start( void ) void
        };
        self.createServices = function() {
        // FUNCTION: createServices( void ) void

            // create debugger module
            self.modules.debugger = new pacManApp.service.debuggerModule( pacManApp.debugOptions );

            // create extend module
            self.modules.extend = new pacManApp.service.extendModule( );

            // create get ui id module
            self.modules.getUiId = new pacManApp.service.getUiIdModule( );

            // create html generator module
            self.modules.htmlGenerator = new pacManApp.service.htmlGeneratorModule( );

            // create get element module
            self.modules.getElement = new pacManApp.service.getElementModule( );
            
            // create set style module
            self.modules.setStyle = new pacManApp.service.setStyleModule( );
            
            // create get text module
            self.modules.getText = new pacManApp.service.getTextModule( );
            
            // create get color module
            self.modules.getColor = new pacManApp.service.getColorModule( );
            
            // create event manager module
            self.modules.eventManager = new pacManApp.service.eventManagerModule( );

            // create audio capabilities module
            self.modules.capabilities = new pacManApp.service.eventManagerModule( );

        // DONE FUNCTION: createServices( void ) void
        };
        self.createAnimationServices = function() {
        // FUNCTION: createAnimationServices( void ) void

            // add name space
            self.modules.animations = {};

            // create player module
            self.modules.animations.player = new pacManApp.animations.playerModule( );

        // DONE FUNCTION: createAnimationServices( void ) void
        };
        self.createAudioServices = function() {
        // FUNCTION: createAudioServices( void ) void

            // add name space
            self.modules.audio = {};

            // create capabilities module
            self.modules.audio.capabilities = new pacManApp.audio.capabilitiesModule( );

        // DONE FUNCTION: createAudioServices( void ) void
        };
        self.createGame = function() {
        // FUNCTION: createGame( void ) void

            // create game module
            self.modules.game = new pacManApp.game.gameModule( );
            
        // DONE FUNCTION: createGame( void ) void
        };

        // PUBLIC
        return {

            // FUNCTION: start( void ) void    
            start : function( ){

                // call internal
                self.start( );
    
            }
            
        };
        // DONE PUBLIC
                
    };
    // DONE MODULE: mainModule( void ) void
    
})( pacManApp );
// done create module function
