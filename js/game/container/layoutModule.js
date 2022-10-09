/*
        @package    SiteAnimator\Games\Pac-Man
  
        file:       layoutModule.js
        function:   Handels layout for the game container.
  
        Last revision: 26-09-2022
 
*/

// create module function
( function( pacManApp ){
    
    // MODULE: layoutModule( html element id: containerId ) void 
    pacManApp.game.container.layoutModule = function( containerId ) {
        
        // PRIVATE:
        
        // MEMBERS
        var self = this;                                    // object
        self.moduleName = 'layoutModule';                   // string
        self.debugOn = false;                               // boolean
        self.containerId = containerId;                     // html element id
        self.containerOptions = {                           // named array 
            'maximumWidth'          :   1200,               // css
        };                                                  // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // debug
            self.debug( 'layout module construct' );
 
 
        // DONE FUNCTION: construct( void ) void
        };
        self.layoutChange = function() {
        // FUNCTION: layoutChange( void ) named array

            // debug
            self.debug( 'layoutChange' );

            // create layout
            let layout = {
                'parent'    : {},
                'container' : {}
            };
            // create layout
            
            // get parent dimensions
            self.getParentDimensions( layout );
                        
            // get orientation
            self.getOrientation( layout );
                        
            // get container dimensions
            self.getDimensions( layout );

            // get positions
            self.getPositions( layout );

            // set positions
            self.setPositions( layout );

            // set dimensions
            self.setDimensions( layout );

            // return layout
            return layout;

        // DONE FUNCTION: layoutChange( void ) named array
        };
        self.getParentDimensions = function( layout ) {
        // FUNCTION: getParentDimensions( named array: layout ) string

            // app container id is set and ! full sreen
            if( pacManApp.containerId &&
                !pacManApp.game.isFullScreen() ){
            
                // get container dimensions
                layout['parent']['dimensions'] = self.getContainerDimensions();
                
                // done
                return;

            }
            // app container id is set and ! full sreen
            
            // get window dimensions
            layout['parent']['dimensions'] = self.getWindowDimensions();

        // DONE FUNCTION: getParentDimensions( named array: layout ) string
        };
        self.getContainerDimensions = function( ) {
        // FUNCTION: getContainerDimensions( void ) named array

            // get parent layout
            let layout = pacManApp.getElementById( pacManApp.containerId ).getBoundingClientRect();

            // create dimensions
            let dimensions = {
                'width'     :   layout.width,
                'height'    :   layout.height
            };
            // create dimensions

            // return result
            return dimensions;

        // DONE FUNCTION: getContainerDimensions( void ) named array
        };
        self.getWindowDimensions = function( ) {
        // FUNCTION: getWindowDimensions( void ) named array

            // create dimensions
            let dimensions = {
                'width'     :   window.innerWidth,
                'height'    :   window.innerHeight
            };
            // create dimensions

            // return result
            return dimensions;

        // DONE FUNCTION: getWindowDimensions( void ) named array
        };
        self.getOrientation = function( layout ) {
        // FUNCTION: getOrientation( named array: layout ) string

            // get parent dimensions
            let parentDimensions = layout['parent']['dimensions']; 
            
            // app container id is set and ! full sreen
            if( parentDimensions['width'] > parentDimensions['height'] ){
            
                // set orientation
                layout['parent']['orientation'] = 'landScape';

                // done
                return;
                
            }
            // app container id is set and ! full sreen
            
            // set orientation
            layout['parent']['orientation'] = 'portret';

        // DONE FUNCTION: getOrientation( named array: layout ) string
        };
        self.getDimensions = function( layout ) {
        // FUNCTION: getDimensions( named array: layout ) string

            // get parent dimensions
            let parentDimensions = layout['parent']['dimensions'];

            // get container dimensions
            let containerDimensions = {
                'width'     :   parentDimensions['width'],
                'height'    :   parentDimensions['height']
            };
            // create container dimensions
            
            // set maximum
            containerDimensions['width'] = Math.min( containerDimensions['width'],
                                                     self.containerOptions['maximumWidth'] );
            // set maximum
            
            // set container dimensions
            layout['container']['dimensions'] = containerDimensions;

        // DONE FUNCTION: getDimensions( named array: layout ) string
        };
        self.setDimensions = function( layout ) {
        // FUNCTION: setDimensions( named array: layout ) void

            // get container dimensions
            let dimensions = layout['container']['dimensions'];

            // set width
            pacManApp.setStyle( self.containerId, 'width', dimensions['width'] + 'px' );
            
            // set height
            pacManApp.setStyle( self.containerId, 'height', dimensions['height'] + 'px' );
                
        // DONE FUNCTION: setDimensions( named array: layout ) void
        };
        self.getPositions = function( layout ) {
        // FUNCTION: getPositions( named array: layout ) void

            // get parent dimensions
            let parentDimensions = layout['parent']['dimensions'];

            // get dimensions
            let containerDimensions = layout['container']['dimensions'];
            
            // calculate top
            let top = ( parentDimensions['height'] - containerDimensions['height'] ) / 2;
            
            // calculate left
            let left = ( parentDimensions['width'] - containerDimensions['width'] ) / 2;
            
            // create positions
            let containerPositions = {
                'top'   :   top,
                'left'  :   left
            };
            // create positions
            
            // set container positions
            layout['container']['positions'] = containerPositions;

        // DONE FUNCTION: getPositions( named array: layout ) void
        };
        self.setPositions = function( layout ) {
        // FUNCTION: setPositions( named array: layout ) void

            // get positions
            let positions = layout['container']['positions'];

            // set left
            pacManApp.setStyle( self.containerId, 'margin-left', positions['left'] + 'px' );
            
            // set top
            pacManApp.setStyle( self.containerId, 'margin-top', positions['top'] + 'px' );
                
        // DONE FUNCTION: setPositions( named array: layout ) void
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
            
            // FUNCTION: layoutChange( void ) named array
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
    // DONE MODULE: contentModule( html element id: containerId ) void 
    
})( pacManApp );
// done create module function
