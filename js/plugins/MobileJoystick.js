//==============================
// MobileJoystick.js
//==============================

/*:
 * @plugindesc v1.2 虚拟摇杆
 * @author 江湖梦网 Fanzi
 * @version 1.2
 *
 * @param ---主项---
 * @default
 *
 * @param PC端摇杆
 * @parent ---主项---
 * @desc 游戏发布PC端是否开启摇杆效果
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default false
 *
 * @param 战场摇杆
 * @parent ---主项---
 * @desc 战斗场景是否开启摇杆效果
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default false
 *
 * @param 菜单摇杆
 * @parent ---主项---
 * @desc 菜单场景是否开启摇杆效果
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default false
 *
 * @param 点击移动
 * @parent ---主项---
 * @desc 是否维持点击地图控制角色移动
 * @type boolean
 * @on 维持
 * @off 禁止
 * @default true
 *
 * @param 方向键盘
 * @parent ---主项---
 * @desc 左下角方向盘图片，system文件夹
 * @default DirPad
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 方向X坐标
 * @parent ---主项---
 * @desc 方向盘左上角的X坐标
 * @type number
 * @min 0
 * @default 100
 *
 * @param 方向Y坐标
 * @parent ---主项---
 * @desc 方向盘左上角的X坐标
 * @type number
 * @min 0
 * @default 600
 *
 * @param 摇杆图片
 * @parent ---主项---
 * @desc 按方向盘时显示的摇杆，留空则不启用
 * @default Shadow
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 按钮动态
 * @parent ---主项---
 * @desc 按下按钮是否显示并且等待响应，50毫秒
 * @type boolean
 * @on 动态延时
 * @off 静态即时
 * @default true
 *
 * @param 关闭触摸
 * @parent ---主项---
 * @desc 填写需要关闭触摸指令的菜单界面名称
 * @type text[]
 * @default ["Scene_Menu"]
 *
 * @param ---地图按钮---
 * @default
 *
 * @param 地图按钮-1
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-2
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-3
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-4
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-5
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-6
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-7
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-8
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-9
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-10
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-11
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-12
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
  * @param 地图按钮-13
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-14
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-15
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 地图按钮-16
 * @parent ---地图按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param ---战场按钮---
 * @default
 *
 * @param 战场按钮-1
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-2
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-3
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-4
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-5
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-6
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-7
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-8
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-9
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 战场按钮-10
 * @parent ---战场按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 * 
 * @param ---菜单按钮---
 * @default
 *
 * @param 菜单按钮-1
 * @parent ---菜单按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 菜单按钮-2
 * @parent ---菜单按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 菜单按钮-3
 * @parent ---菜单按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 菜单按钮-4
 * @parent ---菜单按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @param 菜单按钮-5
 * @parent ---菜单按钮---
 * @type struct<Butten>
 * @desc 按钮内容的详细配置信息
 * @default
 *
 * @help
 * 本插件为 江湖梦网•Fanzi 原创力作，仅供江湖梦网入驻游戏免费使用，其它
 * 游戏如需使用请咨询 江湖梦网 或 Fanzi 获得授权，未经授权的使用将可能受
 * 到侵权追究。
 *
 * 本插件可以在地图、战斗场景、各式菜单界面生成触摸方向盘与自定义功能的
 * 按钮，其中方向盘模拟摇杆样式，地图与战斗界面各支持最多十个按钮，菜单
 * 支持最多五个，方向盘及所有按钮全为圆形有效范围，按钮支持调用公共事件、
 * 键盘按键、自定义脚本，插件取消双指触屏返回功能，所有按钮支持同时触发，
 * 使游戏得以模仿 ARPG效果，如配合作者修改的 MOG_LMBS.js 插件使用，
 * 在战斗场景生成按钮，点击按钮可施放技能或使用物品，效果极佳。
 *
 * 插件使用到的素材需为圆形，置于 img/system/ 文件夹里，
 * 音效置于 audio/se/ 文件夹里。
 * 按钮调用键盘按键的按键列表如下：
 * 填写：     对应键：       填写：    对应键：
 * tab       ：tab             ok      ：enter、space、Z
 * shift     ：shift           escape  ：escape、insert、X、numpad 0
 * control   ：control、alt    left    ：left arrow、numpad 4
 * pageup    ：pageup、Q       right   ：right arrow、numpad 6
 * pagedown  ：pagedown、W     up      ：up arrow、numpad 8
 * debug     ：F9              down    ：down arrow、numpad 2
 *
 * 如遇有些插件生成的菜单不显示方向盘与按钮，或者点击无响应，可作如下调整：
 * 1、本插件需优于其它菜单插件运行，请放在插件管理器底层。
 * 2、本插件关于菜单功能写在 Scene_MenuBase 类，有些插件可能会将菜单继
 * 承直接跳过 Scene_MenuBase 类，而直接继承在 Scene_Base 类上，遇到这种
 * 情况需修改对应的生成或修改菜单的插件(非摇杆插件)。
 * 搜索以下语句：
 * Scene_Base.prototype.create.call(this);
 * Scene_Base.prototype.update.call(this);
 * 分别替换为以下语句即可：
 * Scene_MenuBase.prototype.create.call(this);
 * Scene_MenuBase.prototype.update.call(this);
 */
