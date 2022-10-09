/*
        @package    SiteAnimator\Games\Pac-Man

        file:       valuesModule.js
        function:   handels the values for the
                    in / out animation of a container 

        Last revision: 05-10-2022 

*/    

// create module function
( function( pacManApp ){
        
    // MODULE: valuesModule( named array: options ) named array
        
    pacManApp.animations.inOut.valuesModule = function( options ) {
        // PRIVATE:

        // MEMBERS:
        var self = this;                                    // object
        self.debugOn = false;                               // boolean
        self.MODULE = 'AnimationsInOutValuesModule';        // string
        self.options = options;                             // named array / undefined 
        self.animationOptions = {                           // named array
            'in' : {                                        // named array 
                'startDelay'        :   0,                  // integer
                'delay'             :   2,                  // integer
                'steps'             :   10,                 // integer
                'items' : {                                 // named array 
                    'opacity' : {                           // named array 
                        'from'      :   0.0,                // float
                        'to'        :   1.0                 // float
                    }                                       // done named array       
                }                                           // done named array 
            },                                              // done named array 
            'out' : {                                       // named array 
                'startDelay'        :   0,                  // integer
                'delay'             :   2,                  // integer
                'steps'             :   10,                 // integer
                'type'              :   'reverse',          // string
            }                                               // done named array 
        };                                                  // done named array  
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void
            
            // extend options
            self.extendOptions();
            
            // add reverse values
            self.addReverseValues();
            
            // convert in values
            self.convertValues( 'in' );
            
            // convert out values
            self.convertValues( 'out' );
            
            // calculate in steps
            self.calculateInSteps( );
            
            // calculate out steps
            self.calculateOutSteps( );
            
        // DONE FUNCTION: construct( void ) void
        };
        self.extendOptions = function() {
        // FUNCTION: extendOptions( void ) void

            // in is set
            if( self.options['in'] ){

                // extend in options
                self.animationOptions['in'] = pacManApp.extend( self.animationOptions['in'], self.options['in'] );
                
            }
            // in is set

            // out is set
            if( self.options['out'] ){

                // extend out options
                self.animationOptions['out'] = pacManApp.extend( self.animationOptions['out'], self.options['out'] );
                
            }
            // out is set

        // DONE FUNCTION: extendShow( void ) void
        };
        self.convertValues = function( direction ) {
        // FUNCTION: convertValues( string: direction ) void
        
            // get options
            let options = self.animationOptions[direction];

            // convert start delay
            options['startDelay'] = parseInt( options['startDelay'] );

            // convert delay
            options['delay'] = parseInt( options['delay'] );

            // convert steps
            options['steps'] = parseInt( options['steps'] );

            // loop over items
            Object.entries( options['items'] ).forEach( ( [itemKey, item] ) => {
            
                // get options item
                let optionsItem = options['items'][itemKey];
                
                // loop over values
                Object.entries( item ).forEach( ( [optionKey, value] ) => {

                    // convert value
                    optionsItem[optionKey] = parseFloat( value );
                    
                });
                // loop over values

            });
            // loop over items

            // trigger exists            
            if( options['trigger'] ){

                // convert at
                options['trigger']['at'] = parseFloat( options['trigger']['at'] );
                
            }
            // trigger exists            

        // DONE FUNCTION: convertValues( string: direction ) void
        };
        self.addReverseValues = function() {
        // FUNCTION: addReverseValues( void ) void

            // ! reverse
            if( self.animationOptions['out']['type'] !== 'reverse' ){

                // done
                return;
                
            }
            // ! reverse

            // get in options
            let inOptions = self.animationOptions['in'];
            
            // get out options
            let outOptions = self.animationOptions['out'];
  
            // create items
            outOptions['items'] = {};

            // get items
            let items = inOptions['items'];
            
            // loop over items
            Object.entries( items ).forEach( ( [key, item] ) => {

                // set values
                outOptions['items'][key] = {
                    'from'    :   item['to'],
                    'to'    :   item['from']
                };
                // set values

            });
            // loop over items            

        // DONE FUNCTION: addReverseValues( void ) void
        };
        self.calculateInSteps = function( ) {
        // FUNCTION: calculateInSteps( void ) void

            // get options
            let options = self.animationOptions['in'];
            
            // loop over items
            Object.entries( options['items'] ).forEach( ( [key, item] ) => {

                // get options item
                let optionsItem = options['items'][key];

                // calculate step
                optionsItem['step'] = ( item['to'] - 
                                        item['from'] ) / 
                                        options['steps'];
                // calculate step
                   
            });
            // loop over items

        // DONE FUNCTION: calculateInSteps( void ) void
        };
        self.calculateOutSteps = function( ) {
        // FUNCTION: calculateOutSteps( void ) void

            // get in options
            let inOptions = self.animationOptions['in'];
            
            // get out options
            let outOptions = self.animationOptions['out'];
            
            // loop over items
            Object.entries( outOptions['items'] ).forEach( ( [key, item] ) => {

                // get options item
                let optionsItem = outOptions['items'][key];

                // get from
                let from = item['from'] !== undefined ?
                           item['from'] :
                           inOptions['items'][key]['to'];        
                // get from

                // calculate step
                optionsItem['step'] = ( item['to'] - 
                                        from ) / 
                                        outOptions['steps'];
                // calculate step
                   
            });
            // loop over items

        // DONE FUNCTION: calculateOutSteps( void ) void
        };
        self.initializeValues = function( direction ) {
        // FUNCTION: initializeValues( string: direction ) void

            // direction is in
            if( direction === 'in' ){
                
                // initialise in
                self.initializeInValues();
                
                // done
                return;
                
            }
            // direction is in

            // initialise out
            self.initializeOutValues();
                
        // DONE FUNCTION: self.initializeValues( string: direction ) void
        };
        self.initializeInValues = function() {
        // FUNCTION: initializeInValues( void ) void

            // get in options
            let options = self.animationOptions['in'];

            // set ! visible
            options['visible'] = false;
            
            // loop over show items
            Object.entries( options['items'] ).forEach( ( [key, item] ) => {

                // get options item
                let optionsItem = options['items'][key];

                // set value
                optionsItem['value'] = optionsItem['value'] !== undefined ?
                                       optionsItem['value'] : 
                                       optionsItem['from'];
                // set value
                
            });
            // loop over items
            
        // DONE FUNCTION: self.initializeInValues( void ) void
        };
        self.initializeOutValues = function() {
        // FUNCTION: initializeOutValues( void ) void

            // get out options
            let options = self.animationOptions['out'];

            // type is reverse
            if( options['type'] === 'reverse' ){
                
                // initialize reverse
                self.initializeReverseValues();
                
                // done
                return;
                
            }
            // type is reverse
            
            // loop over hide items
            Object.entries( options['items'] ).forEach( ( [key, item] ) => {

                // get options item
                let optionsItem = options['items'][key];

                // set value
                optionsItem['value'] = optionsItem['value'] !== undefined ?
                                       optionsItem['value'] : 
                                       optionsItem['from'];
                // set value
                
            });
            // loop over hide items
            
        // DONE FUNCTION: self.initializeHideValues( void ) void
        };
        self.initializeReverseValues = function() {
        // FUNCTION: initializeReverseValues( void ) void
            
            // get in options
            let inOptions = self.animationOptions['in'];

            // get out options
            let outOptions = self.animationOptions['out'];
            
            // loop over hide items
            Object.entries( outOptions['items'] ).forEach( ( [key, item] ) => {

                // get options item
                let outOptionsItem = outOptions['items'][key];

                // get in options item
                let inOptionsItem = inOptions['items'][key];

                // set value
                outOptionsItem['value'] = inOptionsItem['value'] !== undefined ?
                                          inOptionsItem['value'] : 
                                          inOptionsItem['to'];
                // set value
                
            });
            // loop over items
            
        // DONE FUNCTION: self.initializeReverseValues( void ) void
        };
        self.updateValues = function( direction ) {
        // FUNCTION: updateValues( string: direction ) void
            
            // get animation options
            let animationOptions = self.animationOptions[direction];

            // get items
            let items = animationOptions['items'];

            // loop over items
            Object.entries( items ).forEach( ( [key, item] ) => {

                // add step
                items[key]['value'] += item['step'];

                // set maximum / minimum
                items[key]['value'] = item['to'] > item['from'] ?
                                      Math.min( item['to'], item['value'] ) :
                                      Math.max( item['to'], item['value'] );
                // set maximum / minimum
                
            });
            // loop over items

        // DONE FUNCTION: updateValues( string: direction ) void
        };
        self.getValues = function( direction ) {
        // FUNCTION: getValues( string: direction ) named array

            // get animation options
            let animationOptions = self.animationOptions[direction];

            // return result
            return animationOptions['items'];
            
        // DONE FUNCTION: getValues( string: direction ) named array
        };
        self.setValues = function( direction, values ) {
        // FUNCTION: setValues( string: direction, named array: values ) void

            // get animation options
            let animationOptions = self.animationOptions[direction];

            // loop over values
            Object.entries( values ).forEach( ( [key, item] ) => {

                // value ! exists
                if( !animationOptions['items'][key] ){
                
                    // add value
                    animationOptions['items'][key] = values[key];
                }
                // value ! exists
                
            });
            // loop over values
            
        // DONE FUNCTION: setValues( string: direction, named array: values ) void
        };
        self.getStartDelay = function( direction ) {
        // FUNCTION: getStartDelay( string: direction ) integer

            // get animation options
            let animationOptions = self.animationOptions[direction];

            // return result
            return animationOptions['startDelay'];
            
        // DONE FUNCTION: getStartDelay( string: direction ) integer
        };
        self.getDelay = function( direction ) {
        // FUNCTION: getDelay( string: direction ) integer

            // get animation options
            let animationOptions = self.animationOptions[direction];

            // return result
            return animationOptions['delay'];
            
        // DONE FUNCTION: getDelay( string: direction ) integer
        };
        self.isVisible = function( ) {
        // FUNCTION: isVisible( void ) boolean

            // get animation options
            let animationOptions = self.animationOptions['in'];

            // return result
            return animationOptions['visible'];
            
        // DONE FUNCTION: isVisible( void ) boolean
        };
        self.setVisible = function( visible ) {
        // FUNCTION: setVisible( boolean: visible ) void
            
            // get animation options
            let animationOptions = self.animationOptions['in'];

            // set visible
            animationOptions['visible'] = visible;
            
        // DONE FUNCTION: setVisible( boolean: visible ) void
        };
        self.triggerReached = function( direction ) {
        // FUNCTION: triggerReached( string: direction ) void
            
            // get animation options
            let animationOptions = self.animationOptions[direction];

            // get items
            let items = animationOptions['items'];
            
            // get trigger
            let trigger = animationOptions['trigger'];

            // trigger ! exists or trigger item ! exists or handeld
            if( !trigger ||
                !items[trigger['item']] ||    
                trigger['handeld'] ){
               
                // return trigger ! reached
                return false;
                
            }
            // trigger ! exists or trigger item ! exists or handeld
            
            // get values
            let values = items[trigger['item']];

            // from > to and trigger ! reached
            if( values['from'] > values['to'] &&
                trigger['at'] < values['value'] ){
                    
                // return trigger ! reached
                return false;
                    
            }
            // from > to and trigger ! reached
            
            // from < to and trigger ! reached
            if( values['from'] < values['to'] && 
                trigger['at'] > values['value'] ){
                    
                    // return trigger ! reached
                    return false;
                
            }
            // from < to and trigger ! reached
            
            // set trigger handeld
            trigger['handeld'] = true;

            // return trigger reached
            return true;
            
        // DONE FUNCTION: triggerReached( string: direction ) boolean
        };
        self.isReady = function( direction ) {
        // FUNCTION: isReady( string: direction ) boolean
            
            // create ready
            let ready = true;

            // get animation options
            let animationOptions = self.animationOptions[direction];

            // get items
            let items = animationOptions['items'];

            // loop over items
            Object.entries( items ).forEach( ( [key, item] ) => {

                // to > from and to reached
                if( item['to'] > item['from'] &&
                    item['value'] < item['to'] ){
                    
                    // set ! ready
                    ready = false;
                    
                }
                // to > from and to reached

                // to < from and to reached
                if( item['to'] < item['from'] &&
                    item['value'] > item['to'] ){
                    
                    // set ! ready
                    ready = false;
                    
                }
                // to < from and to reached
                
            });
            // loop over items

            // return result
            return ready;
            
        // DONE FUNCTION: isReady( string: direction ) boolean
        };
        self.destruct = function() {
        // FUNCTION: destruct( void ) void
            
            // unset options
            self.options = null;
        
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

            // FUNCTION: initializeValues( string: direction ) void    
            initializeValues : function( direction ){
                
                // call internal
                self.initializeValues( direction );
                
            },
            // FUNCTION: getValues( string: direction ) named array
            getValues : function( direction ){
                
                // return internal call
                return self.getValues( direction );
                
            },
            // FUNCTION: setValues( string: direction, named array: values ) void    
            setValues : function( direction, values ){
                
                // call internal
                self.setValues( direction, values );
                
            },
            // FUNCTION: getStartDelay( string: direction ) integer
            getStartDelay : function( direction ){
                
                // return internal call
                return self.getStartDelay( direction );
                
            },
            // FUNCTION: getDelay( string: direction ) integer
            getDelay : function( direction ){
                
                // return internal call
                return self.getDelay( direction );
                
            },
            // FUNCTION: isVisible( void ) boolean
            isVisible : function( ){
                
                // return internal call
                return self.isVisible( );
                
            },
            // FUNCTION: setVisible( boolean: visible ) void
            setVisible : function( visible ){
                
                // call internal
                self.setVisible( visible );
                
            },
            // FUNCTION: updateValues( string: direction ) void    
            updateValues : function( direction ){
                
                // call internal
                self.updateValues( direction );
                
            },
            // FUNCTION: triggerReached( string: direction ) boolean
            triggerReached : function( direction ){
                
                // return internal call
                return self.triggerReached( direction );
                
            },
            // FUNCTION: isReady( string: direction ) boolean
            isReady : function( direction ){
                
                // return internal call
                return self.isReady( direction );
                
            },
            // FUNCTION: destruct( void ) void    
            destruct : function( ){
                
                // call internal
                self.destruct( );
                
            }
            
        };
        // DONE PUBLIC
        
    };
    // DONE MODULE: valuesModule( named array: options ) named array 
    
})( pacManApp );
// done create module function


