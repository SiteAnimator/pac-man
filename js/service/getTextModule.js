/*
    @package    SiteAnimator\Games\Pac-Man

    file:       getTextModule.js
    function:   Adds the function 
                    getText:  gets a translation from the strings
                to the application

    Last revision: 09-10-2022
 
*/    

// create module function
( function( pacManApp ){
        
    // MODULE: getTextModule( void ) void
        
    // create name space
    pacManApp.service = pacManApp.service ? pacManApp.service : {};
    
    pacManApp.service.getTextModule = function( ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'GetTextModule';                      // string
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
        
            // add get text function
            pacManApp.getText = self.getText;
            
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };
        self.getText = function( subjectId, textId ) {
        // FUNCTION: getText( string: subjectId, string: textId ) string
            
            // text ! exists
            if( !pacManApp.strings[subjectId] ||
                !pacManApp.strings[subjectId][textId] ||
                !pacManApp.strings[subjectId][textId][pacManApp.language] ){
                
                // debug info
                self.debug( 'string ! found subject: ' + subjectId + ' textId: ' + textId );
                
                // return empty result
                return '';
                
            }
            
            // get text
            return pacManApp.strings[subjectId][textId][pacManApp.language];
            
        // DONE FUNCTION: getText( string: textId ) string
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
    // DONE MODULE: getTextModule( void ) void 
    
})( pacManApp );
// done create module function