/*~struct~Butten:
 * 
 * @param 启用按钮
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc true - 启用，false - 禁用
 * @default false
 * 
 * @param 按钮图片
 * @desc 选择按钮使用的图片素材
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 按钮X坐标
 * @type number
 * @min 0
 * @desc 希望按钮出现位置的左上角X坐标
 * @default
 *
 * @param 按钮Y坐标
 * @type number
 * @min 0
 * @desc 希望按钮出现位置的左上角Y坐标
 * @default
 * 
 * @param 触发模式
 * @type boolean
 * @on 按下触发
 * @off 松手触发
 * @desc true - 按下触发、按住连发，false - 松手触发、按住不发
 * @default false
 *
 * @param 调用类型
 * @type select
 * @option 公共事件
 * @value 0
 * @option 键盘按键
 * @value 1
 * @option 运行脚本
 * @value 2
 * @desc 0 - 公共事件   1 - 键盘按键   2 - 运行脚本
 * @default
 * 
 * @param 公共事件id
 * @type number
 * @min 0
 * @desc 按下按钮调用的公共事件id，非此类型不填
 * @default
 *
 * @param 键盘按键
 * @desc 按下按钮调用的键盘按键，非此类型不填
 * @default
 *
 * @param 运行脚本
 * @desc 按下按钮调用的脚本内容，非此类型不填
 * @default
 *
 * @param 按钮声效
 * @parent ---主项---
 * @desc 按下功能按钮声效，留空则不启用
 * @default Sword1
 * @require 1
 * @dir audio/se/
 * @type file
 */
//==============================

Imported.MobileJoystick = 1.3;

var MobileJoystick = MobileJoystick || {};
MobileJoystick.Parameters = PluginManager.parameters('MobileJoystick');

