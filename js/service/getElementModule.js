/*
    @package    SiteAnimator\Games\Pac-Man

    file:       getElementModule.js
    function:   Adds the function getElement to the application
                tries to get the element from given id
                return: element / null

    Last revision: 22-09-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: getElementModule( void ) void
        
    // create name space
    pacManApp.service = pacManApp.service ? pacManApp.service : {};
    
    pacManApp.service.getElementModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'getElementModule';                   // string
        self.index = null;                                  // integer / null
        self.hideNames = true;                              // boolean
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
        
            // add get element function
            pacManApp.getElementById = self.getById;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getById = function( id ) {
        // FUNCTION: getById( string: id ) html element / null
            
            // get the element
            return document.getElementById( id );
            
        // DONE FUNCTION: getById( string: id ) html element / null
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
    // DONE MODULE: getUiIdModule( void ) void 
    
})( pacManApp );
// done create module function


