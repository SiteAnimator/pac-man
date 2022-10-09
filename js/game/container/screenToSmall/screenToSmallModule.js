/*
        @package    SiteAnimator\Games\Pac-Man
  
        file:       screenToSmallModule.js
        function:   Generates the HTML for when 
                    the screen is to small to display the game
  
        Last revision: 03-10-2022
 
*/

// create module function
( function( pacManApp ){
    
    // create name space
    pacManApp.game.container.screenToSmall = pacManApp.game.container.screenToSmall ? pacManApp.game.container.screenToSmall : {};
    
    // MODULE: screenToSmallModule( html element id: parentId ) void 
    pacManApp.game.container.screenToSmall.screenToSmallModule = function( parentId ) {
        
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.moduleName = 'ScreenToSmallModule';                // string
        self.debugOn = false;                               // boolean
        self.parentId = parentId;                           // html element id
        self.containerOptions = {                           // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Container' ), // string 
            'element'               :   'div',              // html element type 
            //'text'                  :   'screen to small',  // string
            'zIndex'                :   pacManApp.zIndexes.screenToSmall, // css
            'position'              :   'absolute',         // css
            'styleWidth'            :   '100%',             // css
            'styleHeight'           :   '100%',             // css
            'backgroundColor'       :   'yellow',      // css
        };                                                  // done named array  
        self.contentOptions = {                             // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Content' ), // string 
            'element'               :   'div',              // html element type 
            'position'              :   'relative',         // css
        };                                                  // done named array  
        self.minimumOptions = {                             // named array 
            'width'                 :   1000,               // integer
            'height'                :   400                 // integer
        };                                                  // done named array  
        self.modules = {};                                  // named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug
            self.debug( 'construct' );

        // DONE FUNCTION: construct( void ) void
        };
        self.createHtml = function() {
        // FUNCTION: createHtml( void ) void

            // get element
            let element = pacManApp.getElementById( self.containerOptions['id'] );
            
            // element exists
            if( element ){
                
                // done
                return;
                
            }
            // element exists

            // create container
            pacManApp.appendContainer( self.parentId, self.containerOptions );
                    
            // create content
            pacManApp.appendContainer( self.containerOptions['id'], self.contentOptions );
                    
        // DONE FUNCTION: createHtml( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void

            // get element
            let element = pacManApp.getElementById( self.containerOptions['id'] );
            
            // element ! exists
            if( !element ){
                
                // done
                return;
                
            }
            // element ! exists

            // remove content
            pacManApp.getElementById( self.contentOptions['id'] ).remove();

            // remove container
            pacManApp.getElementById( self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.createMessage = function() {
        // FUNCTION: createMessage( void ) void

            // message exists
            if( self.modules.message ){
                
                // done
                return;
                
            }
            // message exists

            // get module
            let messageModule = pacManApp.game.container.screenToSmall.messageModule;
            
            // create module
            self.modules.message = new messageModule( self.contentOptions['id'] );

        // DONE FUNCTION: createMessage( void ) void
        };
        self.removeMessage = function() {
        // FUNCTION: removeMessage( void ) void

            // message ! exists
            if( !self.modules.message ){
                
                // done
                return;
                
            }
            // message ! exists
            
            // destroy module
            self.modules.message.destruct();
            
            // remove entry
            delete self.modules.message;            
            
        // DONE FUNCTION: removeMessage( void ) void
        };
        self.createFullScreenButton = function() {
        // FUNCTION: createFullScreenButton( void ) void

            // full sceen button exists
            if( self.modules.fullScreenButton ){
                
                // done
                return;
                
            }
            // full sceen button exists

            // is full screen
            if( pacManApp.game.isFullScreen() ){
 
                // remove full screen button
                self.removeFullScreenButton();
                
            }
            // is full screen
 
            // get module
            let fullScreenButtonModule = pacManApp.game.container.screenToSmall.fullScreenButtonModule;
            
            // create module
            self.modules.fullScreenButton = new fullScreenButtonModule( self.contentOptions['id'] );

        // DONE FUNCTION: createFullScreenButton( void ) void
        };
        self.removeFullScreenButton = function() {
        // FUNCTION: removeFullScreenButton( void ) void

            // full sceen button ! exists
            if( !self.modules.fullScreenButton ){
                
                // done
                return;
                
            }
            // full sceen button ! exists
            
            // destroy module
            self.modules.fullScreenButton.destruct();
            
            // remove entry
            delete self.modules.fullScreenButton;            
            
        // DONE FUNCTION: removeFullScreenButton( void ) void
        };
        self.show = function() {
        // FUNCTION: show( void ) void

            // create html
            self.createHtml();

            // create message
            self.createMessage();

            // create full screen button
            self.createFullScreenButton();

        // DONE FUNCTION: show( void ) void
        };
        self.hide = function() {
        // FUNCTION: hide( void ) void

            // remove full screen button
            self.removeFullScreenButton();

            // remove message
            self.removeMessage();

            // remove html
            self.removeHtml();

        // DONE FUNCTION: hide( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

            // is mobile
            if( pacManApp.isMobile ){

                // done
                return;
               
            }
            // is mobile

            // get container dimensions
            let containerDimensions = layout['container']['dimensions'];

            // container dimensions < minimum
            if( containerDimensions['widht'] < self.minimumOptions['width'] || 
                containerDimensions['height'] < self.minimumOptions['height'] ){

                // show
                self.show();
              
                // call fullscreen button
                self.modules.fullScreenButton.layoutChange( layout );
            
                // done
                return;
                
            }
            // container dimensions < minimum

            // hide
            self.hide();

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
    // DONE MODULE: screenToSmallModule( html element id: parentId ) void 
    
})( pacManApp );
// done create module function