MobileJoystick.PCJoystick = MobileJoystick.Parameters['PC端摇杆'].toLowerCase() == 'true';
MobileJoystick.btlJoystick = MobileJoystick.Parameters['战场摇杆'].toLowerCase() == 'true';
MobileJoystick.menuJoystick = MobileJoystick.Parameters['菜单摇杆'].toLowerCase() == 'true';
MobileJoystick.TouchMove = MobileJoystick.Parameters['点击移动'].toLowerCase() == 'true';
MobileJoystick.Respond = MobileJoystick.Parameters['按钮动态'].toLowerCase() == 'true';
MobileJoystick.DirPadimg = String(MobileJoystick.Parameters['方向键盘']);
MobileJoystick.DirPadX = parseInt(MobileJoystick.Parameters['方向X坐标']);
MobileJoystick.DirPadY = parseInt(MobileJoystick.Parameters['方向Y坐标']);
MobileJoystick.Shadow = String(MobileJoystick.Parameters['摇杆图片']);
MobileJoystick.Scenes = MobileJoystick.Parameters['关闭触摸'];
MobileJoystick.mapBtn = [];
MobileJoystick.mapBtnActive = [];
MobileJoystick.mapBtnName = [];
MobileJoystick.mapBtnX = [];
MobileJoystick.mapBtnY = [];
MobileJoystick.mapBtnMode = [];
MobileJoystick.mapBtnType = [];
MobileJoystick.mapBtnEvent = [];
MobileJoystick.mapBtnKey = [];
MobileJoystick.mapBtnScript = [];
MobileJoystick.mapBtnSound = [];
MobileJoystick.btlBtn = [];
MobileJoystick.btlBtnActive = [];
MobileJoystick.btlBtnName = [];
MobileJoystick.btlBtnX = [];
MobileJoystick.btlBtnY = [];
MobileJoystick.btlBtnMode = [];
MobileJoystick.btlBtnType = [];
MobileJoystick.btlBtnEvent = [];
MobileJoystick.btlBtnKey = [];
MobileJoystick.btlBtnScript = [];
MobileJoystick.btlBtnSound = [];
MobileJoystick.menuBtn = [];
MobileJoystick.menuBtnActive = [];
MobileJoystick.menuBtnName = [];
MobileJoystick.menuBtnX = [];
MobileJoystick.menuBtnY = [];
MobileJoystick.menuBtnMode = [];
MobileJoystick.menuBtnType = [];
MobileJoystick.menuBtnEvent = [];
MobileJoystick.menuBtnKey = [];
MobileJoystick.menuBtnScript = [];
MobileJoystick.menuBtnSound = [];
for (var i = 0; i < 16; i++) {
    if (MobileJoystick.Parameters['地图按钮-' + String(i + 1)] != '') {
        MobileJoystick.mapBtn[i] = JSON.parse(MobileJoystick.Parameters['地图按钮-' + String(i + 1)]);
    } else {
        MobileJoystick.mapBtn[i] = {};
    }
    MobileJoystick.mapBtnActive[i] = MobileJoystick.mapBtn[i]['启用按钮'] || false;
    MobileJoystick.mapBtnName[i] = String(MobileJoystick.mapBtn[i]['按钮图片']);
    MobileJoystick.mapBtnX[i] = Number(MobileJoystick.mapBtn[i]['按钮X坐标']);
    MobileJoystick.mapBtnY[i] = Number(MobileJoystick.mapBtn[i]['按钮Y坐标']);
    MobileJoystick.mapBtnMode[i] = MobileJoystick.mapBtn[i]['触发模式'] || false;
    MobileJoystick.mapBtnType[i] = Number(MobileJoystick.mapBtn[i]['调用类型']);
    MobileJoystick.mapBtnEvent[i] = Number(MobileJoystick.mapBtn[i]['公共事件id']);
    MobileJoystick.mapBtnKey[i] = String(MobileJoystick.mapBtn[i]['键盘按键']);
    MobileJoystick.mapBtnScript[i] = String(MobileJoystick.mapBtn[i]['运行脚本']);
    MobileJoystick.mapBtnSound[i] = String(MobileJoystick.mapBtn[i]['按钮声效']);
}
for (var i = 0; i < 10; i++) {
    if (MobileJoystick.Parameters['战场按钮-' + String(i + 1)] != '') {
        MobileJoystick.btlBtn[i] = JSON.parse(MobileJoystick.Parameters['战场按钮-' + String(i + 1)]);
    } else {
        MobileJoystick.btlBtn[i] = {};
    }
    MobileJoystick.btlBtnActive[i] = MobileJoystick.btlBtn[i]['启用按钮'] || false;
    MobileJoystick.btlBtnName[i] = String(MobileJoystick.btlBtn[i]['按钮图片']);
    MobileJoystick.btlBtnX[i] = Number(MobileJoystick.btlBtn[i]['按钮X坐标']);
    MobileJoystick.btlBtnY[i] = Number(MobileJoystick.btlBtn[i]['按钮Y坐标']);
    MobileJoystick.btlBtnMode[i] = MobileJoystick.mapBtn[i]['触发模式'] || false;
    MobileJoystick.btlBtnType[i] = Number(MobileJoystick.btlBtn[i]['调用类型']);
    MobileJoystick.btlBtnEvent[i] = Number(MobileJoystick.btlBtn[i]['公共事件id']);
    MobileJoystick.btlBtnKey[i] = String(MobileJoystick.btlBtn[i]['键盘按键']);
    MobileJoystick.btlBtnScript[i] = String(MobileJoystick.btlBtn[i]['运行脚本']);
    MobileJoystick.btlBtnSound[i] = String(MobileJoystick.btlBtn[i]['按钮声效']);
}
for (var i = 0; i < 5; i++) {
    if (MobileJoystick.Parameters['菜单按钮-' + String(i + 1)] != '') {
        MobileJoystick.menuBtn[i] = JSON.parse(MobileJoystick.Parameters['菜单按钮-' + String(i + 1)]);
    } else {
        MobileJoystick.menuBtn[i] = {};
    }
    MobileJoystick.menuBtnActive[i] = MobileJoystick.menuBtn[i]['启用按钮'] || false;
    MobileJoystick.menuBtnName[i] = String(MobileJoystick.menuBtn[i]['按钮图片']);
    MobileJoystick.menuBtnX[i] = Number(MobileJoystick.menuBtn[i]['按钮X坐标']);
    MobileJoystick.menuBtnY[i] = Number(MobileJoystick.menuBtn[i]['按钮Y坐标']);
    MobileJoystick.menuBtnMode[i] = MobileJoystick.mapBtn[i]['触发模式'] || false;
    MobileJoystick.menuBtnType[i] = Number(MobileJoystick.menuBtn[i]['调用类型']);
    MobileJoystick.menuBtnEvent[i] = Number(MobileJoystick.menuBtn[i]['公共事件id']);
    MobileJoystick.menuBtnKey[i] = String(MobileJoystick.menuBtn[i]['键盘按键']);
    MobileJoystick.menuBtnScript[i] = String(MobileJoystick.menuBtn[i]['运行脚本']);
    MobileJoystick.menuBtnSound[i] = String(MobileJoystick.menuBtn[i]['按钮声效']);
}
MobileJoystick.Input = false;
MobileJoystick.Touch = false;
MobileJoystick.DirTouch = false;
MobileJoystick.Message = false;
MobileJoystick.TouchX = 0;
MobileJoystick.TouchY = 0;

