export function setup(ctx) {
    const id = 'dungeon-completion-counter';
    const title = 'Dungeon Completion Counter';
    //game.combat.player.manager.getDungeonCompleteCount(game.dungeons.registeredObjects.get('melvorTotH:Underground_Lava_Lake'))
    ctx.onInterfaceReady(async (ctx) => {
        loadDefaultDungeonCompletionCounts();
        updateDungeonCompletionCounts();
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
