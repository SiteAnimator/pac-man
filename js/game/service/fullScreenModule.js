/*
    @package    SiteAnimator\Games\Pac-Man

    file:       fullScreenModule.js
    function:   Adds the functions
                    isFullScreen
                    showFullScreen
                    exitFullScreen
                to the game.

    Last revision: 03-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: fullScreenModule( void ) void
        
    // create name space
    pacManApp.game.service = pacManApp.game.service ? pacManApp.game.service : {};
    
    pacManApp.game.service.fullScreenModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'FullScreenModule';                   // string
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to the game
            self.addGameExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addGameExtensions = function(){
        // FUNCTION addGameExtensions( void ) void
        
            // add is full screen
            pacManApp.game.isFullScreen = self.isFullScreen;
            
            // add show full screen
            pacManApp.game.showFullScreen = self.showFullScreen;
            
            // add exit full screen
            pacManApp.game.exitFullScreen = self.exitFullScreen;
            
        // DONE FUNCTION: addGameExtensions( void ) void
        };
        self.removeGameExtensions = function(){
        // FUNCTION removeGameExtensions( void ) void
        
            // remove is full screen
            delete pacManApp.game.isFullScreen;
            
            // remove show full screen
            delete pacManApp.game.showFullScreen;
            
            // remove exit full screen
            delete pacManApp.game.exitFullScreen;
            
        // DONE FUNCTION: removeGameExtensions( void ) void
        };
        self.isFullScreen = function( ) {
        // FUNCTION isFullScreen( void ) boolean
        
            // has full screen element / else
            if( ( document.fullscreenElement && document.fullscreenElement !== null ) ||
                ( document.webkitFullscreenElement && document.webkitFullscreenElement !== null ) ||
                ( document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
                ( document.msFullscreenElement && document.msFullscreenElement !== null ) ){

                // is full screen
                return true;
                
            }
            else {
                
                // ! full screen
                return false;
                
            }
            // has full screen element / else
            
        // DONE FUNCTION isFullScreen( void ) boolean
        };
        self.showFullScreen = function(  ) {
        // FUNCTION: showFullScreen( void ) void
        
            // get container id
            pacManApp.game.getContainerId();
        
            // get element
            let element = document.getElementById( self.containerId );
        
            // get request method
            let requestMethod = element.requestFullScreen || 
                                element.webkitRequestFullScreen || 
                                element.mozRequestFullScreen || 
                                element.msRequestFullScreen;
            // get request method

            // request method exists / else
            if( requestMethod  ) { 

                // call request
                requestMethod.call( element );

                // done
                return;

            } 
            // request method exists / else
    
        // DONE FUNCTION: showFullScreen( void ) void
        };
        self.exitFullScreen = function() {
        // FUNCTION: exitFullScreen( void ) void


            // get request method
            let requestMethod = document.exitFullscreen || 
                                document.webkitExitFullscreen || 
                                document.mozExitFullscreen || 
                                document.msExitFullscreen;
            // get request method

            // request method exists / else
            if( requestMethod  ) { 

                // call request
                requestMethod.bind(document)();

                // done
                return;

            } 
            // request method exists / else
    
            // try older versions
            if ( typeof window.ActiveXObject !== "undefined" ) { 

                // get w script
                let wscript = new ActiveXObject( "WScript.Shell" );

                // w script exists
                if (wscript !== null) {

                    // toggle full screen
                    wscript.SendKeys( "{ESC}" );

                }
                // w script exists

            }
            // try older versions
    
        // DONE FUNCTION: exitFullScreen( void ) void
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

            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: fullScreenModule( void ) void 
    
})( pacManApp );
// done create module function