MobileJoystick._onTouchStart = TouchInput._onTouchStart;
TouchInput._onTouchStart = function(event) {
    MobileJoystick.TouchX = Graphics.pageToCanvasX(event.touches[0].pageX);
    MobileJoystick.TouchY = Graphics.pageToCanvasY(event.touches[0].pageY);
    if (event.touches.length > 1) MobileJoystick.Touch = true;
    MobileJoystick._onTouchStart.apply(this, arguments);
};

MobileJoystick._onTouchMove = TouchInput._onTouchMove;
TouchInput._onTouchMove = function(event) {
    MobileJoystick.TouchX = Graphics.pageToCanvasX(event.touches[0].pageX);
    MobileJoystick.TouchY = Graphics.pageToCanvasY(event.touches[0].pageY);
    MobileJoystick._onTouchMove.apply(this, arguments);
};

TouchInput._onTouchEnd = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        MobileJoystick.DirTouch = false;
        MobileJoystick.Touch = false;
        this._screenPressed = false;
        this._onRelease(x, y);
    }
    if (event.touches[0]) {
        MobileJoystick.Touch = true;
        MobileJoystick.DirTouch = true;
        MobileJoystick.TouchX = Graphics.pageToCanvasX(event.touches[0].pageX);
        MobileJoystick.TouchY = Graphics.pageToCanvasY(event.touches[0].pageY);
    }
};

TouchInput._onCancel = function(x, y) {
    if (!Utils.isMobileDevice()) this._events.cancelled = true;
    this._x = x;
    this._y = y;
};

TouchInput.clearPressed = function() {
    Input._currentState['up'] = false;
    Input._currentState['down'] = false;
    Input._currentState['left'] = false;
    Input._currentState['right'] = false;
    MobileJoystick.Input = false;
};

TouchInput.onButton = function() {
    if (SceneManager._scene._dirPad) {
        var rr = SceneManager._scene._dirPad.width / 2
        var xx = this.x - MobileJoystick.DirPadX - rr;
        var yy = this.y - MobileJoystick.DirPadY - rr;
        if (Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= rr)
            return true;
    }
    if (SceneManager._scene instanceof Scene_Map)
        var btns = SceneManager._scene._mapBtn;
    else if (SceneManager._scene instanceof Scene_Battle)
        var btns = SceneManager._scene._btlBtn;
    else if (SceneManager._scene instanceof Scene_MenuBase)
        var btns = SceneManager._scene._menuBtn;
    else btns = null;
    if (!btns) return false;
    var state = false;
    for (var i = 0; i < btns.length; i++) {
        var xx = btns[i] ? this.x - btns[i].x - btns[i].width / 2 : 0;
        var yy = btns[i] ? this.y - btns[i].y - btns[i].height / 2 : 0;
        if (btns[i] && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= btns[i].width / 2) {
            state = true;
            break;
        }
    }
    return state;
};

