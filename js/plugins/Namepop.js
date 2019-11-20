/*:

* @plugindesc Namepop Ver 1.03

* @author Morpho(dongdongDJH)--这是原作者

* @由salvareless扩充为可以设置文字显示的颜色

* @help 

* 在地图事件注释栏内填入<pop:显示名称（不可缺省）,颜色（以#000000表示，不可缺省）,字体大小（正数，可以缺省）,高度修正（任意数字，可以缺省）>;

* 高度修正值单位为1.1格，字体大小默认为12;

* 例：<pop:测试NPC,#ff0000,14,1.1>

* 例：<pop:测试二,#ff0000,,>



*/



(function() {

        _Sprite_Character_prototype_initialize = Sprite_Character.prototype.initialize;

        Sprite_Character.prototype.initialize = function(character) {

                _Sprite_Character_prototype_initialize.call(this, character);

                this._tempCharacter = character;

                if (character instanceof Game_Event) {

         var datas = character.event().note.match(/\<pop:.*,#[0-9a-f]{6},[.0-9]*,[-.0-9]*\>/i);

                        if (datas != null) {

                    datas = datas[0].slice(5,datas[0].length-1).split(',');

                                        var nameh = datas[2] || 18;

                                        var namey = datas[3] || 1.1;

                                this.createNamepopSet(decodeURI(datas[0]),datas[1],nameh,namey);

                        }

                }

        };

        Sprite_Character.prototype.createNamepopSet = function(name,color,h,f) {

                this._namepopSprite = new Sprite();

                this._namepopSprite.bitmap = new Bitmap(h * 10, h);

                this._namepopSprite.bitmap.fontSize = h;

                this._namepopSprite.bitmap.textColor = color ;

                this._namepopSprite.bitmap.drawText(name, 0, 0, h * 10, h, 'center');

                this._namepopSprite.anchor.x = 0.5;

                this._namepopSprite.anchor.y = 1;

                this._namepopSprite.y = this.y - f * 48;

                this.addChild(this._namepopSprite);

        };

}()

);
