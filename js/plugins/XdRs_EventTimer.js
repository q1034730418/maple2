//==================================================================================================================
/*:
 * @plugindesc 事件计时器 。
 * 
 * @author 芯☆淡茹水
 * 
 * @help
 *〓 插件命令 〓
 *
 *    EvTimer eventId Sec mapId    <= 使一个事件开始倒计时。
 *    参数：eventId  ->  显示计时的事件ID。
 *              Sec      ->  计时的秒数。
 *              mapId    ->  事件所在的地图ID。可不填写，不写默认为当前地图。
 *    例：30秒倒计时当前地图的 5 号事件    -> EvTimer 5 30
 *            2分钟倒计时 8 号地图的 20 号事件 -> EvTimer 20 120 8
 *
 *    DelTimer eventId mapId      <= 删除一个事件的倒计时。
 *    参数：eventId  ->  事件ID。
 *              mapId    ->  事件所在的地图ID。可不填写，不写默认为当前地图。
 *    例：删除当前地图 2 号事件的计时  -> DelTimer 2
 *            删除 5 号地图 11 号事件的计时  -> DelTimer 11 5
 *
 *〓 说明 〓
 *  1，计时完成后，事件自动运行其当前页。
 *  2，支持存取档的计时继承。
 *  3，全场景计时，无论在游戏中任何场景，所有计时都在进行。
 *  4，非当前地图的事件计时完成时，需转移到计时完成的事件所在地图，事件才自动运行。
 *-------------------------------------------------------------------------------
 * @param trigger
 * @desc 事件在计时时，达到触发条件是否可以触发事件（是：ON；否：OFF）。
 * @default OFF
 *-------------------------------------------------------------------------------
 * @param useBack
 * @desc 是否使用背景（是：ON；否：OFF）。
 * @default ON
 *-------------------------------------------------------------------------------
 * @param fontSize
 * @desc 描绘计时的字体大小。
 * @default 22
 *-------------------------------------------------------------------------------
 * @param addX
 * @desc 计时器在事件头顶 X （左右）方向调节（正数：往右移；负数：往左移）。
 * @default 0
 *-------------------------------------------------------------------------------
 * @param addY
 * @desc 计时器在事件头顶 Y （上下）方向调节（正数：往下移；负数：往上移）。
 * @default 0
 *-------------------------------------------------------------------------------
 * @param backColor
 * @desc 背景颜色（格式：红,绿,蓝）。
 * @default 80,80,80
 *-------------------------------------------------------------------------------
 * @param nomColor
 * @desc 时间描边颜色（格式：红,绿,蓝）。
 * @default 0,0,0
 *-------------------------------------------------------------------------------
 * @param lowColor
 * @desc 10 秒及以内的时间描边颜色（格式：红,绿,蓝）。
 * @default 200,120,0
 *-------------------------------------------------------------------------------
 * @param nocColor
 * @desc 5 秒及以内的时间描边颜色（格式：红,绿,蓝）。
 * @default 200,0,0
 *-------------------------------------------------------------------------------
 * @param timeSe
 * @desc 计时器小于十秒时，播放的 SE （不播放就不写）。
 * @default Knock
 *
*/
//==================================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.eventTimer = XdRsData.eventTimer || {};
//==================================================================================================================
XdRsData.eventTimer.pepr     =    PluginManager.parameters('XdRs_EventTimer');
XdRsData.eventTimer.fontSize =   +XdRsData.eventTimer.pepr['fontSize']  || 22;
XdRsData.eventTimer.addX     =   +XdRsData.eventTimer.pepr['addX']      || 0;
XdRsData.eventTimer.addY     =   +XdRsData.eventTimer.pepr['addY']      || 0;
XdRsData.eventTimer.backColor= ''+XdRsData.eventTimer.pepr['backColor'] || '';
XdRsData.eventTimer.nomColor = ''+XdRsData.eventTimer.pepr['nomColor']  || '';
XdRsData.eventTimer.lowColor = ''+XdRsData.eventTimer.pepr['lowColor']  || '';
XdRsData.eventTimer.nocColor = ''+XdRsData.eventTimer.pepr['nocColor']  || '';
XdRsData.eventTimer.timeSe   = ''+XdRsData.eventTimer.pepr['timeSe']    || '';
XdRsData.eventTimer.useBack  = ''+XdRsData.eventTimer.pepr['useBack'] === 'ON';
XdRsData.eventTimer.trigger  = ''+XdRsData.eventTimer.pepr['trigger'] === 'ON';
//==================================================================================================================
XdRsData.eventTimer.lineColor = function(time) {
    if (!typeof(time) === "number") return;
    var data = time > 10 ? this.nomColor : (time > 5 ? this.lowColor : this.nocColor);
    if (!data) return;
    data = data.split(',');
    return 'rgba('+data[0]+','+data[1]+','+data[2]+',0.5)';
};
XdRsData.eventTimer.getBackColor = function(a) {
    var data = !!this.backColor ? this.backColor : '0,0,0';
    data = data.split(',');
    return 'rgba('+data[0]+','+data[1]+','+data[2]+','+a+')';
};
//==================================================================================================================
Bitmap.prototype.setLineColor = function(color) {
    this.outlineColor = color || 'rgba(0, 0, 0, 0.5)';
};
//==================================================================================================================
Game_System.prototype.evTimerData = function() {
    return this._evTimerData || [];
};
Game_System.prototype.evTimer = function(eventId) {
    var data = this.evTimerData()[$gameMap.mapId()];
    return !!data ? data[eventId] : null;
};
Game_System.prototype.startTime = function(eventId, sec, mapId) {
    mapId = mapId || $gameMap.mapId();
    this._evTimerData = this._evTimerData || [];
    this._evTimerData[mapId] = this._evTimerData[mapId] || [];
    this._evTimerData[mapId][eventId] = sec * 60;
};
Game_System.prototype.updateEvTimer = function() {
    if (!this._evTimerData || !this._evTimerData.length) return;
    for (var i=0;i<this._evTimerData.length;i++){
        var data = this._evTimerData[i];
        if (!data) continue;
        for (var j=0;j<data.length;j++){if (!!data[j]) data[j]--;}
    }
};
Game_System.prototype.delEvTimer = function(eventId, mapId) {
    if (!this._evTimerData || !this._evTimerData.length) return;
    mapId = mapId || $gameMap.mapId();
    this._evTimerData[mapId].splice(eventId, 1);
    if (!this._evTimerData[mapId].length) this._evTimerData.splice(mapId,1);
};
//==================================================================================================================
Game_Event.prototype.time = function() {
    return $gameSystem.evTimer(this._eventId);
};
Game_Event.prototype.isTime = function() {
    return typeof(this.time()) === "number";
};
XdRsData.eventTimer.GEupdate = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    XdRsData.eventTimer.GEupdate.call(this);
    this.updateTimeState();
};
Game_Event.prototype.updateTimeState = function() {
    if (this._dataTime === !!this.time()) return;
    this._dataTime = !!this.time();
    if (this.isTime() && !this.time() && ($gameSystem.delEvTimer(this._eventId) || this.start())){}
};
XdRsData.eventTimer.GEstart = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    if (this.isTime() && !XdRsData.eventTimer.trigger) return;
    XdRsData.eventTimer.GEstart.call(this);
};
//==================================================================================================================
XdRsData.eventTimer.GIpluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdRsData.eventTimer.GIpluginCommand.call(this, command, args);
    if (command === 'EvTimer') {
        var id = +args[0], sec = +args[1], mapId = +args[2];
        $gameSystem.startTime(id, sec, mapId);
    }
    if (command === 'DelTimer') {
        var id = +args[0], mapId = +args[1];
        $gameSystem.delEvTimer(id, mapId);
    }
};
//==================================================================================================================
function XdRs_EvTimer() {
    this.initialize.apply(this, arguments);
}
XdRs_EvTimer.prototype = Object.create(Sprite.prototype);
XdRs_EvTimer.prototype.constructor = XdRs_EvTimer;
XdRs_EvTimer.prototype.initialize = function(character, ch) {
    Sprite.prototype.initialize.call(this);
    this.iniData(character);
    if (this.setBitmap() || this.setPlace(ch)){}
};
XdRs_EvTimer.prototype.iniData = function(character) {
    this._character = character;
};
XdRs_EvTimer.prototype.CalculationSize = function() {
    this._h = XdRsData.eventTimer.fontSize + 6;
    this._w = XdRsData.eventTimer.fontSize * 6;
};
XdRs_EvTimer.prototype.setBitmap = function() {
    this.CalculationSize();
    this.bitmap = new Bitmap(this._w, this._h);
    this.bitmap.fontSize = XdRsData.eventTimer.fontSize;
    this.drawTime();
};
XdRs_EvTimer.prototype.setPlace = function(ch) {
    this.anchor.x = 0.5;this.anchor.y = 1;
    var y = -(ch+5) + XdRsData.eventTimer.addY;
    this.move(XdRsData.eventTimer.addX, y);
};
XdRs_EvTimer.prototype.drawBack = function() {
    var cw = Math.floor(this._w / 2);
    var ch = Math.floor(this._h / 2);
    var c1 = 'rgba(0,0,0,0)',c2 = 'rgba(0,0,0,1)';
    var b1 = XdRsData.eventTimer.getBackColor(0);
    var b2 = XdRsData.eventTimer.getBackColor(0.6);
    this.bitmap.gradientFillRect(0,0,cw,2,c1, c2);
    this.bitmap.gradientFillRect(cw,0,cw,2,c2, c1);
    this.bitmap.gradientFillRect(0,this._h-2,cw,2,c1, c2);
    this.bitmap.gradientFillRect(cw,this._h-2,cw,2,c2, c1);
    this.bitmap.gradientFillRect(0,2,cw,this._h-4,b1, b2);
    this.bitmap.gradientFillRect(cw,2,cw,this._h-4,b2, b1);
};
XdRs_EvTimer.prototype.evSec = function() {
    return  Math.floor(this._character.time() / 60);
};
XdRs_EvTimer.prototype.evTimeText = function() {
    var hour = Math.floor(this.evSec() / 60 / 60);
    var min = Math.floor(this.evSec() / 60) % 60;
    var sec = this.evSec() % 60;
    return hour.padZero(2) + ':' + min.padZero(2) + ':' + sec.padZero(2);
};
XdRs_EvTimer.prototype.drawTime = function() {
    this.bitmap.clear();
    if (XdRsData.eventTimer.useBack) this.drawBack();
    this.bitmap.setLineColor(XdRsData.eventTimer.lineColor(this.evSec()));
    var cw = this.bitmap.measureTextWidth(this.evTimeText());
    var x = (this._w - cw) / 2;
    this.bitmap.drawText(this.evTimeText(),x,3,cw,XdRsData.eventTimer.fontSize);
    if (this.evSec() > 10) return;
    var name = XdRsData.eventTimer.timeSe;
    if (!name) return;
    AudioManager.playSe({"name":name,"volume":100,"pitch":100,"pan":0});
};
XdRs_EvTimer.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateTime();
};
XdRs_EvTimer.prototype.updateTime = function() {
    if (!this._character.isTime() || !!(this._character.time() % 60)) return;
    this.drawTime();
};
//==================================================================================================================
XdRsData.eventTimer.SCupdate = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    XdRsData.eventTimer.SCupdate.call(this);
    if (this.isEvent() && this.updateEvTimer()){}
};
Sprite_Character.prototype.isEvent = function() {
    return this._character.constructor === Game_Event;
};
Sprite_Character.prototype.updateEvTimer = function() {
    if (!!this._evTimer && this.bitmapChanged() && this.setTimerPlace())   {};
    if (!!this._evTimer && !this._character.isTime() && this.removeTimer()){};
    if (!this._evTimer && !!this._character.isTime() && this.createTimer()){};
};
Sprite_Character.prototype.bitmapChanged = function() {
    return this._dataCh !== this.patternHeight();
};
Sprite_Character.prototype.setTimerPlace = function() {
    this._evTimer.setPlace(this.patternHeight());
    this._dataCh = this.patternHeight();
};
Sprite_Character.prototype.removeTimer = function() {
    this.removeChild(this._evTimer);
    this._evTimer = null;
};
Sprite_Character.prototype.createTimer = function() {
    this._evTimer = new XdRs_EvTimer(this._character, this.patternHeight());
    this._dataCh = this.patternHeight();
    this.addChild(this._evTimer);
};
//==================================================================================================================
XdRsData.eventTimer.SBupdate = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    XdRsData.eventTimer.SBupdate.call(this);
    this.updateEventTimer();
};
Scene_Base.prototype.updateEventTimer = function() {
    if (!!$gameSystem && $gameSystem.updateEvTimer()){}
};
//==================================================================================================================