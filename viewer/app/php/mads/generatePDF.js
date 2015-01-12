/**
 * PhantomJS script to generate a PDF from a passed URL.
 * @author: Chris Hjorth
 */
var page = require('webpage').create();
var system = require('system');

var url = system.args[1];
var outputFilePath = system.args[2];

page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    border: '0px'
};
/*page.paperSize = {
    width: 4267,
    height: 3200
};*/
/*page.paperSize = {
    width: '1024px',
    height: '768px',
    border: '0px'
};*/

var width = 1040;
var height = 1470;

page.viewportSize = {
    width: width,
    height: height
};

page.open(url, function(status) {
    if(status !== 'success') {
        console.log('Unable to load the url');
        phantom.exit(2);
    }
    else {
        page.evaluate(function(w, h) {
            document.body.style.width = w + "px";
            document.body.style.height = h + "px";
        }, width, height);

        page.clipRect = {
            top: 0,
            left: 0,
            width: width,
            height: height
        };
        
        //We make sure the page has done rendering
        waitFor(
            function () {
                return page.evaluate(function () {
                    return !!document.getElementById('gyldendal-i-log-output');
                })
            },
            function() {
                page.render(outputFilePath, {format: 'pdf', quality: 100});
                phantom.exit(0);
            },
            60000
        );
    }
});

/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};