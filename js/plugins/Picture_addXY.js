//=============================================================================
// 2w_message.js
//=============================================================================

/*:
 * @plugindesc 图片随角色移动
 * @author 汪汪
 * 
 * @help 
 * $gameScreen.setCharacterById(图片id,事件id)
 * 事件id  当为0时为游戏者,当为负时为随从
 *   
 * $gameScreen.setCharacter(图片id,c)
 * c 一个事件或者游戏者,为空时取消绑定
 * */


Sprite_Picture.prototype.updatePosition = function() {
    var picture = this.picture();
    if (picture._character) {
        this.x = Math.floor(picture._character.screenX() + picture.x());
        this.y = Math.floor(picture._character.screenY() + picture.y());
    } else {
        this.x = Math.floor(picture.x());
        this.y = Math.floor(picture.y());
    }
};




Game_Picture.prototype.setCharacter = function(c) {
    this._character = c
};


Game_Screen.prototype.setCharacter = function(pictureId, c) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture.setCharacter(c);
    }
};

Game_Screen.prototype.setCharacterById = function(pictureId, id) {
    if (id > 0) {
        var id = id
        var c = $gameMap.event(id)
    } else {
        var id = -id
        if (id) {
            var c = $gamePlayer.followers().follower(id)
        } else {
            var c = $gamePlayer
        }
    }
    this.setCharacter(pictureId, c)
};