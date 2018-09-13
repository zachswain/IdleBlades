/* global $, jQuery, _, Backbone, IdleBlades */
(function($) {
    $.extend(true, window, {
        IdleBlades : {
            Models : {
                PlayerModel : Backbone.Model.extend({
                    defaults : {
                        cash : 3,
                        prestige : 0,
                        urchins : 0,
                        urchinCost : 1
                    },
                    
                    initialize : function() {
                        this.set(this.defaults);
                    },
                    
                    reset : function() {
                        this.clear().set(this.defaults);
                    },
                    
                    calculateUrchinCost : function(urchins) {
                        return BigNumber(urchins * 1.1 + 1).integerValue();
                    }
                })
            }
        }
    })
})(jQuery);