TouchInput.isButton = function() {
    if (SceneManager._scene instanceof Scene_Map)
        var btns = SceneManager._scene._mapBtn;
    else if (SceneManager._scene instanceof Scene_Battle)
        var btns = SceneManager._scene._btlBtn;
    else if (SceneManager._scene instanceof Scene_MenuBase)
        var btns = SceneManager._scene._menuBtn;
    else btns = null;
    if (!btns) return false;
    var state = false;
    for (var i = 0; i < btns.length; i++) {
        var xx = btns[i] ? MobileJoystick.TouchX - btns[i].x - btns[i].width / 2 : 0;
        var yy = btns[i] ? MobileJoystick.TouchY - btns[i].y - btns[i].height / 2 : 0;
        if (btns[i] && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= btns[i].width / 2) {
            state = true;
            break;
        }
    }
    return state;
};

MobileJoystick.Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
    if (TouchInput.onButton()) return;
    if (Utils.isMobileDevice() && !MobileJoystick.TouchMove) return;
    if (MobileJoystick.PCJoystick && !MobileJoystick.TouchMove) return;
    MobileJoystick.Game_Temp_setDestination.call(this, x, y);
};

Scene_Base.prototype.createDirPad = function() {
    if (MobileJoystick.DirPadimg) {
        this._dirPad = new Sprite(ImageManager.loadSystem(MobileJoystick.DirPadimg));
        this.addChild(this._dirPad);
        this._dirPad.move(MobileJoystick.DirPadX, MobileJoystick.DirPadY);
    }
};

Scene_Base.prototype.createTouchShadow = function() {
    if (MobileJoystick.Shadow) {
        this._touchShadow = new Sprite(ImageManager.loadSystem(MobileJoystick.Shadow));
        this.addChild(this._touchShadow);
        var x = this._dirPad.x + this._dirPad.width / 2 - this._touchShadow.width / 2;
        var y = this._dirPad.y + this._dirPad.height / 2 - this._touchShadow.height / 2;
        this._touchShadow.move(x, y);
    }
};

Scene_Base.prototype.createMapButton = function() {
    this._mapBtn = [];
    for (var i = 0; i < MobileJoystick.mapBtn.length; i++) {
        if (MobileJoystick.mapBtnActive[i]) {
            this._mapBtn[i] = new Sprite(ImageManager.loadSystem(MobileJoystick.mapBtnName[i]));
            this.addChild(this._mapBtn[i]);
            this._mapBtn[i].move(MobileJoystick.mapBtnX[i], MobileJoystick.mapBtnY[i]);
        }
    }
};

Scene_Base.prototype.createBattleButton = function() {
    this._btlBtn = [];
    for (var i = 0; i < MobileJoystick.btlBtn.length; i++) {
        if (MobileJoystick.btlBtnActive[i]) {
            this._btlBtn[i] = new Sprite(ImageManager.loadSystem(MobileJoystick.btlBtnName[i]));
            this.addChild(this._btlBtn[i]);
            this._btlBtn[i].move(MobileJoystick.btlBtnX[i], MobileJoystick.btlBtnY[i]);
        }
    }
};

Scene_Base.prototype.createMenuButton = function() {
    this._menuBtn = [];
    for (var i = 0; i < MobileJoystick.menuBtn.length; i++) {
        if (MobileJoystick.menuBtnActive[i]) {
            this._menuBtn[i] = new Sprite(ImageManager.loadSystem(MobileJoystick.menuBtnName[i]));
            this.addChild(this._menuBtn[i]);
            this._menuBtn[i].move(MobileJoystick.menuBtnX[i], MobileJoystick.menuBtnY[i]);
        }
    }
};

