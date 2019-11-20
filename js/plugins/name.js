/*:
 * @plugindesc 支持中文输入法的名字窗口。
 * @author Nighto
 * @param window_x
 * @desc 输入窗口的X值
 * @default 310
 *
 * @param window_y
 * @desc 输入窗口的Y值
 * @default 330
 *
 * @param window_width
 * @desc 输入窗口的宽度
 * @default 233
 *
 * @param background
 * @desc 背景文件名，留空就是什么都没有
 * @default img/system/Name.png
 *
 * @help 我已经没有什么可帮你的了- -
 * 
 */
 
Input.keyMapper[8] = "backspace";
var INX = Number(PluginManager.parameters('nameinput')['window_x']);
var INY = Number(PluginManager.parameters('nameinput')['window_y']);
var INWidth = Number(PluginManager.parameters('nameinput')['window_width']);
var INbackground = String(PluginManager.parameters('nameinput')['background']);
 
 
//================
function Window_NameExplanation() {
        this.initialize.apply(this, arguments);
}
 
Window_NameExplanation.prototype = Object.create(Window_Base.prototype);
Window_NameExplanation.prototype.constructor = Window_NameExplanation;
 
Window_NameExplanation.prototype.initialize = function(actor, x, y) {
        var width = Graphics.boxWidth - x * 2;
        var height = 128;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = actor;
        this.refresh();
};
 
Window_NameExplanation.prototype.refresh = function() {
        this.contents.clear();
        this.drawText("请输入主角姓名。", 0, 0, this.width-32, 'right');
        this.drawText("按Enter/Space确定，退格键删除输入，ESC使用默认姓名。", 0, this.lineHeight(), this.width-32, 'right');
        //this.drawActorFace(this._actor, 0, this.height-144);
};
 
 
//================
function Window_NameInput() {
    this.initialize.apply(this, arguments);
}
 
Window_NameInput.prototype = Object.create(Window_Selectable.prototype);
Window_NameInput.prototype.constructor = Window_NameInput;
 
Window_NameInput.prototype.initialize = function(){
    var x = Graphics.boxWidth - INX * 2 - INWidth;
    var y = INY+128;
    var width = INWidth;
    var height = 72;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actorName = '',
        this._index = 0;
    this.refresh();
    this.updateCursor();
    this.activate();
};
 
Window_NameInput.prototype.maxCols = function() {
    return 1;
};
 
Window_NameInput.prototype.maxItems = function() {
    return 1;
};
 
Window_NameInput.prototype.setInput = function(name) {
    this._actorName = name;
};
 
Window_NameInput.prototype.refresh = function() {
    //var table = this.table();
    this.contents.clear();
    this.resetTextColor();
    this.drawText(this._actorName, 0, 0, INWidth-32, 'center');
};
 
Window_NameInput.prototype.isCursorMovable = function() {
    return this.active;
};
 
function Scene_Name() {
    this.initialize.apply(this, arguments);
}
 
Scene_Name.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Name.prototype.constructor = Scene_Name;
 
Scene_Name.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
 
Scene_Name.prototype.prepare = function(actorId, maxLength) {
    this._actorId = actorId;
    this._maxLength = maxLength;
};
 
Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
        this._name = '';
        this._expWindow = new Window_NameExplanation(this._actor, INX, INY);
        this.addWindow(this._expWindow);
    this.createInputWindow();
        this.createInputName();
};
 
Scene_Name.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
 
Scene_Name.prototype.createInputWindow = function() {
    this._inputWindow = new Window_NameInput();
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
        this._inputWindow.setHandler('cancel', this.onInputCancel.bind(this));
    this.addWindow(this._inputWindow);
};
 
Scene_Name.prototype.onInputOk = function() {
    this._actor.setName(this._name);
    this.popScene();
};
Scene_Name.prototype.onInputCancel = function() {
    this.popScene();
};
 
 
Scene_Name.prototype.createInputName = function() {
        this._nameinput = document.createElement('input');
        this._nameinput.name = 'someinput';
        this._nameinput.value = this._actor.name();
        this._nameinput.style.top = Graphics.boxHeight / 2;
        document.body.appendChild(this._nameinput);
        //alert(this._nameinput);
};
Scene_Name.prototype.update = function() {
        this._nameinput.focus();
        if(Input.isTriggered('backspace')) {
                this._nameinput.value = this._name.slice(0, this._name.length-1);
                //alert(345);
        }
        this.updateValue();
        Scene_Base.prototype.update.call(this);
};
 
Scene_Name.prototype.updateValue = function() {
        var refresh = false;
        if(this._nameinput.value != this._name){
                this._name = this._nameinput.value;
                this._inputWindow.setInput(this._name);
                refresh = true;
        }
        if(refresh){
                this._inputWindow.refresh();
                }
};
Scene_Name.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
        if (INbackground != ''){
                this._backgroundSprite1 = new Sprite();
                this._backgroundSprite1.bitmap = Bitmap.load(INbackground);
                this.addChild(this._backgroundSprite1);
        }
};