/*
    @package    SiteAnimator\Games\Pac-Man

    file:       setStyleModule.js
    function:   set the a style of an element

    Last revision: 23-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: setStyleModule( void ) void
        
    // create name space
    pacManApp.service = pacManApp.service ? pacManApp.service : {};
    
    pacManApp.service.setStyleModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'setStyleModule';                     // string
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
        
            // add get ui id function
            pacManApp.setStyle = self.setStyle;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.setStyle = function( elementId, style, value ) {
        // FUNCTION: setStyle( html element id: elementId, string: style, var value ) void
            
            // set style
            pacManApp.getElementById( elementId ).style[style] = value;
            
        // DONE FUNCTION: setStyle( html element id: elementId, string: style ) void
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
    // DONE MODULE: setStyleModule( void ) void 
    
})( pacManApp );
// done create module function


