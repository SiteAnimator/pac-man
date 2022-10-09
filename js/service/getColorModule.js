/*
    @package    SiteAnimator\Games\Pac-Man

    file:       getColorModule.js
    function:   Adds the function 
                    getColor:  gets a color from the colors
                to the application

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: getColorModule( void ) void
        
    // create name space
    pacManApp.service = pacManApp.service ? pacManApp.service : {};
    
    pacManApp.service.getColorModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'GetColorModule';                     // string
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
        
            // add get color function
            pacManApp.getColor = self.getColor;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getColor = function( subjectId, colorId ) {
        // FUNCTION: getColor( string: subjectId, string: colorId ) string
            
            // color ! exists
            if( !pacManApp.colors[subjectId] ||
                !pacManApp.colors[subjectId][colorId] ){
                
                // debug info
                self.debug( 'color ! found subject: ' + subjectId + ' colorId: ' + colorId );
                
                // return empty result
                return '#000000';
                
            }
            
            // return result
            return pacManApp.colors[subjectId][colorId];
            
        // DONE FUNCTION: getColor( string: textId ) string
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
    // DONE MODULE: getColorModule( void ) void 
    
})( pacManApp );
// done create module function


