/* global $, jQuery, _, Backbone, IdleBlades */
(function($) {
    $.extend(true, window, {
        IdleBlades : {
            start : function() {
                this.view = new IdleBlades.Views.MainView();
                $("body").append(this.view.$el);
                this.view.render();
                
                this.player = new IdleBlades.Models.PlayerModel();
                
                console.log(this.player.toJSON());

                var self=this;
                
                setTimeout(function() {
                    var playerView = new IdleBlades.Views.PlayerView({
                        player : self.player
                    });
                    $("[data-role=playerViewDiv]").append(playerView.$el);
                    playerView.render();
                    
                    self.player.reset();
                },0);
            },
            
            grift : function() {
                var cash = new BigNumber(this.player.get("cash"));
                cash = cash.plus(1);
                
                var prestige = new BigNumber(this.player.get("prestige"));
                prestige = prestige.plus(1);
                
                this.player.set({
                    cash : cash.toNumber(),
                    prestige : prestige.toNumber()
                });
                console.log(cash.toNumber());
            },
            
            recruitUrchin : function(number) {
                number = number || 1;
                
                var urchins = new BigNumber(this.player.get("urchins"));
                urchins = urchins.plus(number);
                urchinCost = this.player.calculateUrchinCost(urchins);
                
                this.player.set({
                    urchins : urchins.toNumber(),
                    urchinCost : urchinCost
                });
                
                console.log("urchins: " + urchins.toNumber());
                console.log("cost: " + urchinCost);
            }
        }
    })
})(jQuery);