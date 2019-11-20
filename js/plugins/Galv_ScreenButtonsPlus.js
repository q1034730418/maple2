/**
 * 
 * Galv.SBTNS.addButton(1,'map',30 ,570,500,['button','ok'] ,0 , 10 );
 * 
 * 
 * 为了保证可以正常使用请使用  
 * 
 * Galv.SBTNS.addButton(1,'map',30 * 1 ,570,500,['button','ok'],0 , 10);
 * 强制转换为数字
 * 
 */



Galv.SBTNS.addButton = function(id, location, img, x, y, action, e, z) {
    var obj = { id: id, image: img, x: x, y: y, action: action, eOpacity: e || 0, z: z };
    var location = location.toLowerCase();
    if (location[0] == 'm') {
        // map
        obj.location = 'map';
        obj.mapId = Number(location.replace('map', ''));
        $gameSystem._gBtns[id] = obj;
        SceneManager._scene.createGBtn($gameSystem._gBtns[id]);

    }
};


Sprite_GButton.prototype.setupButton = function(b) {
    this._btn = b;
    if (typeof(b.image) == "number") {
        this.bitmap = ImageManager.loadSystem("IconSet");
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = b.image % 16 * pw;
        var sy = Math.floor(b.image / 16) * ph;
        this.setColdFrame(sx, sy, pw, ph);
        this.setHotFrame(sx, sy, pw, ph);
    } else {
        this.bitmap = ImageManager.loadSystem(b.image);
        var h = this.bitmap.height / 2;
        var w = this.bitmap.width;
        this.setColdFrame(0, 0, w, h);
        this.setHotFrame(0, h, w, h);
    }
    this.x = b.x;
    this.y = b.y;
    this.mz = b.z || 0
};



Scene_Base.prototype.initialize = function() {
    Input.clear();
    this._GButtons = [];
    Galv.SBTNS.Scene_Base_initialize.call(this);
    this.createGBtn = Galv.SBTNS.createButton.bind(this);
};


Scene_Base.prototype.removeGButton = function(id) {
    var hud = this._hudField || this
    hud.removeChild(this._GButtons[id]);
};



Galv.SBTNS.createButton = function(obj) {
    if (!obj) return;
    var index = obj.id;

    if (!Galv.SBTNS.canHasButton(index)) return;

    var hud = this._hudField || this
    hud.removeChild(this._GButtons[index]);

    this._GButtons[index] = new Sprite_GButton(obj);

    if (obj.action) {
        var type = obj.action[0];
        var data = obj.action[1];

        switch (type) {
            case 'button': // for button press emulation
                var button = data;
                this._GButtons[index].setPressHandler(Galv.SBTNS.btnPress.bind(this, data));
                this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this, data));
                break;
            case 'buttonT': // for button trigger emulation
                var button = data;
                this._GButtons[index].setPressHandler(Galv.SBTNS.btnTrigger.bind(this, data));
                this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this, data));
                break;
            case 'script': // for script calls
                var script = data;
                this._GButtons[index].setClickHandler(this.gButtonScript.bind(this, data));
                break;
            case 'event': // for common event
                this._GButtons[index].setClickHandler(Galv.SBTNS.runGCommentEvent.bind(this, data));
                break;
        }
    }
    hud.addChild(this._GButtons[index]);
    if (this.sortMz) { this.sortMz() }
};