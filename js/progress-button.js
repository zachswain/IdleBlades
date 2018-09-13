// The progress meter functionality is available as a series of plugins.
// You can put this code in a separate file if you wish to keep things tidy.

(function($){

    // Creating a number of jQuery plugins that you can use to
    // initialize and control the progress meters.

    $.fn.progressInitialize = function(){

        // This function creates the necessary markup for the progress meter
        // and sets up a few event listeners.

        // Loop through all the buttons:

        return this.each(function(){

            var button = $(this),
                progress = 0;

            // Extract the data attributes into the options object.
            // If they are missing, they will receive default values.

            var options = $.extend({
                type:'background-horizontal',
                loading: 'Loading..',
                finished: 'Done!'
            }, button.data());

            // Add the data attributes if they are missing from the element.
            // They are used by our CSS code to show the messages
            button.attr({'data-loading': options.loading, 'data-finished': options.finished});

            // Add the needed markup for the progress bar to the button
            var bar = $('<span class="tz-bar ' + options.type + '">').appendTo(button);

            // The progress event tells the button to update the progress bar
            button.on('progress', function(e, val, absolute, finish){

                if(!button.hasClass('in-progress')){

                    // This is the first progress event for the button (or the
                    // first after it has finished in a previous run). Re-initialize
                    // the progress and remove some classes that may be left.

                    bar.show();
                    progress = 0;
                    button.removeClass('finished').addClass('in-progress')
                }

                // val, absolute and finish are event data passed by the progressIncrement
                // and progressSet methods that you can see near the end of this file.

                if(absolute){
                    progress = val;
                }
                else{
                    progress += val;
                }

                if(progress >= 100){
                    progress = 100;
                }

                if(finish){
                    button.removeClass('in-progress').addClass('finished');

                    bar.hide();
                    progress=0;
                    setProgress(progress);
                    button.trigger('progress-finish');
                }

                setProgress(progress);
            });

            function setProgress(percentage){
                bar.filter('.background-horizontal,.background-bar').width(percentage+'%');
                bar.filter('.background-vertical').height(percentage+'%');
            }
        });

    };

    // progressStart simulates activity on the progress meter. Call it first,
    // if the progress is going to take a long time to finish.

    $.fn.progressStart = function(){

        var button = this.first(),
            last_progress = new Date().getTime();

        if(button.hasClass('in-progress')){
            // Don't start it a second time!
            return this;
        }

        button.on('progress', function(){
            last_progress = new Date().getTime();
        });

        // Every half a second check whether the progress 
        // has been incremented in the last two seconds

        var interval = window.setInterval(function(){

            if( new Date().getTime() > 2000+last_progress){

                // There has been no activity for two seconds. Increment the progress
                // bar a little bit to show that something is happening

                button.progressIncrement(5);
            }

        }, 500);

        button.on('progress-finish',function(){
            window.clearInterval(interval);
        });

        return button.progressIncrement(10);
    };

    $.fn.progressFinish = function(){
        return this.first().progressSet(100);
    };

    $.fn.progressIncrement = function(val){

        val = val || 10;

        var button = this.first();

        button.trigger('progress',[val])

        return this;
    };
    
    $.fn.disable = function() {
        var button = this.first();
        
        button.attr("disabled", "disabled").addClass("disabled");
        console.log("disabled");
        
        return this;
    };
    
    $.fn.enable = function() {
        var button = this.first();
        button.removeAttr("disabled").removeClass("disabled");
        console.log("enabled");
        
        return this;
    };
    
    $.fn.isDisabled = function() {
        var button = this.first();
        return typeof button.attr("disabled") !== typeof undefined;
    };

    $.fn.progressSet = function(val){
        val = val || 10;

        var finish = false;
        if(val >= 100){
            finish = true;
        }

        return this.first().trigger('progress',[val, true, finish]);
    };
    
    $.fn.isInProgress = function() {
        var button = this.first();
        return button.hasClass("in-progress");
    };

    // This function creates a progress meter that 
    // finishes in a specified amount of time.

    $.fn.progressTimed = function(seconds, cb){

        var button = this.first(),
            bar = button.find('.tz-bar');

        if(button.is('.in-progress') || button.isDisabled() ){
            return this;
        }

        // Set a transition declaration for the duration of the meter.
        // CSS will do the job of animating the progress bar for us.

        bar.css('transition', seconds+'s linear');
        button.progressSet(99);

        var timeoutId  = window.setTimeout(function(){
            button.removeAttr("timeoutId");
            bar.css('transition','');
            button.progressFinish();

            if($.isFunction(cb)){
                cb();
            }

        }, seconds*1000);
        button.attr("timeoutId", timeoutId);
    };
    
    $.fn.stop = function() {
        
        var button = this.first(),
            bar = button.find('.tz-bar');
            
        if( typeof button.attr("timeoutId") !== typeof undefined ) {
            window.clearTimeout(button.attr("timeoutId"));
            button.removeAttr("timeoutId");
        }
        
        button.progressSet(0);
        bar.css('transition','');
        bar.filter('.background-horizontal,.background-bar').width(0+'%');
        bar.filter('.background-vertical').height(0+'%');
        bar.hide();
        
        button.removeClass('in-progress').addClass('finished');
    }

})(jQuery);