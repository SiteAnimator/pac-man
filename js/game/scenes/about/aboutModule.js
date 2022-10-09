/*
    @package    SiteAnimator\Games\Pac-Man

    file:       aboutModule.js
    function:   handels displaying the about screen

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: aboutModule( string: sceneId,
    //                      html element id: parentId
    //                      named array: callbacks ) named array
        
    // create name space
    pacManApp.game.about = pacManApp.game.about ? pacManApp.game.about : {};
    
    pacManApp.game.about.aboutModule = function( sceneId,
                                                 parentId,
                                                 callbacks ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = true;                               // boolean
        self.MODULE = 'AboutModule';                        // string
        self.sceneId = sceneId;                             // string
        self.parentId = parentId;                           // html element id
        self.callbacks = callbacks;                         // named array
        self.containerOptions = {                           // named array 
            'id'                    :   pacManApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',              // html element type 
            'text'                  :   'about',    // string
            'zIndex'                :   1,                  // css
            'position'              :   'absolute',         // css
            'styleWidth'            :   '100%',             // css
            'styleHeight'           :   '100%',             // css
            'backgroundColor'       :   pacManApp.getColor( 'about', 'background' ), // css
            'opacity'               :   0.0,                // css
            'visible'               :   false,              // boolean
        };                                                  // done named array  
        self.contentOptions = {                             // named array 
            'id'                    :   pacManApp.getUiId( self.MODULE + 'Content' ), // string 
            'element'               :   'div',              // html element type 
            'position'              :   'relative',         // css
            'styleWidth'            :   '100%',             // css
            'styleHeight'           :   '100%',             // css
        };                                                  // done named array  
        self.displayAnimationOptions = {                    // named array
            'in' : {                                        // named array
                'steps'             :   40,                 // integer
                'items' : {                                 // named array
                    'opacity' : {                           // named array
                        'from'      :   0.0,                // float
                        'to'        :   1.0                 // float
                    }                                       // done named array            
                }                                           // done named array
            },                                              // done named array       
            'out' : {                                       // named array
                'steps'             :   40,                 // integer
            }                                               // done named array       
        };                                                  // done named array  
        self.timerOptions = {                               // named array                                                          
            'timerId'               :   null,               // window timer id / null
            'delay'                 :   10,                 // integer
        };                                                  // done named array
        self.animations = {};                               // named array
        self.modules = {};                                  // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug info
            self.debug( 'construct' );
            
            // create html
            self.createHtml();
 
            // create background
            self.createBackground();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.createHtml = function() {
        // FUNCTION: createHtml( void ) void

            // create container
            pacManApp.appendContainer( self.parentId, self.containerOptions );
                    
            // create content
            pacManApp.appendContainer( self.containerOptions['id'], self.contentOptions );
                    
        // DONE FUNCTION: createHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void

            // remove content
            pacManApp.getElementById( self.contentOptions['id'] ).remove();

            // remove container
            pacManApp.getElementById( self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createBackground = function() {
        // FUNCTION: createBackground( void ) void

            // get background module
            let backgroundModule = pacManApp.game.about.background.backgroundModule;
            
            // create background
            self.modules['background'] = new backgroundModule( self.contentOptions['id'] );

        // DONE FUNCTION: createBackground( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void
            
            // get animation module
            let animationModule = pacManApp.animations.inOut.inOutModule;

            // create callbacks
            var callbacks = {
                'show'        :   self.showContainer,
                'hide'        :   self.hideContainer,
                'inReady'     :   self.showReady,
                'outReady'    :   self.hideReady
            };
            // create callbacks

            // create animation
            self.animations['display'] = new animationModule( self.containerOptions['id'],
                                                              self.displayAnimationOptions,
                                                              callbacks );
            // create module

            // start animation
            self.animations['display'].start( 'in' );

        // DONE FUNCTION: show( void ) void
        };
        self.showContainer = function( ) {
        // FUNCTION: showContainer( void ) void
            
        // DONE FUNCTION: showContainer( void ) void
        };
        self.hideContainer = function( ) {
        // FUNCTION: hideContainer( void ) void
            
        // DONE FUNCTION: hideContainer( void ) void
        };
        self.showReady = function() {
        // FUNCTION: showReady( void ) void

            // debug
            self.debug( 'show ready' );
            
        // DONE FUNCTION: showReady( void ) void
        };
        self.ready = function( ) {
        // FUNCTION: ready ( void ) void
            
            
        // DONE FUNCTION: ready( void ) void
        };
        self.hide = function( ) {
        // FUNCTION: hide( void ) void
            
            // debug
            self.debug( 'hide' );
            
            // start animation
            self.animations['display'].start( 'out' );

        // DONE FUNCTION: hide( void ) void
        };
        self.hideReady = function() {
        // FUNCTION: hideReady( void ) void

            // debug
            self.debug( 'hide ready' );
            
            // call callback
            self.callbacks['hideReady']( self.sceneId );
            
        // DONE FUNCTION: hideReady( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [key, module] ) => {

                // call module
                module.layoutChange();
                
            });
            // loop over animations
            
        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.removeAnimations = function() {
        // FUNCTION: removeAnimations( void ) void
            
            // loop over animations
            Object.entries( self.animations ).forEach( ( [key, animation] ) => {

                // destroy animation
                animation.destruct();
                
                // unset entry
                delete self.animations[key];

            });
            // loop over animations
             
            // unset animations
            self.animations = null;
             
        // DONE FUNCTION: removeAnimations( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [key, module] ) => {

                // destroy module
                module.destruct();
                
                // unset entry
                delete self.modules[key];

            });
            // loop over animations
             
            // unset modules
            self.modules = null;
             
        // DONE FUNCTION: removeModules( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove animations
            self.removeAnimations();

            // remove modules
            self.removeModules();

            // remove html
            self.removeHtml();

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

        
            // FUNCTION: show( void ) void    
            show : function( ){
                
                // call internal
                self.show( );
                
            },
            // FUNCTION: hide( void ) void    
            hide : function( ){
                
                // call internal
                self.hide( );
                
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
    // DONE MODULE: aboutModule( string: sceneId,
    //                           html element id: parentId
    //                           named array: callbacks ) named array
    
})( pacManApp );
// done create module function