Scene_Base.prototype.updateShadow = function() {
    if (!MobileJoystick.Shadow) return;
    if (Utils.isMobileDevice()) {
        var xx = MobileJoystick.TouchX - this._dirPad.x - this._dirPad.width / 2;
        var yy = MobileJoystick.TouchY - this._dirPad.y - this._dirPad.height / 2;
        var tx = MobileJoystick.TouchX - this._touchShadow.width / 2;
        var ty = MobileJoystick.TouchY - this._touchShadow.height / 2;
    } else {
        var xx = TouchInput.x - this._dirPad.x - this._dirPad.width / 2;
        var yy = TouchInput.y - this._dirPad.y - this._dirPad.height / 2;
        var tx = TouchInput.x - this._touchShadow.width / 2;
        var ty = TouchInput.y - this._touchShadow.height / 2;
    }
    var rr = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
    if (TouchInput.isPressed() && rr <= this._dirPad.width / 2)
        this._touchShadow.move(tx, ty);
    else if (MobileJoystick.Touch || MobileJoystick.DirTouch) {
        var sx = (rr <= this._dirPad.width / 2) ? xx : (xx / rr * this._dirPad.width / 2);
        var sy = (rr <= this._dirPad.height / 2) ? yy : (yy / rr * this._dirPad.height / 2);
        var dx = this._dirPad.x + this._dirPad.width / 2 - this._touchShadow.width / 2;
        var dy = this._dirPad.y + this._dirPad.height / 2 - this._touchShadow.height / 2;
        this._touchShadow.move(dx + sx, dy + sy);
    } else {
        var ox = this._dirPad.x + this._dirPad.width / 2 - this._touchShadow.width / 2;
        var oy = this._dirPad.y + this._dirPad.height / 2 - this._touchShadow.height / 2;
        this._touchShadow.move(ox, oy);
    }
};

Scene_Base.prototype.updateButton = function(index) {
    var scene = SceneManager._scene;
    if (MobileJoystick.Respond) {
        var self = this;
        this.activateButton(index);
        setTimeout(function(){
            if (SceneManager._scene == scene) self.resetButton(index);
            self.respondButton(index);
        }, 50);
    } else this.respondButton(index);
};

Scene_Base.prototype.activateButton = function(index) {
    if (SceneManager._scene instanceof Scene_Map) {
        var btn = this._mapBtn[index];
        btn.x = MobileJoystick.mapBtnX[index] + 3;
        btn.y = MobileJoystick.mapBtnY[index] + 3;
    } else if (SceneManager._scene instanceof Scene_Battle) {
        var btn = this._btlBtn[index];
        btn.x = MobileJoystick.btlBtnX[index] + 3;
        btn.y = MobileJoystick.btlBtnY[index] + 3;
    } else if (SceneManager._scene instanceof Scene_MenuBase) {
        var btn = this._menuBtn[index];
        btn.x = MobileJoystick.menuBtnX[index] + 3;
        btn.y = MobileJoystick.menuBtnY[index] + 3;
    }
    btn.opacity = 150;
};

Scene_Base.prototype.resetButton = function(index) {
    if (SceneManager._scene instanceof Scene_Map) {
        var btn = this._mapBtn[index];
        btn.x = MobileJoystick.mapBtnX[index];
        btn.y = MobileJoystick.mapBtnY[index];
    } else if (SceneManager._scene instanceof Scene_Battle) {
        var btn = this._btlBtn[index];
        btn.x = MobileJoystick.btlBtnX[index];
        btn.y = MobileJoystick.btlBtnY[index];
    } else if (SceneManager._scene instanceof Scene_MenuBase) {
        var btn = this._menuBtn[index];
        btn.x = MobileJoystick.menuBtnX[index];
        btn.y = MobileJoystick.menuBtnY[index];
    }
    btn.opacity = 255;
};

Scene_Base.prototype.respondDirPad = function() {
    if (Utils.isMobileDevice()) {
        var xx = MobileJoystick.TouchX - this._dirPad.x - this._dirPad.width / 2;
        var yy = MobileJoystick.TouchY - this._dirPad.y - this._dirPad.height / 2;
    } else {
        var xx = TouchInput.x - this._dirPad.x - this._dirPad.width / 2;
        var yy = TouchInput.y - this._dirPad.y - this._dirPad.height / 2;
    }
    if (TouchInput.isPressed() && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= this._dirPad.width / 2) {
        if (!Utils.isMobileDevice()) MobileJoystick.Input = true;
        if (!TouchInput.isButton()) this.actionDirPad(xx, yy);
    } else if (!TouchInput.isButton() && (MobileJoystick.Touch || MobileJoystick.DirTouch))
        this.actionDirPad(xx, yy);
    else TouchInput.clearPressed();
};

