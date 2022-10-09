/*
    @package    SiteAnimator\Games\Pac-Man

    file:       gameModule.js
    function:   Creates the pac man game

    Last revision: 26-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: gameModule( void ) void
        
    // create name space
    pacManApp.game = pacManApp.game ? pacManApp.game : {};
    
    pacManApp.game.gameModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = true;                               // boolean
        self.MODULE = 'GameModule';                         // string
        self.scenes = {                                     // named array 
            'splashScreen' : {                              // named array 
                'module'        :   null,                   // module object / null
                'moduleObject'  :   pacManApp.game.splashScreen.splashScreenModule, // module object / null
            },                                              // done named array 
            'menu' : {                                      // named array 
                'module'        :   null,                   // module object / null
                'moduleObject'  :   pacManApp.game.menu.menuModule, // module object / null
            },                                              // done named array 
            'about' : {                                     // named array 
                'module'        :   null,                   // module object / null
                'moduleObject'  :   pacManApp.game.about.aboutModule, // module object / null
            },                                              // done named array 
            'gameAudioControl' : {                          // named array 
                'module'        :   null,                   // module object / null
//                'moduleObject'  :   pacManApp.game.audio.controlModule, // module object / null
            },                                              // done named array 
            'gameHighScores' : {                            // named array 
                'module'        :   null,                   // module object / null
//                'moduleObject'  :   pacManApp.game.highScores.highScoresModule, // module object / null
            },                                              // done named array 
            'levelSelection' : {                            // named array 
                'module'        :   null,                   // module object / null
//                'moduleObject'  :   pacManApp.game.levelSelection.levelSelectionModule, // module object / null
            },                                              // done named array 
            'gameDescription' : {                           // named array 
                'module'        :   null,                   // module object / null
//                'moduleObject'  :   pacManApp.game.description.descriptionModule, // module object / null
            },                                              // done named array 
            'levelGame' : {                                 // named array 
                'module'        :   null,                   // module object / null
//                'moduleObject'  :   pacManApp.game.level.levelModule, // module object / null
            },                                              // done named array 
        };                                                  // done named array  
        self.startScreenId = 'about';                // string
        self.modules = {};                                  // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // create services
            self.createServices();

            // create container
            self.createContainer();

            // add the extensions to game
            self.addGameExtensions();
            
            // add events
            self.addEvents();
 
            // adjust layout
            self.layoutChange();

            // start
            self.start();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createServices = function() {
        // FUNCTION: createContent( void ) void

            // get full screen module
            let fullscreenModule = pacManApp.game.service.fullScreenModule;

            // add full screen service
            self.modules.fullscreen = new fullscreenModule( );

        // DONE FUNCTION: createServices( void ) void
        };
        self.createContainer = function() {
        // FUNCTION: createContainer( void ) void

            // get container module
            let containerModule = pacManApp.game.container.containerModule;

            // create container module
            self.modules.container = new containerModule( );

        // DONE FUNCTION: createContainer( void ) void
        };
        self.addGameExtensions = function(){
        // FUNCTION addGameExtensions( void ) void
        
            // add show game scene
            pacManApp.game.showScene = self.showScene;
            
        // DONE FUNCTION: addGameExtensions( void ) void
        };
        self.removeGameExtensions = function(){
        // FUNCTION removeGameExtensions( void ) void
        
            // add show game screen
            delete pacManApp.game.showScene;
            
        // DONE FUNCTION: removeGameExtensions( void ) void
        };
        self.addEvents = function() {
        // FUNCTION: addEvents( void ) void

            // add window.onresize
            addEventListener( 'resize', self.layoutChange );

        // DONE FUNCTION: addEvents( void ) void
        };
        self.removeEvents = function() {
        // FUNCTION: removeEvents( void ) void

            // remove window.onresize
            removeEventListener( 'resize', self.layoutChange );

        // DONE FUNCTION: removeEvents( void ) void
        };
        self.start = function() {
        // FUNCTION: start( void ) void
            
            // show screen
            self.showScene( self.startScreenId );

        // DONE FUNCTION: start( void ) void
        };
        self.showScene = function( sceneId ) {
        // FUNCTION: showScene( string: sceneId ) void
        
            // debug
            self.debug( 'show scene: ' + sceneId );
            
            // hide scene
            self.hideScene();
        
            // create callbacks
            let callbacks = {
                'hideReady'     :   self.sceneHideReady   
            };
            // create callbacks
        
            // loop over scenes
            Object.entries( self.scenes ).forEach( ( [key, scene] ) => {

                // id is scene
                if( sceneId === key ){
                
                    // create module
                    self.scenes[key]['module'] = new scene['moduleObject']( key,
                                                                            pacManApp.game.getContainerId(),
                                                                            callbacks ); 
                
                    // show module
                    self.scenes[key]['module'].show();
                    
                }
                // id is scene
        
            });
            // loop over screens
            
        // DONE FUNCTION: showScene( string: sceneId ) void
        };
        self.hideScene = function() {
        // FUNCTION: hideScene( void ) void

            // loop over scenes
            Object.entries( self.scenes ).forEach( ( [key, scene] ) => {
            
                // module exists
                if( self.scenes[key]['module'] !== null ){
                    
                    // debug
                    self.debug( 'hide scene: ' + key );
            
                    // destroy module
                    self.scenes[key]['module'].hide( );

                }
                // module exists
                
            });
            // loop over scenes
            
        // DONE FUNCTION: hideScene( void ) void
        };
        self.sceneHideReady = function( sceneId ) {
        // FUNCTION: sceneHideReady( string: sceneId ) void

            // debug
            self.debug( 'hide scene: ' + sceneId );
                    
            // destroy module
            self.scenes[sceneId]['module'].destruct();

            // unset module
            self.scenes[sceneId]['module'] = null;

        // DONE FUNCTION: sceneHideReady( string: sceneId ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) void
            
            // call container
            let layout = self.modules.container.layoutChange( );
            
            // loop over scenes
            Object.entries( self.scenes ).forEach( ( [key, scene] ) => {
            
                // module exists
                if( self.scenes[key]['module'] !== null ){
                    
                    // destroy module
                    self.scenes[key]['module'].layoutChange( layout );

                }
                // module exists
                
            });
            // loop over scenes
            
        // DONE FUNCTION: layoutChange( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove game extensions
            self.removeGameExtensions();
            
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call app debug
                pacManApp.debug( self.MODULE + ' ' + message );
                
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: gameModule( void ) void 
    
})( pacManApp );
// done create module function


