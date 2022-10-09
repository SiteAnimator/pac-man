/*
    @package    SiteAnimator\Tools

    file:       inOutModule.js
    function:   handels in / out animation of a container 

    Last revision: 26-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // create name spaces
    pacManApp.animations = pacManApp.animations ? pacManApp.animations : {};
    pacManApp.animations.inOut = pacManApp.animations.inOut ? pacManApp.animations.inOut : {};
    // create name spaces
    
    
    // MODULE: inOutModule( html element id: callerId, 
    //                      named array / undefined: options, 
    //                      named array / undefined: callbacks ) named array
        
    pacManApp.animations.inOut.inOutModule = function( callerId,
                                                       options,
                                                       callbacks) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = true;                               // boolean
        self.MODULE = 'AnimationsInOutModule';              // string
        self.callerId = callerId;                           // html element id
        self.options = options;                             // named array / undefined 
        self.callbacks = callbacks;                         // named array / undefined 
        self.animationOptions = {};                         // named array
        self.initialOptions = {                             // named array 
            'frameId'               :   null,               // boolean
            'ready'                 :   false               // boolean
        };                                                  // done named array  
        self.modules = {};                                  // named array                                                          
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // create values
            self.createValues();
                        
        // DONE FUNCTION: construct( void ) void
        };
        self.createValues = function() {
        // FUNCTION: createValues( void ) void

            // get values module
            let valuesModule = pacManApp.animations.inOut.valuesModule;

            // create module
            self.modules['values'] = new valuesModule( self.options );

        // DONE FUNCTION: createValues( void ) void
        };
        self.startAnimation = function() {
        // FUNCTION: startAnimation( void ) void

            // get animation options
            let animationOptions = self.animationOptions;

            // get direction
            let direction = animationOptions['direction'];

            // set ! ready
            animationOptions['ready'] = false;

            // create options
            let options = {
                'frameDelay'    :   self.modules['values'].getStartDelay( direction ),
                'callback'      :   self.animate
            };
            // create options
        
            // add animation frame
            animationOptions['frameId'] = pacManApp.animations.addFrame( options );

        // DONE FUNCTION: startAnimation( void ) void
        };
        self.animate = function() {
        // FUNCTION: animate( void ) void

            // get animation options
            let animationOptions = self.animationOptions;

            // unset frame id
            self.animationOptions['frameId'] = null;

            // play animation
            self.playAnimation();
            
            // animation ! ready
            if( !animationOptions['ready'] ){

                // get direction
                let direction = animationOptions['direction'];

                // create options
                let options = {
                    'frameDelay'    :   self.modules['values'].getDelay( direction ),
                    'callback'      :   self.animate
                };
                // create options

                // add animation frame
                animationOptions['frameId'] = pacManApp.animations.addFrame( options );

            }
            // animation ! ready
            
        // DONE FUNCTION: animate( void ) void
        };
        self.playAnimation = function() {
        // FUNCTION: playAnimation( void ) void

            // get animation options
            let animationOptions = self.animationOptions;

            // get direction
            let direction = animationOptions['direction'];

            // ! visible
            if( !self.modules['values'].isVisible() &&
                 direction === 'in' ){
            
                // show caller
                self.showCaller();
            
                // done
                return;
                
            }
            // ! visible

            // update values
            self.modules['values'].updateValues( direction );
                
            // animate caller
            self.animateCaller();
            
            // check trigger
            self.checkTrigger( );
            
            // ! ready
            if( !self.modules['values'].isReady( direction ) ){

                // done
                return;
                
            }
            // ! ready
            
            // set ready
            animationOptions['ready'] = true;

            // direction is out
            if( animationOptions['direction'] === 'out' ){
                
                // hide caller
                self.hideCaller();
                
            }
            // direction is out

            // ready
            self.ready();
                
        // DONE FUNCTION: animateShow( void ) void
        };
        self.showCaller = function() {
        // FUNCTION: showCaller( void ) void
            
            // set visible
            self.modules['values'].setVisible( true );

            // animate caller
            self.animateCaller();

            // show callback exists
            if( self.callbacks['show'] ){

                // call callback
                self.callbacks['show']();

            }
            // show callback exists

        // DONE FUNCTION: showCaller( void ) void
        };
        self.hideCaller = function() {
        // FUNCTION: hideCaller( void ) void
            
            // set visible
            self.modules['values'].setVisible( false );

            // hide callback exists
            if( self.callbacks['hide'] ){

                // call callback
                self.callbacks['hide']();

            }
            // hide callback exists

        // DONE FUNCTION: hideCaller( void ) void
        };
        self.animateCaller = function() {
        // FUNCTION: animateCaller( void ) void
            
            // get direction
            let direction = self.animationOptions['direction'];
            
            // get values
            let values = self.modules['values'].getValues( direction );
            
            // animate opacity
            self.animateOpacity( values );
            
            // animate transform
            self.animateTransform( values );
            
        // DONE FUNCTION: animateCaller( void ) void
        };
        self.animateOpacity = function( values ) {
        // FUNCTION: animateOpacity( named array: values ) void
            
            // opacity ! exists
            if( !values['opacity'] ){

                // done
                return;
                
            }
            // opacity ! exists

            // set opacity
            pacManApp.setStyle( self.callerId , 'opacity', values['opacity']['value'] ); 
                
        // DONE FUNCTION: animateOpacity( named array: values ) void
        };
        self.animateTransform = function( values ) {
        // FUNCTION: animateTransform( named array: values ) void

            // create transform
            let transform = '';

            // left exists
            if( values['left'] ){
                
                // add translate x
                transform += 'translateX( ' + 
                                parseInt( values['left']['value'] ) + 'px' +
                             ') ';
                // add translate x
                
            }
            // left exists
            
            // top exists
            if( values['top'] ){
                
                // add translate y
                transform += 'translateY( ' + 
                                parseInt( values['top']['value'] ) + 'px' +
                             ') ';
                // add translate y
                
            }
            // top exists

            // scale exists
            if( values['scale'] ){
                
                // add scale
                transform += 'scale( ' + 
                                values['scale']['value'] +
                             ') ';
                // add scale
                
            }
            // scale exists
            
            // transform found 
            if( transform !== '' ){
                
                pacManApp.setStyle( self.callerId , 'transform', transform ); 
                
            } 
            // transform found 

        // DONE FUNCTION: animateTransform( named array: values ) void
        };
        self.checkTrigger = function() {
        // FUNCTION: checkTrigger( void ) void
            
            // get direction
            let direction = self.animationOptions['direction'];

            // trigger reached
            if( self.modules['values'].triggerReached( direction ) ){

                // call callback
                self.callbacks['trigger']();
                
            }
            // trigger reached

        // DONE FUNCTION: checkTrigger( void ) void
        };
        self.ready = function() {
        // FUNCTION: ready( void ) void
   
            // get direction
            let direction = self.animationOptions['direction'];

            // call callback
            self.callbacks[direction + 'Ready']();
                                
        // DONE FUNCTION: ready( void ) void
        };
        self.stopAnimation = function() {
        // FUNCTION: stopAnimation( void ) void

            // get animation options
            let animationOptions = self.animationOptions;

            // frame exists
            if( animationOptions['frameId'] !== null ){

                // remove frame
                pacManApp.animations.removeFrame( animationOptions['frameId'] );
                
                // unset frame id
                animationOptions['frameId'] = null;

            }
            // frame exists
            
        // DONE FUNCTION: stopAnimation( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [key, module] ) => {

                // destroy module
                module.destruct( );

            });
            // loop over modules
            
            // reset modules
            self.modules = {};
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.start = function( direction ) {
        // FUNCTION: start( string: direction ) void

            // stop animation
            self.stopAnimation();
            
            // set direction
            self.animationOptions['direction'] = direction;
            
            // set initialize values
            self.modules['values'].initializeValues( direction );
            
            // start animation
            self.startAnimation();
            
        // DONE FUNCTION: start( string: direction ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

                
        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // stop animation
            self.stopAnimation();
            
            // remove modules
            self.removeModules();
            
            // unset options
            self.options = null;
        
            // unset callbacks
            self.callbacks = null;
            
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

            // FUNCTION: start( string: direction ) void    
            start : function( direction ){
                
                // call internal
                self.start( direction );
                
            },
            // FUNCTION: stop( void ) void    
            stop : function( ){
                
                // call internal
                self.stopAnimation( );
                
            },
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
    // DONE MODULE: inOutModule( html element id: callerId, 
    //                           named array / undefined: options, 
    //                           named array / undefined: callbacks ) named array 
    
})( pacManApp );
// done create module function


