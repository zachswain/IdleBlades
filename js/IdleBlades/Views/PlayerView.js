/* global $, jQuery, _, Backbone, IdleBlades */
(function($) {
    $.extend(true, window, {
        IdleBlades : {
            Views : {
                PlayerView : Backbone.View.extend({
                    widgets : {
                        cashDiv : "[data-role=cashDiv]",
                        cashSpan : "[data-role=cashSpan]",
                        prestigeDiv : "[data-role=prestigeDiv]",
                        prestigeSpan : "[data-role=prestigeSpan]",
                        griftBtn : "[data-role=griftBtn]",
                        recruitUrchinBtn : "[data-role=recruitUrchinBtn]",
                        urchinsSpan : "[data-role=urchinsSpan]",
                        urchinCostSpan : "[data-role=urchinCostSpan]"
                    },
                    
                    events : {
                        "click [data-role=recruitUrchinBtn]" : "onRecruitUrchinClicked"
                    },
                    
                    initialize : function(parameters) {
                        console.log(parameters);
                        this.player = parameters.player;
                        
                        this.listenTo(this.player, "change:cash", this.onChangeCash)
                        this.listenTo(this.player, "change:prestige", this.onPrestigeChange);
                        this.listenTo(this.player, "change:urchins", this.onUrchinsChange);
                        this.listenTo(this.player, "change:urchinCost", this.onUrchinCostChange);
                    },
                    
                    render : function() {
                        var template = _.template($("#IdleBlades-Template-PlayerView").html());
                        var text = template({ player : this.player.toJSON() });
                        this.$el.html(text);
                        
                        var self=this;
                        
                        setTimeout(function() {
                            self.$el.find(self.widgets.griftBtn).progressInitialize();

                            self.$el.find(self.widgets.griftBtn)
                                .click(function(e) {
                                    if( !self.$el.find(self.widgets.griftBtn).isInProgress() ) {
                                        self.$el.find(self.widgets.griftBtn).progressTimed(1, function() {
                                            IdleBlades.grift();
                                        });
                                    }
                                });
                        });
                    },
                    
                    onChangeCash : function(e) {
                        this.$el.find(this.widgets.cashSpan).html(BigNumber(this.player.get("cash")).toNumber());
                        
                        if( BigNumber(this.player.get("cash")).toNumber()>1 ) {
                            this.$el.find(this.widgets.recruitUrchinBtn).removeClass("disabled");
                            console.log("enabled");
                        } else {
                            this.$el.find(this.widgets.recruitUrchinBtn).addClass("disabled");
                            console.log("disabled");
                        }
                    },
                    
                    onPrestigeChange : function(e) {
                        if( this.player.get("prestige") > 0 ) {
                            this.$el.find(this.widgets.prestigeDiv).removeClass("hidden");
                            console.log("showing");
                        }
                        this.$el.find(this.widgets.prestigeSpan).html(BigNumber(this.player.get("prestige")).toNumber());
                    },
                    
                    onRecruitUrchinClicked : function(e) {
                        IdleBlades.recruitUrchin();
                    },
                    
                    onUrchinsChange : function(e) {
                        this.$el.find(this.widgets.urchinsSpan).html(BigNumber(this.player.get("urchins")).toNumber());
                    },
                    
                    onUrchinCostChange : function(e) {
                        this.$el.find(this.widgets.urchinCostSpan).html(BigNumber(this.player.get("urchinCost")).toNumber());
                    }
                })
            }
        }    
    })
})(jQuery);