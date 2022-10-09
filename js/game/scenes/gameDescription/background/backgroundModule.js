/*
    @package    SiteAnimator\Games\Pac-Man

    file:       backgroundModule.js
    function:   handels displaying the background 
                of the game description screen

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: backgroundModule( html element id: parentId ) named array
        
    // create name space
    pacManApp.game.gameDescription.background = pacManApp.game.gameDescription.background ? pacManApp.game.gameDescription.background : {};
    
    pacManApp.game.gameDescription.background.backgroundModule = function( parentId ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = true;                               // boolean
        self.MODULE = 'AudioMenuBackgroundModule';          // string
        self.parentId = parentId;                           // html element id
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
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

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
    // DONE MODULE: backgroundModule( html element id: parentId ) named array
    
})( pacManApp );
// done create module function


