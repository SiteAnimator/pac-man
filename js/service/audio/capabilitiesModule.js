/*
    @package    SiteAnimator\Games\Pac-Man

    file:       capabilitiesModule.js
    function:   Adds the function getUniqueId to the application
                generates an unique id from a string
                return: string

    Last revision: 25-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: capabilitiesModule( void ) void
        
    // create name space
    pacManApp.audio = pacManApp.audio ? pacManApp.audio : {};
    
    pacManApp.audio.capabilitiesModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'AudioCapabilitiesModule';            // string
        self.soundTypes = [ "ogg", "wav", "mp3" ];          // array
        self.playableSoundTypes = [];                       // array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // get capabilities
            self.getCapabilities();
            
            // add the extensions to app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add can play audio type
            pacManApp.canPlayAudioType = self.canPlayType;
                        
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.canPlayType = function( type ) {
        // FUNCTION: canPlayType( string: type ) boolean
            
            // playable sound types has type
            if( self.playableSoundTypes.indexOf( type ) ){
                
                // return can play type
                return true;
                
            }
            // playable sound types has type
            
            // return cannot play type
            return false;
                        
        // DONE FUNCTION: canPlayType( string: type ) boolean
        };
        self.getCapabilities = function() {
        // FUNCTION: getCapabilities( void ) void
            
            // debug info
            self.debug( 'getCapabilities' );

            // create audio
            let audio = new Audio();
            
            // audio ! exists
            if( !audio ){
                
                // done
                return;
                
            }
            // audio ! exists
            
            // loop over sound types
            for( var i = 0; i < self.soundTypes.length; i++ ){

                // can play sound type
                if( audio.canPlayType( "audio/" + self.soundTypes[i] ) ){
                    
                    // add to playable sound types
                    self.playableSoundTypes.push( self.soundTypes[i] );
                    
                }
                // can play sound type
                
            }
            // loop over sound types
            
            // debug info
            self.debug( 'sound Capabilities: ' + self.playableSoundTypes.join() );

        // DONE FUNCTION: getCapabilities( void ) void
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
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: capabilitiesModule( void ) void 
    
})( pacManApp );
// done create module function