Scene_Base.prototype.actionDirPad = function(x, y) {
    if (Utils.isMobileDevice()) MobileJoystick.DirTouch = true;
    if (x > 0 && Math.abs(x) >= Math.abs(y)) {
        Input._currentState['up'] = false;
        Input._currentState['down'] = false;
        Input._currentState['left'] = false;
        Input._currentState['right'] = true;
    } else if (x < 0 && Math.abs(x) >= Math.abs(y)) {
        Input._currentState['up'] = false;
        Input._currentState['down'] = false;
        Input._currentState['left'] = true;
        Input._currentState['right'] = false;
    } else if (y > 0 && Math.abs(x) < Math.abs(y)) {
        Input._currentState['up'] = false;
        Input._currentState['down'] = true;
        Input._currentState['left'] = false;
        Input._currentState['right'] = false;
    } else if (y < 0 && Math.abs(x) < Math.abs(y)) {
        Input._currentState['up'] = true;
        Input._currentState['down'] = false;
        Input._currentState['left'] = false;
        Input._currentState['right'] = false;
    }
};

Scene_Base.prototype.respondButton = function(index) {
    if (SceneManager._scene instanceof Scene_Map) {
        if (MobileJoystick.mapBtnSound[index])
            AudioManager.playSe({"name":MobileJoystick.mapBtnSound[index],"volume":90,"pitch":100,"pan":0});
        if (MobileJoystick.mapBtnType[index] == 0) $gameTemp.reserveCommonEvent(MobileJoystick.mapBtnEvent[index]);
        else if (MobileJoystick.mapBtnType[index] == 1) {
            Input._currentState[MobileJoystick.mapBtnKey[index]] = true;
            setTimeout(function(){Input._currentState[MobileJoystick.mapBtnKey[index]] = false;}, 100);
        } else eval(MobileJoystick.mapBtnScript[index]);
    } else if (SceneManager._scene instanceof Scene_Battle) {
        if (MobileJoystick.btlBtnSound[index])
            AudioManager.playSe({"name":MobileJoystick.btlBtnSound[index],"volume":90,"pitch":100,"pan":0});
        if (MobileJoystick.btlBtnType[index] == 0) $gameTemp.reserveCommonEvent(MobileJoystick.btlBtnEvent[index]);
        else if (MobileJoystick.btlBtnType[index] == 1) {
            Input._currentState[MobileJoystick.btlBtnKey[index]] = true;
            setTimeout(function(){Input._currentState[MobileJoystick.btlBtnKey[index]] = false;}, 100);
        } else eval(MobileJoystick.btlBtnScript[index]);
    } else if (SceneManager._scene instanceof Scene_MenuBase) {
        if (MobileJoystick.menuBtnSound[index])
            AudioManager.playSe({"name":MobileJoystick.menuBtnSound[index],"volume":90,"pitch":100,"pan":0});
        if (MobileJoystick.menuBtnType[index] == 0) $gameTemp.reserveCommonEvent(MobileJoystick.menuBtnEvent[index]);
        else if (MobileJoystick.menuBtnType[index] == 1) {
            Input._currentState[MobileJoystick.menuBtnKey[index]] = true;
            setTimeout(function(){Input._currentState[MobileJoystick.menuBtnKey[index]] = false;}, 100);
        } else eval(MobileJoystick.menuBtnScript[index]);
    }
};

MobileJoystick.Scene_Map_create = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    MobileJoystick.Scene_Map_create.call(this);
    this.createMapButton();
    if (Utils.isMobileDevice() || MobileJoystick.PCJoystick) {
        this.createDirPad();
        this.createTouchShadow();
    }
};

