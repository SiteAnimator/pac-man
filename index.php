<?php
/*
 
        @package    SiteAnimator/Modules/Games/Pac-Man

        file:       index.php
        function:   this landing page for the Pac-Man game.

        author:     Rob Wolters
        company:    SiteAnimator
        email:      info@siteanimator.nl
        liscence:   GNU GENERAL PUBLIC LICENSE Version 3

        Last revision: 03-10-2022
 
*/  

// create version
$version = '00001';
$gameDiv = false;

require_once './php/MobileDetect.php';

$mobileDetect = new MobileDetect();

// is mobile
$isMobile = $mobileDetect->isMobile();    

?>

<!DOCTYPE html>
<html lang='nl'>
    <head>

        <title>Pac-Man</title>

        <link id="favicon" href="icon.ico?version=0.0001" rel="shortcut icon" type="image/x-icon">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
        <meta name="web_author" content="SiteAnimator">
        <meta name="description" content="Pac-Man game demo with Javascript modules">
        <meta name="keywords" content="Javascript, tutorial, Object Oriented">
        <meta name="reply-to" content="info@siteanimator.nl">
        <meta name="copyright" content="SiteAnimator">
      
        <style>
            
            html, body {
                min-height: 100vh;
                min-width: 100vw;
                margin : 0px;
            }
            
            body {
                background-color: blue;
                color: DarkGreen;
                font-size: 1.2rem;
                line-height: 1.8rem;
                border : 0px;
            }
            a:link {
                color: MediumAquaMarine;
            }
            a:visited {
                color: green;
            }
            a:hover {
                color: Gold;
            }
            a:active {
                color: DarkOrange;
            }       
            
<?php 

// game div
if( $gameDiv ){

    // add game div style
    echo ' 
        .gameDiv {                
            position: relative;
            min-height: 80vh;
            width: 80%;
            margin: 0 auto;
            margin-top: 10vh;
            background-color: orange;
        }';
    // add game div style
    
}         
// game div

?>        

        </style>
        


    </head>
    <body>

<?php 

// game div
if( $gameDiv ){

    // add game div
    echo '<div id="gameDiv" class="gameDiv"></div>';
    
}        
// game div

?>        
        
        <script>

            // set strict mode
            "use strict";      

            // add the app object to the window
            const pacManApp = new function(){};

            // add version
            pacManApp.version = '<?php echo $version; ?>';

            // add image dir
            pacManApp.imageDir = './assets/images/';

            // add languages
            pacManApp.languages = ['en', 'nl'];
            
            // add language
            pacManApp.language = 'en';
            
<?php 

            // add strings
            require_once './assets/strings/strings.php';
            
            // add colors
            require_once './assets/colors/colors.php';
            
?>        

            // add z indexes
            pacManApp.zIndexes = {
                'screenToSmall'     :       200,
                'hoverText'         :       400
            };
            
<?php 

// game div
if( $gameDiv ){

    // set container id
    echo 'pacManApp.containerId = "gameDiv";';
    
}        
// game div
            
?>        
            // create mobile
            pacManApp.isMobile = <?php echo $isMobile ? 'true' : 'false'; ?>;

            // debug options
            pacManApp.debugOptions = {
                'on'            : true,
                'layoutOptions' : {
                    'zIndex'    : 8000,
                    'top'       : 180,
                    'left'      : 120,
                    'width'     : 800,
                    'height'    : 300        
                }
            };
            // debug options

            // add window onload event
            window.onload = function(){

                // create main
                pacManApp.main = new pacManApp.mainModule( );

                // start the application
                pacManApp.main.start();

            };
            // done add window onload event

        </script>

        <script src="./js/main.js"></script>
        <script src="./js/service/debuggerModule.js"></script>
        <script src="./js/service/htmlGeneratorModule.js"></script>
        <script src="./js/service/getUiIdModule.js"></script>
        <script src="./js/service/getElementModule.js"></script>
        <script src="./js/service/setStyleModule.js"></script>
        <script src="./js/service/getTextModule.js"></script>
        <script src="./js/service/getColorModule.js"></script>
        <script src="./js/service/extendModule.js"></script>
        <script src="./js/service/eventManagerModule.js"></script>
        <script src="./js/service/buttonModule.js"></script>
        <script src="./js/service/animations/playerModule.js"></script>
        <script src="./js/service/audio/capabilitiesModule.js"></script>

        <script src="./js/animations/inOut/inOutModule.js"></script>
        <script src="./js/animations/inOut/valuesModule.js"></script>
        
        <script src="./js/game/gameModule.js"></script>

        <script src="./js/game/service/fullScreenModule.js"></script>
        
        <script src="./js/game/hoverText/hoverTextModule.js"></script>
        
        <script src="./js/game/container/containerModule.js"></script>
        <script src="./js/game/container/layoutModule.js"></script>
        
        <script src="./js/game/container/screenToSmall/screenToSmallModule.js"></script>
        <script src="./js/game/container/screenToSmall/messageModule.js"></script>
        <script src="./js/game/container/screenToSmall/fullScreenButtonModule.js"></script>
        
        <script src="./js/game/scenes/about/aboutModule.js"></script>
        <script src="./js/game/scenes/about/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/audioMenu/audioMenuModule.js"></script>
        <script src="./js/game/scenes/audioMenu/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/gameDescription/gameDescriptionModule.js"></script>
        <script src="./js/game/scenes/gameDescription/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/highScores/highScoresModule.js"></script>
        <script src="./js/game/scenes/highScores/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/level/levelModule.js"></script>
        <script src="./js/game/scenes/level/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/levelSelection/levelSelectionModule.js"></script>
        <script src="./js/game/scenes/levelSelection/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/menu/menuModule.js"></script>
        <script src="./js/game/scenes/menu/background/backgroundModule.js"></script>

        <script src="./js/game/scenes/splashScreen/splashScreenModule.js"></script>
        <script src="./js/game/scenes/splashScreen/background/backgroundModule.js"></script>
        
        
    </body>

</html>

