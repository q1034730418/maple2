//=============================================================================
/*:
/*LBT_scenes.js v0.1
*@help
0.*
*plugin Command useage:
* N/A
*/
//=============================================================================

(function(){

Sprite_Damage.prototype.setupCriticalEffect = function() {
    /*this._flashColor = [255, 215, 0, 150];
    this._flashDuration = 60;*/
};
//-------------------------------------------------------
Sprite_Damage.prototype.updateFlash = function() {
    
};


})();

Window_MapName.prototype.initialize = function() {
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 520, 80, wight, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
};
Window_MapName.prototype.open = function() {
    this.refresh();
    this._showCount = 400;
};

Game_Actor.prototype.levelUp = function() {
    this._level++;

    this.currentClass().learnings.forEach(function(learning) {
        if (learning.level === this._level) {
        this.learnSkill(learning.skillId);
        }
    }, this);
   $gameActors.actor(1).gainHp($gameActors.actor(1).mhp);
   $gameActors.actor(1).gainMp($gameActors.actor(1).mmp);
   

};