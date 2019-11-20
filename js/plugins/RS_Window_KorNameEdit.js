/*:
 * RS_Window_KorNameEdit.js
 * @plugindesc 这是一个输入法插件，支持中文，游戏封装手机版后可以调用手机输入法
 * @author biud436
 * @since 2015.10.19
 * @version 1.4 (2015.03.22)
 *
 * @param windowWidth
 * @desc 窗口宽度
 * @default 580
 *
 * @param windowCenter
 * @desc Y 窗口居中
 * @default false
 *
 * @param editWindow_Opacity
 * @desc 编辑窗口透明度 (0 ~ 255)
 * @default 225
 *
 * @param askingText
 * @desc 窗口询问文本
 * @default Please enter the name
 *
 * @param outlineWidth
 * @desc 描述宽度
 * @default 1
 *
 * @param outlineColor
 * @desc 描述颜色
 * @default black
 *
 * @param fontColor
 * @desc 字体颜色
 * @default white
 *
 * @param standardFontSize
 * @desc 标准字体大小 (=28)
 * @default 28
 *
 * @help
 *
 *  이 플러그인은 아래와 같은 플러그인 커맨드를 제공합니다.
 *
 * 한국어 명령어 (Korean)
 * KNE 폭 숫자
 * KNE 중앙정렬 true/false
 * KNE 테두리크기 숫자
 * KNE 테두리색상 문자열
 * KNE 폰트색상 문자열
 * KNE 폰트크기 숫자
 * KNE 투명도 숫자
 * KNE 텍스트 문자열
 *
 * This plugin provides following the pluginCommand below.
 *
 * KNE width number
 * KNE center true/false
 * KNE outlineWidth number
 * KNE outlineColor string
 * KNE fontColor string
 * KNE fontSize number
 * KNE opacity number
 * KNE askText string
 *
 * - Change Log
 * 2016.03.05 (v1.3.3) - Fixed the class structure.
 * 2016.03.22 (v1.4.0) - Fixed a bug that causes a serious problem.
 */

 var Imported = Imported || {};
 Imported.Window_KorNameEdit = true;

