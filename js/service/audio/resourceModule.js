/*
    @package    SiteAnimator\Games\Pac-Man

    file:       resourceModule.js
    function:   loads a audio resource
                plays a the resource
                frees the resource 

    Last revision: 25-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: resourceModule( named array: options ) named array
        
    // create name space
    pacManApp.audio = pacManApp.audio ? pacManApp.audio : {};
    
    pacManApp.audio.resourceModule = function( options ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'AudioResourceModule';                // string
        self.options = options;                             // named array
        self.loadTimeOutOptions = {                         // named array
            'timer'                 :   null,               // timer id / null
            'delay'                 :   5000                // integer
        };                                                  // named array
        self.resourceOptions = null;                        // named array / null
        self.paused = false;                                // boolean
        self.loadCount = 0;                                 // integer
        self.loadCallback = null;                           // function /  null
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.load = function( callback ) {
        // FUNCTION: load( function: callback ) void
            
            // resource options exists
            if( self.resourceOptions !== null ){

                // done call callback
                callback();
                
            }
            // resource options exists            
            
            // get source
            let source = self.getSource();
            
            // source ! exists
            if( source === null ){
                
                // done call callback
                callback();
                
            }
            // source ! exists

            // remember callback
            self.loadCallback = callback;

            // create resource options
            self.createResourceOptions();
            
            // load audio objects
            self.loadAudioObjects( source );
            
            // start load timeout timer
            self.loadTimeOutOptions['timer'] = setTimeout( function () { self.loadTimedOut(); }, 
                                                                         self.loadTimeOutOptions['delay'] );
            // start load timeout timer
            
        // DONE FUNCTION: load( function: callback ) void
        };
        self.createResourceOptions = function() {
        // FUNCTION: createResourceOptions( void ) void
            
            // copy options
            self.resourceOptions = pacManApp.extend( {}, self.options );
            
            // create copies
            self.resourceOptions['copies'] = self.resourceOptions['copies'] !== undefined ? 
                                             self.resourceOptions['copies'] : 
                                             1; 
            // create copies
            
            // create audio objects
            self.resourceOptions['audioObjects'] = []; 
            
            // loop for copies
            for( let i = 0; i < self.resourceOptions['copies']; i++ ){
                
                // create audio object
                let audioObject = {
                    'started'       : false
                };
                // create audio object
                
                // create audio
                audioObject['audio'] = new Audio();

                // add end event
                audioObject['audio'].onloadeddata = ( event ) => {

                    // call loaded    
                    self.loaded( i );

                };
                // add end event

                // add end event
                audioObject['audio'].onprogress = ( event ) => {
                    
                    // call progress    
                    self.progress( i );
                    
                };
                // add end event

                // add to audio
                self.resourceOptions['audioObjects'].push( audioObject );
            
            }
            // loop for copies
            
        // DONE FUNCTION: createResourceOptions( void ) void
        };
        self.loadAudioObjects = function( source) {
        // FUNCTION: loadAudioObjects( string: source ) void

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){
                
                // set source
                self.resourceOptions['audioObjects'][i]['audio'].src = source;
                
            }
            // loop over audio objects
            
        // DONE FUNCTION: loadAudioObjects( string: source ) void
        };
        self.getSource = function() {
        // FUNCTION: getSource( void ) void
            
            // create playable source
            let playableSource = null;
            
            // loop over sources
            Object.entries( self.options['sources'] ).forEach( ( [key, source] ) => {

                // no playable source and can play audio type
                if( playableSource === null &&
                    pacManApp.canPlayAudioType( key ) ){

                    // set playable source
                    playableSource = source;
                    
                }
                // no playable source and can play audio type

            });
            // loop over sources

            // return result
            return playableSource;
            
        // DONE FUNCTION: getSource( void ) void
        };
        self.progress = function( index ) {
        // FUNCTION: progress( integer: index ) void;
            
            // debug info
            self.debug( 'progress: ' + self.options['id'] + index );
        
            // restart load time out timer
            self.restartLoadTimedOutTimer();
            
        // DONE FUNCTION: progress( integer: index ) void
        };
        self.loaded = function( index ) {
        // FUNCTION: loaded( integer: index ) void
            
            // clear timer
            self.clearLoadTimedOutTimer();

            // debug info
            self.debug( 'loaded audio: ' + self.resourceOptions['id'] );

            // unset load data event
            self.resourceOptions['audioObjects'][index]['audio'].onloadeddata = null;

            // unset progress event
            self.resourceOptions['audioObjects'][index]['audio'].onprogress = null;

            // add to load count
            self.loadCount++;
            
            // all loaded
            if( self.loadCount >= self.resourceOptions['audioObjects'].length ){

                // call all loaded
                self.allLoaded();
                
            }
            else {
                
                // restart load time out timer
                self.restartLoadTimedOutTimer();
            
            }
            // all loaded
            
        // DONE FUNCTION: loaded( integer: index ) void
        };
        self.allLoaded = function( ) {
        // FUNCTION: allLoaded( void ) void

            // debug info
            self.debug( 'all loaded: ' + self.resourceOptions['id'] );
            
            // set loaded
            self.resourceOptions['loaded'] = true;
            
            // ! mobile
            if( !pacManApp.isMobile ){
                
                // auto start
                self.autoStart();
            
            }
            // ! mobile
            
            // copy load callback
            let callback = self.loadCallback;
            
            // unset load callbacl
            self.loadCallback = null;

            // call callback
            callback();
            
        // DONE FUNCTION: allLoaded( void ) void
        };
        self.autoStart = function( ) {
        // FUNCTION: autoStart( void ) void

            // audio ! started
            if( !pacManApp.audioStarted() ){

                // done
                return;
                
            }
            // audio ! started

            // is loaded
            if( self.resourceOptions['loaded'] ){
                
                // loop over audio objects
                for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                    // is playing
                    if( self.resourceOptions['audioObjects'][i]['playing'] ){
                    
                        // done
                        return;
                        
                    }
                    // is playing

                }
                // loop over audio objects

                // auto start is defined and true
                if( self.resourceOptions['autoStart'] !== undefined &&
                    self.resourceOptions['autoStart'] ){

                    // start playing
                    self.play();

                }
                // auto start is defined and true

            }
            // is loaded

        // DONE FUNCTION: autoStart( void ) void
        };
        self.loadTimedOut = function( ) {
        // FUNCTION: loadTimedOut( void ) void
            
            // debug info
            self.debug( 'loadTimedOut' );
            
            // clear timer
            self.clearLoadTimedOutTimer();

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){
                
                // unset load data event
                self.resourceOptions['audioObjects'][i]['audio'].onloadeddata = null;

                // unset progress event
                self.resourceOptions['audioObjects'][i]['audio'].onprogress = null;

            }
            // loop over audio objects
            
            // copy load callback
            let callback = self.loadCallback;
            
            // unset load callbacl
            self.loadCallback = null;

            // call callback
            callback();
            
        // DONE FUNCTION: loadTimedOut( void ) void
        };
        self.restartLoadTimedOutTimer = function( ) {
        // FUNCTION: restartLoadTimedOutTimer( void ) void

            // clear timer
            self.clearLoadTimedOutTimer();

            // start load timeout timer
            self.loadTimeOutOptions['timer'] = setTimeout( function () { self.loadTimedOut(); }, 
                                                                         self.loadTimeOutOptions['delay'] );
            // start load timeout timer
            
        // DONE FUNCTION: restartLoadTimedOutTimer( void ) void
        };
        self.clearLoadTimedOutTimer = function( ) {
        // FUNCTION: clearLoadTimedOutTimer( void ) void
            
            // timer exists
            if( self.loadTimeOutOptions['timer'] !== null ){
                
                // clear time out timer
                clearTimeout( self.loadTimeOutOptions['timer'] );
                
                // unset timer
                self.loadTimeOutOptions['timer'] = null;
            
            }
            // timer exists
            
        // DONE FUNCTION: clearLoadTimedOutTimer( void ) void
        };
        self.play = function( options ) {
        // FUNCTION: play( named array: options ) void
            
            // is loaded
            if( self.resourceOptions['loaded'] ){
                
                // loop over audio objects
                for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                    // is playing
                    if( !self.resourceOptions['audioObjects'][i]['playing'] ){
                    
                        // is paused
                        if( self.paused ){
                            
                            // pause audio
                            self.startPausedAudio( self.resourceOptions['audioObjects'][i] );
                    
                            // done
                            return;
                            
                        }
                        // is paused
                    
                        // play audio
                        self.playAudio( i, self.resourceOptions['audioObjects'][i] );
                    
                        // done
                        return;
                        
                    }
                    // is playing

                }
                // loop over audio objects

            }
            // is loaded
            
        // DONE FUNCTION: play( named array: options ) void
        };
        self.startPausedAudio = function( audioObject ) {
        // FUNCTION: startPausedAudio( named array: audioObject ) void
        
            // can be paused
            if( self.resourceOptions['canBePaused'] !== undefined &&
                self.resourceOptions['canBePaused'] === true ){

                // set paused
                audioObject['isPaused'] = true;

                // get normal volume
                let volume = self.resourceOptions['volume'] !== undefined ? 
                             self.resourceOptions['volume'] :
                             1.0;        
                // get normal volume

                // set paused volume
                audioObject['pausedVolume'] = volume;
                
            }
            // can be paused

        // DONE FUNCTION: startPausedAudio( named array: audioObject ) void
        };
        self.playAudio = function( index, audioObject ) {
        // FUNCTION: playAudio( integer: index, named array: audioObject ) void
        
            // set started
            audioObject['playing'] = true;

            // add end event
            audioObject['audio'].onended = ( event ) => {

                // call played    
                self.audioPlayed( index );

            };
            // add end event

            // set loop
            audioObject['audio'].loop = self.resourceOptions['loop'];

            // set volume
            audioObject['volume'] = self.resourceOptions['volume'];

            // set volume
            audioObject['audio'].volume = self.resourceOptions['volume'];

            // play audio
            audioObject['audio'].play();
        
        // DONE FUNCTION: playAudio( integer: index, named array: audioObject ) void
        };
        self.audioPlayed = function( index ) {
        // FUNCTION: audioPlayed( integer: index ) void
            
            // debug info
            self.debug( 'audio played: ' + self.options['id'] + index );
            
            // unset on ended
            self.resourceOptions['audioObjects'][index]['audio'].onended = null;
            
            // set ! playing
            self.resourceOptions['audioObjects'][index]['playing'] = false;
            
        // DONE FUNCTION: audioPlayed( integer: index ) void
        };
        self.startEffect = function( effectId ) {
        // FUNCTION: startEffect( string: effectId ) void

            // ! has effects or ! effect id
            if( self.resourceOptions['effects'] === undefined ||
                self.resourceOptions['effects'][effectId] === undefined ){
            
                // done
                return;
                
            }
            // ! playing ! has effects or ! effect id

            // get effect options
            let effectOptions = self.getEffectOptions( effectId );

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                // set effect options
                self.setEffectOptions( self.resourceOptions['audioObjects'][i], effectOptions );

            }
            // loop over audio objects
            
        // DONE FUNCTION: startEffect( string: effectId ) void
        };
        self.endEffect = function( effectId ) {
        // FUNCTION: endEffect( string: effectId ) void

            // ! has effects or ! effect id
            if( self.resourceOptions['effects'] === undefined ||
                self.resourceOptions['effects'][effectId] === undefined ){
            
                // done
                return;
                
            }
            // ! playing ! has effects or ! effect id

            // get default options
            let defaultOptions = self.getDefaultOptions( effectId );

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                // set effect options
                self.setEffectOptions( self.resourceOptions['audioObjects'][i], defaultOptions );

            }
            // loop over audio objects
            
        // DONE FUNCTION: endEffect( string: effectId ) void
        };
        self.getEffectOptions = function( effectId ) {
        // FUNCTION: getEffectOptions( string: effectId ) void
            
            // get effect
            let effect = self.resourceOptions['effects'][effectId];

            // create volume
            let effectOptions = {};

            // volume exists
            if( effect['volume'] !== undefined ){

                // get effect volume
                effectOptions['volume'] = effect['volume'];        

            }
            // volume exists
            
            // playback rate exists
            if( effect['playbackRate'] !== undefined ){

                // get effect playback rate
                effectOptions['playbackRate'] = effect['playbackRate'];        

            }
            // playback rate exists
            
            // return result
            return effectOptions;
            
        // DONE FUNCTION: getEffectOptions( string: effectId ) void
        };
        self.getDefaultOptions = function( effectId ) {
        // FUNCTION: getDefaultOptions( string: effectId ) void
            
            // get effect
            let effect = self.resourceOptions['effects'][effectId];

            // create default options
            let defaultOptions = {};

            // volume exists
            if( effect['volume'] !== undefined ){

                // get normal volume
                defaultOptions['volume'] = self.resourceOptions['volume'] !== undefined ? 
                                           self.resourceOptions['volume'] :
                                           1.0;        
                // get normal volume

            }
            // volume exists
            
            // playback rate exists
            if( effect['playbackRate'] !== undefined ){

                // get normal playback rate
                defaultOptions['playbackRate'] = self.resourceOptions['playbackRate'] !== undefined ? 
                                                 self.resourceOptions['playbackRate'] :
                                                 1.0;        
                // get normal playback rate

            }
            // playback rate exists
            
            // return result
            return defaultOptions;
            
        // DONE FUNCTION: getDefaultOptions( string: effectId ) void
        };
        self.setEffectOptions = function( audioObject, effectOptions ) {
        // FUNCTION: setEffectOptions( named array: audioObject, named array: effectOptions ) void

            // ! is playing
            if( !audioObject['playing'] ){
                
                // done
                return;
                
            }
            // ! is playing

            // volume exists
            if( effectOptions['volume'] !== undefined ){

                // set volume
                audioObject['volume'] = effectOptions['volume'];
                
                // set volume
                audioObject['audio'].volume = effectOptions['volume'];

            }
            // volume exists

            // playback rate exists
            if( effectOptions['playbackRate'] !== undefined ){

                // set playback rate 
                audioObject['audio'].playbackRate = effectOptions['playbackRate'];

            }
            // playback rate exists
            
            
        // DONE FUNCTION: setDefaultOptions( named array: audioObject, named array: effectOptions ) void
        };
        self.pause = function() {
        // FUNCTION: pause( void ) void

            // remember paused
            self.paused = true;

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                // get audio object
                let audioObject = self.resourceOptions['audioObjects'][i];
                
                // is playing
                if( audioObject['playing'] ){

                    // can be paused
                    if( self.resourceOptions['canBePaused'] !== undefined &&
                        self.resourceOptions['canBePaused'] === true ){

                        // remember paused
                        audioObject['isPaused'] = true;

                        // remember paused
                        audioObject['audio'].pause(); 

                    }
                    // can be paused
                    
                    // set volume
                    audioObject['audio'].volume = 0;

                }
                // is playing

            }
            // loop over audio objects
            
        // DONE FUNCTION: pause( void ) void
        };
        self.resume = function() {
        // FUNCTION: resume( void ) void

            // reset paused
            self.paused = false;

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                // get audio object
                let audioObject = self.resourceOptions['audioObjects'][i];
                
                // is paused
                if( audioObject['isPaused'] === true ){

                    // reset paused
                    audioObject['isPaused'] = false;

                    // set started
                    audioObject['playing'] = true;

                    // add end event
                    audioObject['audio'].onended = ( event ) => {

                        // call played    
                        self.audioPlayed( i );

                    };
                    // add end event

                    // set loop
                    audioObject['audio'].loop = self.resourceOptions['loop'];

                    // set volume
                    audioObject['audio'].volume = audioObject['volume'];

                    // remember paused
                    audioObject['audio'].play(); 

                }
                // is paused
                    
            }
            // loop over audio objects
            
        // DONE FUNCTION: resume( void ) void
        };
        self.stop = function() {
        // FUNCTION: stop( void ) void

            // loop over audio objects
            for( let i = 0; i < self.resourceOptions['audioObjects'].length; i++ ){

                // get audio object
                let audioObject = self.resourceOptions['audioObjects'][i];
                
                // is playing
                if( audioObject['playing'] === true ){
                    
                    // set volume
                    audioObject['audio'].volume = 0;
                    
                }
                // is playing

                // is paused
                if( audioObject['isPaused'] === true ){
                    
                    // set volume
                    audioObject['audio'].volume = 0;
                    
                    // set started
                    audioObject['playing'] = true;

                    // add end event
                    audioObject['audio'].onended = ( event ) => {

                        // call played    
                        self.audioPlayed( i );

                    };
                    // add end event

                    // set ! loop
                    audioObject['audio'].loop = false;

                    // remember paused
                    audioObject['audio'].play(); 
                    
                }
                // is paused
                
            }
            // loop over audio objects

        // DONE FUNCTION: stop( void ) void
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

            // FUNCTION: load( function: callback ) void    
            load : function( callback ){
                
                // call internal
                self.load( callback );
                
            },
            // FUNCTION: autoStart( void ) void    
            autoStart : function( ){
                
                // call internal
                self.autoStart( );
                
            },
            // FUNCTION: play( named array: options ) void    
            play : function( options ){
                
                // call internal
                self.play( options );
                
            },
            // FUNCTION: pause( void ) void    
            pause : function( ){
                
                // call internal
                self.pause( );
                
            },
            // FUNCTION: resume( void ) void    
            resume : function( ){
                
                // call internal
                self.resume( );
                
            },
            // FUNCTION: stop( void ) void    
            stop : function( ){
                
                // call internal
                self.stop( );
                
            },
            // FUNCTION: startEffect( string: effectId ) void    
            startEffect : function( effectId ){
                
                // call internal
                self.startEffect( effectId );
                
            },
            // FUNCTION: endEffect( string: effectId ) void    
            endEffect : function( effectId ){
                
                // call internal
                self.endEffect( effectId );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
        
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: resourceModule( named array: options ) named array
    
})( pacManApp );
// done create module function


