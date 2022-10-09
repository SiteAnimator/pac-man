/*
        @package    SiteAnimator\Games\Pac-Man
  
        file:       fullScreenButtonModule.js
        function:   Generates the HTML for a button to 
                    display the game in full screen
  
        Last revision: 03-10-2022

*/    

// create module function
( function( pacManApp ){
        
    // MODULE: fullScreenButtonModule( html element id: parentId ) named array
        
    pacManApp.game.container.screenToSmall.fullScreenButtonModule = function( parentId ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.parentId = parentId;                           // html element id 
        self.MODULE = 'FullScreenButtonModule';             // string
        self.messageOptions = {                             // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Message' ), // string 
            'element'               :   'div',              // html element type 
            'text'                  :   pacManApp.getText( 'screenToSmallFullScreenMessage' ),  // string
            'backgroundColor'       :   'transparent',      // css
        };                                                  // done named array  
        self.buttonOptions = {                              // named array 
            'id'                    :   pacManApp.getUiId( self.moduleName + 'Button' ), // string 
            'element'               :   'div',              // html element type 
            'imageUrl'              :   'url( ' + pacManApp.imageDir + 'screenToSmall/fullscreenButton.png' + ')',
            'styleWidth'            :   '60px',             // css
            'styleHeight'           :   '60px',             // css
            'backgroundColor'       :   'transparent',      // css
            'backgroundRepeat'      :   'no-repeat',        // css
            'backgroundSize'        :   '120px 60px',       // css
            'backgroundPosition'    :   '0px 0px',          // css
            'cursor'                :   'pointer',          // css
            'imageIndexes' : {                              // named array
                'enabled'       :   0,                      // integer               
                'highlight'     :   1,                      // integer               
            },                                              // named array                              
        };                                                  // done named array  
        self.hoverTextOptions = {                           // named array 
            'subjectId'             :   'fullScreen',       // string
            'textId'                :   'tryMessage',       // string
        };                                                  // done named array  
        self.modules = {};                                  // named array                                                        
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // create message
            self.createMessage();

            // create button
            self.createButton();

        // DONE FUNCTION: construct( void ) void
        };
        self.createMessage = function() {
        // FUNCTION: createMessage( void ) void

            // create message
            pacManApp.appendContainer( self.parentId, self.messageOptions );
                    
        // DONE FUNCTION: createMessage( void ) void
        };
        self.removeMessage = function() {
        // FUNCTION: removeMessage( void ) void

            // remove message
            pacManApp.getElementById( self.messageOptions['id'] ).remove();

        // DONE FUNCTION: removeMessage( void ) void
        };
        self.createButton = function() {
        // FUNCTION: createButton( void ) void

            // get button module
            let buttonModule = pacManApp.service.buttonModule;
            
            // create callbacks
            let callbacks = {
                'mouseOver'  :   self.buttonMouseOver,
                'mouseOut'   :   self.buttonMouseOut,
                'click'      :   self.buttonClick
            };
            // create callbacks

            // add button to parent
            self.modules['button'] = new buttonModule( self.parentId,
                                                       self.buttonOptions,
                                                       callbacks );
            // add button to parent
            
        // DONE FUNCTION: createButton( void ) void
        };
        self.buttonMouseOver = function( event, item ) {
        // FUNCTION: buttonMouseOver( event: event, named array: item ) void

            // get button layout
            let layout = pacManApp.getElementById( self.buttonOptions['id'] ).getBoundingClientRect();

            // create background position
            let backgroundPosition = ( self.buttonOptions['imageIndexes']['highlight'] * -layout['width'] ) + 'px ' + 
                                       '0px';

            // set background position
            pacManApp.setStyle( self.buttonOptions['id'], 'background-position', backgroundPosition ); 
                
            // create hover text
            self.createHoverText();

        // DONE FUNCTION: buttonMouseOver( event: event, named array: item  ) void
        };
        self.buttonMouseOut = function( event, item ) {
        // FUNCTION: buttonMouseOut( event: event, named array: item ) void

            // reset background position
            pacManApp.setStyle( self.buttonOptions['id'], 'background-position', '0px 0px' ); 
                
            // remove hover text
            self.removeHoverText();

        // DONE FUNCTION: buttonMouseOut( event: event, named array: item  ) void
        };
        self.buttonClick = function( event, item ) {
        // FUNCTION: buttonClick( event: event, named array: item ) void

        // DONE FUNCTION: buttonClick( event: event, named array: item  ) void
        };
        self.createHoverText = function() {
        // FUNCTION: createHoverText( void ) void

            // hoverText exists
            if( self.modules.hoverText ){
                
                // done
                return;
                
            }
            // hoverText exists
            
            // get module
            let hoverTextModule = pacManApp.game.hoverText.hoverTextModule;
            
            // create module
            self.modules.hoverText = new hoverTextModule( self.buttonOptions['id'],
                                                          self.hoverTextOptions );
                    
        // DONE FUNCTION: createHoverText( void ) void
        };
        self.removeHoverText = function() {
        // FUNCTION: removeHoverText( void ) void

            // hoverText ! exists
            if( !self.modules.hoverText ){
                
                // done
                return;
                
            }
            // hoverText ! exists
            
            // destroy module
            self.modules.hoverText.destruct();
            
            // remove entry
            delete self.modules.hoverText;            
            
        // DONE FUNCTION: removeHoverText( void ) void
        };
        self.removeModules = function() {
        // FUNCTION: removeModules( void ) void
            
            // loop over modules
            Object.entries( self.modules ).forEach( ( [key, module] ) => {
                
                // destroy module
                module.destruct();
                
            });
            // loop over modules
            
            // unset modules
            self.modules = null;
            
        // DONE FUNCTION: removeHtml( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

            // hover text exists
            if( self.modules.hoverText ){

                // call hover text
                self.modules.hoverText.layoutChange( layout );
                
            }
            // hover text exists

        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove message
            self.removeMessage();
                        
            // remove modules
            self.removeModules();
                        
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
    // DONE MODULE: fullScreenButtonModule( html element id: parentId ) named array
    
})( pacManApp );
// done create module function