(function() {

  // private static class
  function RSMatch() {
      throw new Error('This is a static class');
  }

  // private class
  function TextBox() {
    this.initialize.apply(this, arguments);
  };

  //===========================================================================
  // Private Members
  //===========================================================================

  var parameters = PluginManager.parameters('RS_Window_KorNameEdit');

  RSMatch.windowWidth = Number(parameters['windowWidth'] || 580);
  RSMatch.windowCenter = String(parameters['windowCenter'] || 'false');
  RSMatch.outlineWidth = Number(parameters['outlineWidth'] || 1);
  RSMatch.outlineColor = String(parameters['outlineColor'] || 'black');
  RSMatch.fontColor = String(parameters['fontColor'] || 'white');
  RSMatch.opacity = Number(parameters['editWindow_Opacity'] || 225);
  RSMatch.askText = String(parameters['askingText'] || '이름을 기입해주세요');
  RSMatch.standardFontSize = Number(parameters['standardFontSize'] || 28);

  //===========================================================================
  // TextBox Class
  //===========================================================================

  TextBox.prototype.initialize = function(_editWindow)  {
    this._editWindow = _editWindow;
    this.createTextBox();
    this.getFocus();
  };

  TextBox.prototype.createTextBox = function() {
    this._textBox = document.createElement('input');
    this._textBox.type = "text"
    this._textBox.id = "textBox"
    this._textBox.style.opacity = 0;
    this._textBox.style.zIndex = 3;
    Graphics._centerElement(this._textBox);
    this._textBox.onkeydown = this.onKeyDown.bind(this);
    document.body.appendChild(this._textBox);
  };

  TextBox.prototype.setEvent = function(func) {
    this._textBox.onchange = func;
  };

  TextBox.prototype.terminateTextBox = function() {
    document.body.removeChild(this._textBox);
  };

  TextBox.prototype.onKeyDown = function(e) {

    this.getFocus();

    switch(e.keyCode) {
    case 8:
      // if (this.getTextLength() > 0) {
        this.backSpace();
      // }
      break;
    case 13:
      if(this.getTextLength() <= 0) {
        e.preventDefault();
      }
      break;
    case 229:
      break;
    }
  }

  TextBox.prototype.getTextLength = function() {
    return this._textBox.value.length;
  };

  TextBox.prototype.getMaxLength = function() {
    return this._editWindow._maxLength;
  };

  TextBox.prototype.backSpace = function() {
      // if (this.getTextLength() > 0) {
        this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
        this._editWindow._index = this._textBox.value.length - 1;
        this._textBox.value = this._editWindow._name;
        this._editWindow.refresh();
      // }
  };

  TextBox.prototype.refreshNameEdit = function()  {
    this._editWindow._name = this._textBox.value.toString();
    this._editWindow._index = this._textBox.value.length || 0;
    this._editWindow.refresh();
  };

  TextBox.prototype.update = function() {
    if(this.getTextLength() <= this._editWindow._maxLength) {
      this.refreshNameEdit();
    }
  };

  TextBox.prototype.getFocus = function() {
    this._textBox.focus();
  };

  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
  };

  //===========================================================================
  // Window_NameEdit Class
  //===========================================================================

  Window_NameEdit.prototype.charWidth = function () {
    var text = '\uAC00';
    return this.textWidth(text)
  };

  Window_NameEdit.prototype.drawActorFace = function(actor, x, y, width, height) {
      this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
      this.changeTextColor(this.hpColor(actor));
      this.drawText(RSMatch.askText, this.left(), y + this.fittingHeight(1) / 2, this.width);
  };

  Window_NameEdit.prototype.itemRect = function(index) {
      return {
          x: this.left() + index * this.charWidth(),
          y: this.fittingHeight(1),
          width: this.charWidth(),
          height: this.lineHeight()
      };
  };

  Window_NameEdit.prototype.windowWidth = function () {
    return RSMatch.windowWidth;
  };

  Window_NameEdit.prototype.drawChar = function (index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.contents.outlineWidth = RSMatch.outlineWidth;
    this.contents.outlineColor = RSMatch.outlineColor;
    this.contents.fontColor = RSMatch.fontColor;
    this.drawText(this._name[index] || '', rect.x, rect.y)
  };

  Window_NameEdit.prototype.standardFontSize = function() {
      return RSMatch.standardFontSize;
  };

  //===========================================================================
  // Scene_Name Class
  //===========================================================================

  Scene_Name.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createTextBox();
    this._textBox.setEvent( this.onInputOk.bind(this) );
  };

  Scene_Name.prototype.createTextBox =  function() {
    this._textBox = new TextBox(this._editWindow);
    if(RSMatch.windowCenter === "true") {
      this._editWindow.y = Graphics.boxHeight / 2 - this._editWindow.height / 2;
    }
    this._editWindow.opacity = RSMatch.opacity;
  }

  Scene_Name.prototype.update = function() {
    this._textBox.getFocus();
    this._textBox.update();
    Scene_MenuBase.prototype.update.call(this);
  }

  Scene_Name.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    this._textBox.terminate();
  }

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "KNE") {
        switch(args[0]) {
          case 'width':
          case '폭':
            RSMatch.windowWidth = Number(args[1] || 580);
            break;
          case 'center':
          case '중앙정렬':
            RSMatch.windowCenter = String(args[1] || 'false');
            break;
          case 'outlineWidth':
          case '테두리크기':
            RSMatch.windowWidth = Number(args[1] || 1);
            break;
          case 'outlineColor':
          case '테두리색상':
            RSMatch.outlineColor = String(args[1] || 'black');
            break;
          case 'fontColor':
          case '폰트색상':
            RSMatch.fontColor = String(args[1] || 'white');
            break;
          case 'fontSize':
          case '폰트크기':
            RSMatch.standardFontSize = Number(args[1] || 28);
            break;
          case 'opacity':
          case '투명도':
            var _opacity = Number(args[1] || 1);
            RSMatch.opacity = _opacity.clamp(0, 255);
            break;
          case 'askText':
          case '텍스트':
            RSMatch.askText = String(args.slice(1).join(""));
            break;
        }
      }
  };

})();
