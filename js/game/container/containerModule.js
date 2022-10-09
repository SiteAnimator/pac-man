/*
        @package    SiteAnimator\Games\Pac-Man
  
        file:       containerModule.js
        function:   Generates the HTML for the container.
                    Handles the layout of the container of the game
  
        Last revision: 03-10-2022
 
*/

// create module function
( function( pacManApp ){
    
    // create name space
    pacManApp.game.container = pacManApp.game.container ? pacManApp.game.container : {};
    
    // MODULE: containerModule( void ) void 
    pacManApp.game.container.containerModule = function( ) {
        
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.moduleName = 'ContainerModule';                // string
        self.debugOn = false;                               // boolean
        self.containerOptions = {                           // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Container' ), // string 
            'element'               :   'div',              // html element type 
            'position'              :   'relative',         // css
            'backgroundColor'       :   'transparent',      // css
        };                                                  // done named array  
        self.mobileContainerOptions = {                     // named array 
        };                                                  // done named array  
        self.modules = {};                                  // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug
            self.debug( 'construct' );

            // extend options
            self.extendOptions();
 
            // create html
            self.createHtml();
 
            // create sreen to small
            self.createScreenToSmall();
 
            // create layout
            self.createLayout();
 
            // add the extensions to the game
            self.addGameExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void

            // get container options
            let containerOptions = self.containerOptions;

            // is mobile
            if( pacManApp.isMobile ){
                
                // extend container options
                self.containerOptions = pacManApp.extend( containerOptions, self.mobileContainerOptions );
                
            }
            // is mobile

        // DONE FUNCTION: extendOptions( void ) void
        };
        self.addGameExtensions = function(){
        // FUNCTION addGameExtensions( void ) void
        
            // add get game container id
            pacManApp.game.getContainerId = self.getContainerId;
            
        // DONE FUNCTION: addGameExtensions( void ) void
        };
        self.removeGameExtensions = function(){
        // FUNCTION removeGameExtensions( void ) void
        
            // remove get game container id
            delete pacManApp.game.getContainerId;
            
        // DONE FUNCTION: removeGameExtensions( void ) void
        };
        self.getContainerId = function() {
        // FUNCTION: getContainerId( void ) html element id

            // return result
            return self.containerOptions['id'];

        // DONE FUNCTION: getContainerId( void ) html element id
        };
        self.createHtml = function() {
        // FUNCTION: createHtml( void ) void

            // app container id is set
            if( pacManApp.containerId ){
          
                // create container
                pacManApp.appendContainer( pacManApp.containerId, self.containerOptions );
                    
                // done
                return;
                
            }
            // app container id is set

            // create container
            pacManApp.appendContainer( document.body, self.containerOptions );
                    
        // DONE FUNCTION: createHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void

            // remove container
            pacManApp.getElementById( self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createScreenToSmall = function() {
        // FUNCTION: createScreenToSmall( void ) void

            // get screen to small module
            let screenToSmallModule = pacManApp.game.container.screenToSmall.screenToSmallModule;

            // add full screen service
            self.modules.screenToSmall = new screenToSmallModule( self.containerOptions['id'] );

        // DONE FUNCTION: createScreenToSmall( void ) void
        };
        self.createLayout = function() {
        // FUNCTION: createLayout( void ) void

            // get layout module
            let layoutModule = pacManApp.game.container.layoutModule;

            // create layout
            self.modules.layout = new layoutModule( self.containerOptions['id'] );

        // DONE FUNCTION: createLayout( void ) void
        };
        self.layoutChange = function( ) {
        // FUNCTION: layoutChange( void ) named array

            // debug
            self.debug( 'layoutChange' );

            // get layout
            let layout = self.modules['layout'].layoutChange();

            // call screen to small
            self.modules.screenToSmall.layoutChange( layout );

            // return layout
            return layout;

        // DONE FUNCTION: layoutChange( void ) named array
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void

            // loop over modules
            Object.entries( self.modules ).forEach( ( [key, module ] ) => {
                
                // destroy module
                module.destruct();

            });
            // loop over modules

            // unset modules
            self.modules = null;
            
        // DONE FUNCTION: removeModules( void ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );

            // remove game extensions
            self.removeGameExtensions();
            
            // remove events
            self.removeEvents();
            
            // remove modules 
            self.removeModules();

            // remove html
            self.removeHtml();
            
        // DONE FUNCTION: destruct( void ) void
        };
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // debug
                pacManApp.debug( self.moduleName + ' ' + message );
                
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        
        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
            
            // FUNCTION: layoutChange( void ) void    
            layoutChange : function( ){
                
                // return internal call
                return self.layoutChange( );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: containerModule( void ) void 
    
})( pacManApp );
// done create module function
