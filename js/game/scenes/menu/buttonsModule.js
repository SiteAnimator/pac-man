/*
    @package    SiteAnimator\Games\Pac-Man

    file:       buttonsModule.js
    function:   handels displaying the buttons of the menu screen

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: buttonsModule( html element id: parentId ) named array
        
    pacManApp.game.menu.buttonsModule = function( parentId) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = true;                               // boolean
        self.MODULE = 'MenuButtonsModule';                  // string
        self.parentId = parentId;                           // html element id
        self.buttonOptions = {                              // named array 
            'element'           :   'div',                  // html element type 
            'position'          :   'absolute',             // css
            'backgroundColor'   :   'transparent',          // css
            'borderWidth'       :   '1px',                  // css
            'borderColor'       :   'DarkSlateGrey',        // css 
            'borderStyle'       :   'groove',               // css
            'cursor'            :   'pointer',              // css
        };                                                  // done named array  
        self.textOptions = {                                // named array 
            'element'           :   'div',                  // html element type 
            'position'          :   'relative',             // css
            'color'             :   'rgba( 160, 82, 45, 1.0 )',  // css 
            'highlightColor'    :   'rgba( 220, 142, 105, 1.0 )', // css 
            'backgroundColor'   :   'transparent',          // css
            'textAlign'         :   'center',               // css
        };                                                  // done named array  
        self.imageOptions = {                               // named array 
            'element'           :   'div',                  // html element type 
            'position'          :   'relative',             // css
            'zIndex'            :   1,                      // css
            'imageIndexes' : {                              // named array
                'enabled'       :   0,                      // integer               
                'highlight'     :   1,                      // integer               
            },                                              // done named array  
            'backgroundPosition':   '0px 0px',              // css
            'backgroundRepeat'  :   'no-repeat',            // css
        };                                                  // done named array  
        self.buttons = {                                    // named array 
            'about' : {                                     // named array 
                'screenId'      :   'about',                // string
                'button' : {                                // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AboutButton' ), // string 
                },                                          // done named array
                'text' : {                                  // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AboutButtonText' ), // string 
                    'text'      :   pacManApp.getText( 'menuAboutButton' ), // string    
                },                                          // done named array
                'image' : {                                 // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AboutButtonImage' ), // string 
                    'imageUrl'  :   'url( ' + pacManApp.imageDir + 
                                        'menu/aboutButton.png?version=' + pacManApp.version + 
                                    ')',                    // css            
                }                                           // done named array
            },                                              // done named array
            'audio' : {                                     // named array 
                'screenId'      :   'audio',                // string
                'button' : {                                // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AudioButton' ), // string 
                },                                          // done named array
                'text' : {                                  // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AudioButtonText' ), // string 
                    'text'      :   pacManApp.getText( 'ManuAudioButton' ), // string
                },                                          // done named array
                'image' : {                                 // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'AudioButtonImage' ), // string 
                    'imageUrl'  :   'url( ' + pacManApp.imageDir + 
                                        'menu/audioButton.png?version=' + pacManApp.version + 
                                    ')',                    // css            
                }                                           // done named array
            },                                              // done named array
            'highScores' : {                                // named array 
                'screenId'      :   'highScores',           // string
                'button' : {                                // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'HighScoresButton' ), // string 
                },                                          // done named array
                'text' : {                                  // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'HighScoresButtonText' ), // string 
                    'text'      :   pacManApp.getText( 'menuHighScoresButton' )  // string
                },                                          // done named array
                'image' : {                                 // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'HighScoresButtonImage' ), // string 
                    'imageUrl'  :   'url( ' + pacManApp.imageDir + 
                                        'menu/highScoresButton.png?version=' + pacManApp.version + 
                                    ')',                    // css            
                }                                           // done named array
            },                                              // done named array
            'play' : {                                      // named array 
                'screenId'      :   'levelSelection',       // string
                'button' : {                                // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'PlayButton' ), // string 
                },                                          // done named array
                'text' : {                                  // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'PlayButtonText' ), // string 
                    'text'      :   pacManApp.getText( 'menuPlayButton' ), // string
                },                                          // done named array
                'image' : {                                 // named array
                    'id'        :   pacManApp.getUiId( self.MODULE + 'PlayButtonImage' ), // string 
                    'imageUrl'  :   'url( ' + pacManApp.imageDir + 
                                        'menu/playButton.png?version=' + pacManApp.version + 
                                    ')',                    // css            
                }                                           // done named array
            }                                               // done named array
        };                                                  // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void
            
        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.createButtons = function() {
        // FUNCTION: createButtons( void ) void

        // DONE FUNCTION: createButtons( void ) void
        };
        self.removeButtons = function() {
        // FUNCTION: removeButtons( void ) void


        // DONE FUNCTION: removeButtons( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove buttons
            self.removeButtons();
                        
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call global debug
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

        
            // FUNCTION: layoutChange( named array: layout ) void
            layoutChange : function( layout ){
                
                // call internal
                self.layoutChange( layout );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: menuModule( string: sceneId,
    //                          html element id: parentId
    //                          named array: callbacks ) named array
    
})( pacManApp );
// done create module function


