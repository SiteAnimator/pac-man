/*
    @package    SiteAnimator\Games\Pac-Man

    file:       playerModule.js
    function:   Adds the functions:
                    addAnimationFrame
                    removeAnimationFrame
                    pauseAnimations
                    resumeAnimations
                    animationsPaused     
                to the application
                handles timing animation frames

    Last revision: 25-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: playerModule( void ) void
        
    // create name space
    pacManApp.animations = pacManApp.animations ? pacManApp.animations : {};
    
    pacManApp.animations.playerModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'AnimationsPlayerModule';             // string
        self.maximumFrameSpeed = 40;                        // integer
        self.minimumDelay = 1000 / self.maximumFrameSpeed;  // float
        self.animationFrameRequestId = null;                // window.requestAnimationFrame id / null
        self.timer = null;                                  // timer object / null
        self.frameIdIndex = 0;                              // integer
        self.playing = false;                               // boolean    
        self.paused = false;                                // boolean    
        self.animatedAt = null;                             // date
        self.frames = {};                                   // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // add the extensions to the application
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.addApplicationsExtensions = function(){
        // FUNCTION addApplicationsExtensions( void ) void
        
            // add frame
            pacManApp.animations.addFrame = self.addFrame;
            
            // remove frame
            pacManApp.animations.removeFrame = self.removeFrame;
            
            // pause animations
            pacManApp.animations.pause = self.pause;
            
            // resume resume
            pacManApp.animations.resume = self.resume;
            
            // animations are paused
            pacManApp.animations.arePaused = self.arePaused;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.removeApplicationsExtensions = function(){
        // FUNCTION removeApplicationsExtensions( void ) void
        
            // remove add frame
            delete pacManApp.animations.addFrame;
            
            // remove remove frame
            delete pacManApp.animations.removeFrame;
            
            // remove pause
            delete pacManApp.animations.pause;
            
            // remove resume
            delete pacManApp.animations.resume;
            
            // remove are paused
            delete pacManApp.animations.arePaused;
            
        // DONE FUNCTION: removeApplicationsExtensions( void ) void
        };
        self.addFrame = function( options ) {
        // FUNCTION: addFrame( named array: options ) integer

            // create animation id
            let frameId = self.frameIdIndex;
            
            // next index
            self.frameIdIndex++;
            
            // get frame options
            let frameOptions = self.getFrameOptions( options );
            
            // set animation id
            frameOptions['id'] = frameId;
            
            // add frame
            self.frames['frame' + frameId] = frameOptions;

            // ! playing
            if( !self.playing && !self.isPaused ){
                
                // remember playing
                self.playing = true;
                
                // request animation frame
                self.requestAnimationFrame();
                
            }
            // ! playing
            
            // return frame id
            return frameId;
            
        // DONE FUNCTION: addFrame( named array: options ) integer
        };
        self.removeFrame = function( frameId ) {
        // FUNCTION: removeFrame( integer: frameId ) void

            // frame exists
            if( self.frames['frame' + frameId] !== undefined ){
            
                // remove animation
                delete self.frames['frame' + frameId];
                
            }
            // frame exists

        // DONE FUNCTION: removeFrame( integer: frameId ) void
        };
        self.getFrameOptions = function( options ) {
        // FUNCTION: getFrameOptions( named array: options ) void

            // create frame options
            let frameOptions = {
                'callback'      :   options['callback']
            };
            // create frame options

            // has frame delay
            if( options['frameDelay'] ){
                
                // set frames to delay
                frameOptions['frameDelay'] = options['frameDelay'];
                
            }
            // has frame delay
            
            // has time delay
            if( options['timeDelay'] ){
            
                // set time delay
                frameOptions['timeDelay'] = options['timeDelay'];

                // set started at
                frameOptions['startedAt'] = new Date();

            }
            // has time delay        

            // return result
            return frameOptions;

        // DONE FUNCTION: getFrameOptions( integer: animationId, named array: options ) void
        };
        self.removeFrames = function() {
        // FUNCTION: removeFrames( void ) void

            // loop over frames
            Object.entries( self.frames ).forEach( ( [key, frame] ) => {

                // remove frame
                delete self.frames[key];
                
            });
            // loop over frames
            
        // DONE FUNCTION: removeFrames( void ) void
        };
        self.requestAnimationFrame = function() {
        // FUNCTION: requestAnimationFrame( void ) void
           
            // no more animations
            if( Object.keys( self.frames ).length <= 0 ){

                // remember stopped
                self.playing = false;
                
                // reset animated at
                self.animatedAt = null;
                
                // done
                return;
                
            }
            // no more animations
            
            // animated at ! set
            if( self.animatedAt === null ){
                
                // get date
                self.animatedAt = new Date();
                
            }
            // animated at ! set

            // wait for frame
            self.animationFrameRequestId = window.requestAnimationFrame( self.delay );
            
        // DONE FUNCTION: requestAnimationFrame( void ) void
        };
        self.delay = function() {
        // FUNCTION: delay( void ) void

            // request id exists
            if( self.animationFrameRequestId !== null ){

                // unset request id
                self.animationFrameRequestId = null;
                
            }
            // request id exists

            // get date
            let date = new Date();
                
            // create expired
            let expired = 0;
                        
            // get expired
            expired = Math.abs( date.getTime() - self.animatedAt.getTime() );

            // calculate delay
            let delay = Math.max( self.minimumDelay - expired, 0 );

            // start timer
            self.timer = setTimeout( function () { self.play(); }, delay  );
            
        // DONE FUNCTION: delay( void ) void
        };
        self.play = function() {
        // FUNCTION: play( void ) void
        
            // clear timer
            self.clearTimer();

            // subtract frame
            self.subtractFrame();
            
            // create animations to play
            let animationsToPlay = self.getFramesToPlay();
            
            // loop over animations to play
            for( let i = 0; i < animationsToPlay.length; i++ ) {

                // get frame
                let frame = self.frames[animationsToPlay[i]];
                
                // remove frame
                delete self.frames[animationsToPlay[i]];
                    
                // call trigger callback
                frame['callback']( );
                
            }
            // loop over animations to play
        
            // request animation frame
            self.requestAnimationFrame();
        
        // DONE FUNCTION: play( void ) void
        };
        self.subtractFrame = function( ) {
        // FUNCTION: subtractFrame( void ) array

            // loop over frames
            Object.entries( self.frames ).forEach( ( [key, frame] ) => {

                // has frame delay
                if( frame['frameDelay'] ){
                    
                    // set frame delay
                    frame['frameDelay']--;
                    
                }
                // has frame delay
                
            });
            // loop over frames
            
        // DONE FUNCTION: subtractFrame( void ) void
        };
        self.getFramesToPlay = function( ) {
        // FUNCTION: getFramesToPlay( void ) array
        
            // create frames to play
            let framesToPlay = [];
            
            // loop over frames
            Object.entries( self.frames ).forEach( ( [key, frame] ) => {

                // frame has expired
                if( self.frameHasExpired( frame ) ){
                    
                    // add frame to frames to play
                    framesToPlay.push( key );
                    
                }
                // frame has expired

            });
            // loop over frames
        
            // return frames to play
            return framesToPlay;
        
        // DONE FUNCTION: getFramesToPlay( void ) array
        };
        self.frameHasExpired = function( options ) {
        // FUNCTION: frameHasExpired( named array: options ) boolean

            // ! has time delay and ! has frame delay
            if( options['timeDelay'] === undefined &&
                options['frameDelay'] === undefined ){
            
                // return expired
                return true;
            
            }
            // ! has time delay and ! has frame delay
            
            // has time delay 
            if( options['timeDelay'] !== undefined ){
                
                // get date
                let date = new Date();
                
                // get expired
                let expired = Math.abs( date.getTime() - options['startedAt'].getTime() );
                
                // has expired
                if( expired >= options['timeDelay'] ){
                    
                    // return expired
                    return true;
                    
                }
                // has expired
                
            }
            // has time delay 
        
            // has frame delay 
            if( options['frameDelay'] !== undefined ){
                
                // done frame delay
                if( options['frameDelay'] <= 0 ){
                    
                    // return expired
                    return true;
                    
                }
                // done frame delay
                
            }
            // has frame delay 
        
            // return ! expired
            return false;
        
        // DONE FUNCTION: delayHasExpired( named array: options ) boolean
        };
        self.pause = function(){
        // FUNCTION: pause( void ) void

            // stop requests
            self.cancelAnimationRequest( );

            // stop timer
            self.clearTimer( );
            
            // remember paused
            self.paused = true;
            
        // DONE FUNCTION: pause( void ) void
        };
        self.arePaused = function(){
        // FUNCTION: arePaused( void ) boolean

            // rerturn paused
            return self.paused;

        // DONE FUNCTION: arePaused( void ) boolean
        };
        self.resume = function(){
        // FUNCTION: resume( void ) void
        
            // resume animations
            self.requestAnimationFrame();
        
            // remember ! paused
            self.paused = false;
            
        // DONE FUNCTION: resume( void ) void
        };
        self.stop = function() {
        // FUNCTION: stop( void ) void

            // stop requests
            self.cancelAnimationRequest( );

            // stop timer
            self.clearTimer( );
            
            // remember stopped
            self.playing = false;

            // reset animated at
            self.animatedAt = null;
                
        // DONE FUNCTION: stop( void ) void
        };
        self.cancelAnimationRequest = function( ) {
        // FUNCTION: cancelAnimationRequest( void ) void
            
            // request id exists
            if( self.animationFrameRequestId !== null ){

                // cancel request
                window.cancelAnimationFrame( self.animationFrameRequestId );
                
                // unset request id
                self.animationFrameRequestId = null;
                
            }
            // request id exists
            
        // DONE FUNCTION: cancelAnimationRequest( void ) void
        };
        self.clearTimer = function( ) {
        // FUNCTION: clearTimer( void ) void
            
            // timer exists
            if( self.timer ){
                
                // clear timer
                clearTimeout( self.timer );
                
                // unset timer
                self.timer = null;
                
            }
            // timer exists

        // DONE FUNCTION: clearTimer( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove application extensions
            self.removeApplicationsExtensions();
            
            // stop    
            self.stop();
            
            // remove animation frames    
            self.removeFrames();
            
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
    // DONE MODULE: playerModule( void ) void 
    
})( pacManApp );
// done create module function


