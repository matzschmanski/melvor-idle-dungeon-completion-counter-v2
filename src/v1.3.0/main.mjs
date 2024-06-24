export function setup(ctx) {
    const id = 'DCCV2';
    const title = 'Dungeon Completion Counter';
    //game.combat.player.manager.getDungeonCompleteCount(game.dungeons.registeredObjects.get('melvorTotH:Underground_Lava_Lake'))

    const debugLog = (...msg) => {
        console.log(`[${id}] `, ...msg);
    }

    ctx.onInterfaceReady(async (ctx) => {
        debugLog('loading...');
        loadDefaultDungeonCompletionCounts();
        updateDungeonCompletionCounts();
        debugLog('loaded');
    });

    ctx.patch(CombatManager, 'setDungeonCompleteCount').after(() => {
        updateDungeonCompletionCounts();
    });

    ctx.patch(CombatManager, 'addDungeonCompletion').after(() => {
        updateDungeonCompletionCounts();
    });

    function updateDungeonCompletionCounts(){
        game.combat.dungeonCompletion.forEach((kc, d) => {
            setDungeonCompletionCountText(kc, d);
        });
    }

    function loadDefaultDungeonCompletionCounts(){
        game.dungeons.forEach(a => setDungeonCompletionCountText(0,a));
    }

    function setDungeonCompletionCountText(kc, dungeon){
        // setDungeonCompleteCount
        var eleName = 'tutorial-'; 
        eleName = eleName + dungeon.id;
    
        var kcElementName = eleName + '-kc';
        var kcElement = document.getElementById(kcElementName);
        if(!kcElement){
            var parentNode = document.getElementById(eleName).parentNode; 
            var textDiv = document.createElement('div');
            textDiv.className = 'font-size-sm'; 
            textDiv.id = eleName + '-kc';
            textDiv.innerHTML = '<small>Times completed: ' + kc + '</small>';
            parentNode.appendChild(textDiv);
        }else{
            kcElement.innerHTML = '<small>Times completed: ' + kc + '</small>';
        }
    }
}