MobileJoystick.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    MobileJoystick.Scene_Map_update.call(this);
    if (!MobileJoystick.Message && (TouchInput.isPressed() || MobileJoystick.Touch || MobileJoystick.DirTouch)) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        for (var i = 0; i < 10; i++) {
            var xx = MobileJoystick.mapBtnActive[i] ? x - MobileJoystick.mapBtnX[i] - this._mapBtn[i].width / 2 : 0;
            var yy = MobileJoystick.mapBtnActive[i] ? y - MobileJoystick.mapBtnY[i] - this._mapBtn[i].height / 2 : 0;
            if (MobileJoystick.mapBtnActive[i] && (MobileJoystick.mapBtnMode[i] || TouchInput.isTriggered())
                && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= this._mapBtn[i].width / 2)
                this.updateButton(i);
        }
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
        if (Utils.isMobileDevice() || MobileJoystick.PCJoystick) this.respondDirPad();
    } else {
        if (MobileJoystick.Input) TouchInput.clearPressed();
        if (Utils.isMobileDevice() && !MobileJoystick.Touch) TouchInput.clearPressed();
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
    }
};

MobileJoystick.Scene_Battle_create = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    MobileJoystick.Scene_Battle_create.call(this);
    this.createBattleButton();
    if ((Utils.isMobileDevice() || MobileJoystick.PCJoystick) && MobileJoystick.btlJoystick) {
        this.createDirPad();
        this.createTouchShadow();
    }
};

MobileJoystick.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    MobileJoystick.Scene_Battle_update.call(this);
    if (!MobileJoystick.Message && (TouchInput.isPressed() || MobileJoystick.Touch || MobileJoystick.DirTouch)) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        for (var i = 0; i < 10; i++) {
            var xx = MobileJoystick.btlBtnActive[i] ? x - MobileJoystick.btlBtnX[i] - this._btlBtn[i].width / 2 : 0;
            var yy = MobileJoystick.btlBtnActive[i] ? y - MobileJoystick.btlBtnY[i] - this._btlBtn[i].height / 2 : 0;
            if (MobileJoystick.btlBtnActive[i] && (MobileJoystick.btlBtnMode[i] || TouchInput.isTriggered())
                && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= this._btlBtn[i].width / 2)
                this.updateButton(i);
        }
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
        if (MobileJoystick.btlJoystick && (Utils.isMobileDevice() || MobileJoystick.PCJoystick)) this.respondDirPad();
    } else {
        if (MobileJoystick.Input) TouchInput.clearPressed();
        if (Utils.isMobileDevice() && !MobileJoystick.Touch) TouchInput.clearPressed();
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
    }
};

MobileJoystick.Scene_MenuBase_create = Scene_MenuBase.prototype.create;
Scene_MenuBase.prototype.create = function() {
    MobileJoystick.Scene_MenuBase_create.call(this);
    this.createMenuButton();
    if ((Utils.isMobileDevice() || MobileJoystick.PCJoystick) && MobileJoystick.menuJoystick) {
        this.createDirPad();
        this.createTouchShadow();
    }
};

MobileJoystick.Scene_MenuBase_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
    MobileJoystick.Scene_MenuBase_update.call(this);
    if (TouchInput.isPressed() || MobileJoystick.Touch || MobileJoystick.DirTouch) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        for (var i = 0; i < 10; i++) {
            var xx = MobileJoystick.menuBtnActive[i] ? x - MobileJoystick.menuBtnX[i] - this._menuBtn[i].width / 2 : 0;
            var yy = MobileJoystick.menuBtnActive[i] ? y - MobileJoystick.menuBtnY[i] - this._menuBtn[i].height / 2 : 0;
            if (MobileJoystick.menuBtnActive[i] && (MobileJoystick.menuBtnMode[i] || TouchInput.isTriggered())
                && Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2)) <= this._menuBtn[i].width / 2)
                this.updateButton(i);
        }
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
        if (MobileJoystick.menuJoystick && (Utils.isMobileDevice() || MobileJoystick.PCJoystick)) this.respondDirPad();
    } else {
        if (MobileJoystick.Input) TouchInput.clearPressed();
        if (Utils.isMobileDevice() && !MobileJoystick.Touch) TouchInput.clearPressed();
        if (MobileJoystick.Shadow && this._touchShadow) this.updateShadow();
    }
};

MobileJoystick.Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
Window_Selectable.prototype.processTouch = function () {
    if (MobileJoystick.Scenes.contains(SceneManager._scene.constructor.name))
        return;
    MobileJoystick.Window_Selectable_processTouch.call(this);
};

MobileJoystick.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    MobileJoystick.Message = true;
    MobileJoystick.Window_Message_terminateMessage.call(this);
    setTimeout("MobileJoystick.Message = false;", 200);
};