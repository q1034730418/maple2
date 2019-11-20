 Actor_Hud.prototype.create_states = function() {
     if (String(Moghunter.ahud_states_visible) != "true") { return };
     this.removeChild(this._state_icon);
     if (!this._battler) { return };
     this._states_data = [0, 0, 0];
     /**修改这里 */
     this._state_icon = new Sprite_StateIconList(5, 4);
     this._state_icon.x = 15
     this._state_icon.y = 88
     this._state_icon.visible = true;

     this.addChild(this._state_icon);
     this.refresh_states();
 };

 //==============================
 // * Refresh States
 //==============================
 Actor_Hud.prototype.refresh_states = function() {
     if (!this._state_icon) { return };
     this._state_icon.setup(this._battler)
 };

 //==============================
 // * Update States
 //==============================
 Actor_Hud.prototype.update_states = function() {
     if (!this._state_icon) { return };
     this.refresh_states();
 };

 //==============================
 // * Need Refresh States
 //==============================
 Actor_Hud.prototype.need_refresh_states = function() {
     // if (this._battler.need_refresh_bhud_states) { return true };
     // if (this._states_data[2] > 60) { return true };
     // return false;
 };