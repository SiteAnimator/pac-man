/*
        @package    SiteAnimator\Games\Pac-Man
  
        file:       messageModule.js
        function:   Generates the HTML for text to 
                    display the game screen size is to small
  
        Last revision: 03-10-2022

*/    

// create module function
( function( pacManApp ){
        
    // MODULE: messageModule( html element id: parentId ) named array
        
    pacManApp.game.container.screenToSmall.messageModule = function( parentId ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.parentId = parentId;                           // html element id 
        self.MODULE = 'FullScreenButtonModule';             // string
        self.containerOptions = {                           // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Container' ), // string 
            'element'               :   'div',              // html element type 
            'text'                  :   pacManApp.getText( 'screenToSmall', 'message' ),  // string
        };                                                  // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // create html
            self.createHtml();

        // DONE FUNCTION: construct( void ) void
        };
        self.createHtml = function() {
        // FUNCTION: createHtml( void ) void

            // create container
            pacManApp.appendContainer( self.parentId, self.containerOptions );
                    
        // DONE FUNCTION: createHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void

            // remove container
            pacManApp.getElementById( self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove html
            self.removeHtml();
            
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
    // DONE MODULE: messageModule( html element id: parentId ) named array
    
})( pacManApp );
// done create module function


