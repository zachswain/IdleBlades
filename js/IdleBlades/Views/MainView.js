/* global $, jQuery, _ */
(function($) {
    $.extend(true, window, {
        IdleBlades : {
            Views : {
                MainView : Backbone.View.extend({
                    initialize : function() {
                    },
                    
                    render : function() {
                        var template = _.template($("#IdleBlades-Template-MainView").html());
                        var text = template({});
                        this.$el.html(text);
                    }
                })
            }
        }    
    })
})(jQuery);