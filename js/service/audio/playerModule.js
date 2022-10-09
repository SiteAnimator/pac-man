/*
    @package    SiteAnimator\Games\Pac-Man

    file:       playerModule.js
    function:   loads and plays audio files
                checks audio capabilities

    Last revision: 25-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: playerModule( void ) void
        
    // create name space
    pacManApp.audio = pacManApp.audio ? pacManApp.audio : {};
    
    pacManApp.audio.playerModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'AudioPlayerModule';                  // string
        self.modules = {};                                  // named array
        self.resources = {};                                // named array
        self.maximumResourceCount = 5;                      // integer
        self.started = false;                               // boolean
        self.musicMuted = true;                             // boolean
        self.effectsMuted = true;                           // boolean
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // get options
            self.getOptions();
            
            // create modules            
            self.createModules();
            
            // add the extensions to app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.getOptions = function(){
        // FUNCTION getOptions( void ) void
        
            // audio options ! exists
            if( !pacManApp.options.audio ){

                // done 
                return;
                
            }
            // audio options ! exists
        
            // get maximum resource count
            self.maximumResourceCount = pacManApp.options.audio.maximumResourceCount ? 
                                        pacManApp.options.audio.maximumResourceCount :
                                        self.maximumResourceCount;
            // get maximum resource count
        
        // DONE FUNCTION: getOptions( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add start
            pacManApp.audio.start = self.start;
            
            // add started
            pacManApp.audio.started = self.started;
            
            // mute music
            pacManApp.audio.muteMusic = self.muteMusic;
            
            // un mute music 
            pacManApp.audio.unMuteMusic = self.unMuteMusic;
            
            // music is muted
            pacManApp.audio.musicIsMuted = self.musicIsMuted;
            
            // mute effects
            pacManApp.audio.muteEffects = self.muteEffects;
            
            // un mute effects
            pacManApp.audio.unMuteEffects = self.unMuteEffects;
            
            // effects are muted
            pacManApp.audio.effectsAreMuted = self.effectsAreMuted;
            
            // add add 
            pacManApp.audio.add = self.add;
            
            // add preload
            pacManApp.audio.preload = self.preload;
            
            // pause
            pacManApp.audio.pause = self.pause;
            
            // resume
            pacManApp.audio.resume = self.resume;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.removeApplicationsExtensions = function(){
        // FUNCTION removeApplicationsExtensions( void ) void
        
            // remove add start audio
            delete pacManApp.audio.start;
            
            // remove add audio started
            delete pacManApp.audio.started;
            
            // remove mute music
            delete pacManApp.audio.muteMusic;
            
            // remove un mute music 
            delete pacManApp.audio.unMuteMusic;
            
            // remove music is muted
            delete pacManApp.audio.musicIsMuted;
            
            // remove mute effects
            delete pacManApp.audio.muteEffects;
            
            // remove un mute effects
            delete pacManApp.audio.unMuteEffects;
            
            // remove effects are muted
            delete pacManApp.audio.effectsAreMuted;
            
            // remove add
            delete pacManApp.audio.add;
            
            // remove preload
            delete pacManApp.audio.preload;
            
            // remove pause
            delete pacManApp.audio.pauseAudio;
            
            // remove resume
            delete pacManApp.audio.resume;
            
        // DONE FUNCTION: removeApplicationsExtensions( void ) void
        };
        self.createModules = function() {
        // FUNCTION: createModules( void ) void
            
            // debug info
            self.debug( 'createModules' );

            // create capabilities module
            self.modules['capabilities'] = new pacManApp.audio.capabilitiesModule();

            // create resource loader module
            self.modules['resourceLoader'] = new pacManApp.audio.resourceLoaderModule();

        // DONE FUNCTION: createModules( void ) void
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
    // DONE MODULE: playerModule( void ) void 
    
})( pacManApp );
// done create module function


