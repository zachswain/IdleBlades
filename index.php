<html>
<head>
<link rel="stylesheet" href="css/bootstrap.min.css"></link>
<link rel="stylesheet" href="css/progress-button.css"></link>
<link rel="stylesheet" href="css/IdleBlades.css"></link>

<script type="application/javascript" src="js/jquery.min.js"></script>
<script type="application/javascript" src="js/bootstrap.min.js"></script>
<script type="application/javascript" src="js/underscore-min.js"></script>
<script type="application/javascript" src="js/backbone-min.js"></script>
<script type="application/javascript" src="js/progress-button.js"></script>
<script type="application/javascript" src="js/bignumber.min.js"></script>

<script type="application/javascript" src="js/IdleBlades/Models/PlayerModel.js"></script>

<script type="application/javascript" src="js/IdleBlades/Views/MainView.js"></script>
<script type="application/javascript" src="js/IdleBlades/Views/PlayerView.js"></script>


<script type="application/javascript" src="js/IdleBlades/IdleBlades.js"></script>

<script type="text/template" id="IdleBlades-Template-MainView">
    <h4>Idle Blades</h4>
    <div data-role="playerViewDiv"></div>
</script>

<script type="text/template" id="IdleBlades-Template-PlayerView">
    <div data-role="cashDiv">
    Cash: $<span data-role="cashSpan"><%= player.cash %></span>
    </div>
    <div data-role="prestigeDiv" class="hidden">
        Prestige: <span data-role="prestigeSpan"></span>
    </div>
    <div data-role="urchinDiv">
        Urchins: <span data-role="urchinsSpan">0</span>
        <a href="#" class="button disabled" data-role="recruitUrchinBtn" disabled >Recruit ($<span data-role="urchinCostSpan"></span>)</a>
    </div>
    
    <div>
    <a href="#" data-role="griftBtn" class="progress-button" data-loading="Grifting..." data-finished="Grift">Grift</a>
    </div>
</script>

<script type="application/javascript">
$(document).ready(function() {
    IdleBlades.start();
});
</script>
</head>
<body>
</body>
</html>