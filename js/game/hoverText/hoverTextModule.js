/*
    @package    SiteAnimator\Games\Pac-Man

    file:       hoverTextModule.js
    function:   Adds the function 
                    hoverText:  shows a hover text on an element
                to the application

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // create name space
    pacManApp.game.hoverText = pacManApp.game.hoverText ? pacManApp.game.hoverText : {};
    
    // MODULE: hoverTextModule( html element id: callerId,
    //                          named array: options ) void
        
    pacManApp.game.hoverText.hoverTextModule = function( callerId,
                                                         options ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'HoverTextModule';                    // string
        self.callerId = callerId;                           // html element id
        self.callerOptions = options;                             // named array
        self.containerOptions = {                           // named array 
            'id'                    :   pacManApp.getUiId( self.MODULE + 'Container' ), // string 
            'element'               :   'div',              // html element type 
            'zIndex'                :   pacManApp.zIndexes.hoverText, // integer 
            'position'              :   'absolute',         // css
            'backgroundColor'       :   pacManApp.getColor( 'hoverText', 'background' ), // css
        };                                                  // done named array  
        self.textOptions = {                                // named array 
            'id'                    :   pacManApp.getUiId( self.MODULE + 'Text' ), // string 
            'element'               :   'div',              // html element type 
            'color'                 :   pacManApp.getColor( 'hoverText', 'color' ), // css
        };                                                  // done named array  
        self.options = {                                    // named array
            'align'                 :   'center',           // string
        };                                                  // done named array
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // extend options
            self.extendOptions( options );
            
            // add html
            self.addHtml();
            
            // adjust layout
            self.layoutChange();
            
        // DONE FUNCTION: hoverText( html element id: callerId, named array: options ) void
        };
        self.extendOptions = function( ) {
        // FUNCTION: extendOptions( void ) void
            
            // caller options exists
            if( self.callerOptions ){
            
                // extend options 
                self.options = pacManApp.extend( self.options, self.callerOptions );

            }    
            // caller options exists
            
        // DONE FUNCTION: extendOptions( named array: options ) void
        };
        self.addHtml = function() {
        // FUNCTION: addHtml( void ) void
            
            // add container
            self.addContainer();

            // get text
            self.textOptions['text'] = pacManApp.getText( self.options['subjectId'], self.options['textId'] );
            
            // add text
            pacManApp.appendContainer( self.containerOptions['id'], self.textOptions );
            
        // DONE FUNCTION: addHtml( void ) void
        };
        self.addContainer = function() {
        // FUNCTION: addContainer( void ) void
            
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
            
        // DONE FUNCTION: addContainer( void ) void
        };
        self.removeHtml = function() {
        // FUNCTION: removeHtml( void ) void

            // remove text
            pacManApp.getElementById( self.textOptions['id'] ).remove();

            // remove container
            pacManApp.getElementById( self.containerOptions['id'] ).remove();

        // DONE FUNCTION: removeHtml( void ) void
        };
        self.layoutChange = function( layout ) {
        // FUNCTION: layoutChange( named array: layout ) void

            // no container
            if( !pacManApp.getElementById( self.containerOptions['id'] ) ){
                
                // done
                return;
                
            }
            // no container

            // get caller layout
            let callerLayout = self.getCallerLayout();

            // get container layout
            let hoverTextLayout = self.getLayout();

            // calculate positions
            let positions = self.calculatePositions( layout, callerLayout, hoverTextLayout );

            // set positions
            self.setPositions( positions );

        // DONE FUNCTION: layoutChange( named array: layout ) void
        };
        self.getCallerLayout = function(  ) {
        // FUNCTION: getCallerLayout( void ) named array

            // return result
            return pacManApp.getElementById( self.callerId ).getBoundingClientRect();

        // DONE FUNCTION: getCallerLayout( void ) named array
        };
        self.getLayout = function(  ) {
        // FUNCTION: getLayout( void ) named array

            // return result
            return pacManApp.getElementById( self.containerOptions['id'] ).getBoundingClientRect();

        // DONE FUNCTION: getLayout( void ) named array
        };
        self.calculatePositions = function( layout, callerLayout, hoverTextLayout ) {
        // FUNCTION: calculatePositions( named array: layout, named array: callerLayout, named array: hoverTextLayout ) named array
        
            // create positions
            let positions = {
                'top'       :   callerLayout['top'],
                'left'      :   callerLayout['left']
            };
            // create positions
        
            // align is left
            if( self.options.align === 'left' ){
        
            }
            // align is left
        
            // align is center
            if( self.options.align === 'center' ){
        
            }
            // align is center
        
            // align is right
            if( self.options.align === 'right' ){
        
            }
            // align is right
        
            // return result
            return positions;
        
        // DONE FUNCTION: calculatePositions( named array: layout, named array: callerLayout, named array: hoverTextLayout ) named array
        };
        self.setPositions = function( positions ) {
        // FUNCTION: setPositions( named array: positions ) void
        
            // set left
            pacManApp.setStyle( self.containerOptions['id'], 'left', positions['left'] + 'px' );
            
            // set top
            pacManApp.setStyle( self.containerOptions['id'], 'top', positions['top'] + 'px' );
                
        // DONE FUNCTION: setPositions( named array: positions ) void
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // debug info
            self.debug( 'destruct' );
            
            // remove html
            self.removeHtml();
            
            // unset caller options
            self.callerOptions = null;
            
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
    // DONE MODULE: hoverTextModule( html element id: callerId,
    //                               named array: options ) void 
    
})( pacManApp );
// done create module function


