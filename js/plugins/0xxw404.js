//=============================================================================
// ww_JumpPT.js
//=============================================================================
/*:
 * @plugindesc 
 * ww_JumpPT,跳跃平台, 
 * @author wangwang
 *
 * @param  ww_JumpPT 
 * @desc 插件 跳跃平台 ,作者:汪汪
 * @default  汪汪
 *  
 * @param  base 
 * @desc  地基的判断,其他和平台一样,但按下时不会掠过,('_')建议最底下铺满..
 * @default  [20]
 * 
 * @param  pt 
 * @desc  平台的判断 区域id 当下落时会优先落在平台上  ,当按着下时,会掠过平台,
 * @default  [19]
 * 
 * @param  sz 
 * @desc  绳子的判断, 遇到绳子时,会停在绳子上(当然也可以修改下...)
 * @default  [16]
 * 
 * @param  qb 
 * @desc  墙壁的判断,将要碰到墙壁时,x方向会停止移动,但y方向依然会运动(上升下落),和其他不同,墙壁是一个预判断,
 * @default  [18]
 * 
 * @param  qb2
 * @desc  向下墙壁的判断,只用于行走
 * @default  [18]
 * 
 * @param  qb4
 * @desc  向左墙壁的判断,只用于行走,
 * @default  [18]
 * 
 * @param  qb6
 * @desc  向右墙壁的判断,只用于行走,如果它在右面,无法往右走,但不影响跳跃
 * @default  [18]
 * 
 * @param  qb8
 * @desc  向上墙壁的判断,只用于行走,如果它在上面,无法往上走,但不影响跳跃
 * @default  [30]
 * 
 * @param  kong 
 * @desc  空的判断, 在区域内 行走时,如果碰到只有空的时候会掉下去,
 * @default  [17]
 *   
 * @param  psid 
 * @desc  角色落地时会把该id开关打开,这样可以触发公共事件了,('_')
 * @default  10
 * 
 * @param  typeswitch 
 * @desc  角色落地时到特定区域会把该id开关打开,这样可以触发公共事件了,('_')
 * @default  {"base":0,"sz":0,"pt":0,"kong":0,"":0}
 * 
 * @param  qyswitch 
 * @desc  角色落地时到特定区域的区域id会把该id开关打开,这样可以触发公共事件了,('_')
 * @default  {"19":0,"20":0,"18":0 }
 * 
 * 
 * @help 
 * 
 * $gamePlayer.jumpV(x,y,t,list) 
 * x 坐标位移,
 * y 跳跃的坐标高度,(为负时自动修正为0)
 * t 时间
 * list 数组,可以不设置,由[x,y,x,y]这样的组成,xy为坐标,设置时,经过该坐标时会掠过所有判断(对墙壁无效)
 * 
 * $gamePlayer.jumpNum()
 * 当前角色的跳跃次数  
 * 
 * $gamePlayer.isJumpingV()
 * 返回现在是否跳跃,如果在 返回结果为 g (重力加速度,负值)
 * 
 * $gamePlayer.isJumpingE()
 * 返回现在是否在一个跳跃平台事件上,如果在 返回结果为 这个事件
 * 
 * $gamePlayer.getOnJump()
 * 把队伍聚集并绑定角色
 * $gamePlayer.getOffJump()
 * 把队伍聚集并解除绑定角色
 * 
 * 平台区域 
 * 事件注释为 
 * <qyid:19> 
 * qyid为上面使用过的区域编号,  
 * 
 * $gamePlayer.setJumpEOn()
 * 强行把角色放到平台上,角色的移动范围由平台决定(平台包括区域和事件),不由地图决定
 * $gamePlayer.setJumpEOut()
 * 强行把角色移出平台,角色移动范围由默认地图决定//相当于$gamePlayer.setJumpE(null)
 * 
 *    
 * 落在平台区域上的人物会根据平台区域(不能移动到墙,可以移动到空,到空时下落)来移动,
 * 使用 $gamePlayer.setJumpE(null)可解除这种绑定
 * 
 * 与这些区域绑定时有如下效果
 * 如果行走方向有另一个(base,pt,sz,kong 之中)的移动区域,则可以行走,
 * 行走方向 kong 时,跳跃默认为掠过该位置,往下一平台. 
 * 
 * 角色在跳跃时会触发
 * 经过的  
 * 启动方式为 决定键,玩家接触,事件接触 的
 * 事件,
 * 但不保证完美运行...建议只使用比较简单的事件.
 * 
 * 
 */






ww_JumpPt = function() {
    var find = function(name) {
        var name = name || ""
        var pm = name.toLowerCase()
        var parameters = PluginManager._parameters[pm];
        if (parameters) {} else {
            var pls = PluginManager._parameters
            for (var n in pls) {
                if (pls[n] && (name in pls[n])) {
                    parameters = pls[n]
                }
            }
        }
        return parameters || {}
    }

    var get = function(p, n, unde) {
        try {
            var i = p[n]
        } catch (e) {
            var i = unde
        }
        return i === undefined ? unde : i
    }

    var getValue = function(p, n, unde, type) {
        var i = get(p, n, unde)
        try {
            if (type) {
                return i
            }
            return JSON.parse(i)
        } catch (e) {
            return i
        }
    }
    var p = find("ww_JumpPT")
    var j = {}
    j["base"] = getValue(p, "base") || []
    j["pt"] = getValue(p, "pt") || []
    j["sz"] = getValue(p, "sz") || []
    j["qb"] = getValue(p, "qb") || []
    j["qb2"] = getValue(p, "qb2") || []
    j["qb4"] = getValue(p, "qb4") || []
    j["qb6"] = getValue(p, "qb6") || []
    j["qb8"] = getValue(p, "qb8") || []
    j["kong"] = getValue(p, "kong") || []
    ww_JumpPt.typeswitch = getValue(p, "typeswitch") || {}
    ww_JumpPt.qyswitch = getValue(p, "qyswitch") || {}

    ww_JumpPt.ptTypes = j
    ww_JumpPt.playJumpEndSId = getValue(p, "psid") || 0
}
ww_JumpPt()





/**获取跳跃次数 */
Game_CharacterBase.prototype.jumpNum = function() {
    return this._jumpNum || 0
}



Game_CharacterBase.prototype.setPtType = function(id) {
    if (id) {
        var id = id * 1
        for (var type in ww_JumpPt.ptTypes) {
            var l = ww_JumpPt.ptTypes[type]
            if (l && l.indexOf(id) >= 0) {
                if (this._ptType) {
                    $gameMap.removeJumpEvents(this._ptType, this)
                }
                this._ptType = $gameMap.addJumpEvents(type, this)
                this._qyid = id
                return
            }
        }
    }
}




/**跳跃下开关 */
Game_CharacterBase.prototype.jumpDownSwitch = function(i) {
    this._jumpDown = !!i
}


/**跳跃上开关 */
Game_CharacterBase.prototype.jumpUpSwitch = function(i) {
    this._jumpUp = !!i
}


ww_JumpPt._Game_CharacterBase_prototype_isJumping = Game_CharacterBase.prototype.isJumping
Game_CharacterBase.prototype.isJumping = function() {
    return ww_JumpPt._Game_CharacterBase_prototype_isJumping.call(this) || this.isJumpingV() //|| this.isJumpingE();
};


/**是v跳跃中 */
Game_CharacterBase.prototype.isJumpingV = function() {
    return this._g
}

/**是移动事件中 */
Game_CharacterBase.prototype.isJumpingE = function() {
    return this._jumpMoveEvent;
};



Game_CharacterBase.prototype.isJumpOn = function(x, y, types) {
    var id = $gameMap.regionId(x, y)
    var ptTypes = ww_JumpPt.ptTypes
    for (var i = 0; i < types.length; i++) {
        var type = types[i]
        if (ptTypes && ptTypes[type] && ptTypes[type].indexOf(id) >= 0) {
            return { ptType: type, qyid: id }
        }
    }
    return false
}


Game_CharacterBase.prototype.isJumpOnBase = function(x, y) {
    return this.isJumpOn(x, y, ["base"])
}

Game_CharacterBase.prototype.isJumpOnPt = function(x, y) {
    return this.isJumpOn(x, y, ["pt"])
}

Game_CharacterBase.prototype.isJumpOnSz = function(x, y) {
    return this.isJumpOn(x, y, ["sz"])
}

Game_CharacterBase.prototype.isJumpOnQb = function(x, y) {
    return this.isJumpOn(x, y, ["qb"]) || !$gameMap.isValid(x, y)
}


Game_CharacterBase.prototype.isJumpOnKong = function(x, y) {
    return this.isJumpOn(x, y, ["kong"])
}

ww_JumpPt._Game_Map_prototype_setupEvents = Game_Map.prototype.setupEvents
Game_Map.prototype.setupEvents = function() {
    ww_JumpPt._Game_Map_prototype_setupEvents.call(this)
    var es = this.events()

    this._jumpEvents = {}
    for (var i in ww_JumpPt.ptTypes) {
        this._jumpEvents[i] = []
    }
    for (var i = 0; i < es.length; i++) {
        var e = es[i]
        if (e && e.event()) {
            var qyid = e.event().meta.qyid
            e.setPtType(qyid)
        }
    }
};


Game_Map.prototype.addJumpEvents = function(type, event) {
    if (type && this._jumpEvents) {
        var l = this._jumpEvents[type]
        if (l) {
            var i = l.indexOf(event)
            if (i < 0) {
                l.push(event)
            }
            return type
        }
    }
    return false
}

Game_Map.prototype.removeJumpEvents = function(type, event) {
    if (type && this._jumpEvents) {
        var l = this._jumpEvents[type]
        if (l) {
            var i = l.indexOf(event)
            if (i >= 0) {
                l.splice(i, 1)
            }
        }
    }
}


Game_Map.prototype.jumpEvents = function(types) {
    if (this._jumpEvents) {
        var es = []
        for (var i = 0; i < types.length; i++) {
            var name = types[i]
            es = es.concat(this._jumpEvents[name] || [])
        }
        return es
    } else {
        return this.events()
    }
}

Game_CharacterBase.prototype.isJumpOnEvent = function(x, y, type) {
    // if (this.canStartLocalEvents()) {
    var es = $gameMap.jumpEvents(type)
    for (var i = 0; i < es.length; i++) {
        var e = es[i]
        if (e && e.pos(x, y)) {
            return e
        }
    }
    // }
    return false
}


Game_CharacterBase.prototype.initJumpTouchEnd = function() {
    this._JumpTouchEnd = {}
}

Game_CharacterBase.prototype.setJumpTouchEnd = function(x, y, z) {
    if (this._JumpTouchEnd) {
        this._JumpTouchEnd[x + "," + y] = z
    }
}
Game_CharacterBase.prototype.getJumpTouchEnd = function(x, y) {
    if (this._JumpTouchEnd) {
        return this._JumpTouchEnd[x + "," + y]
    }
}


Game_CharacterBase.prototype.jumpV = function(x, y, g, list) {
    if (g) {
        this.setJumpE(null)
        this._jumpNum = this.jumpNum() + 1
    }
    this.initJumpTouchEnd()
    if (list) {
        for (var i = 0; i < list.length; i += 2) {
            this.setJumpTouchEnd(list[i], list[i + 1], 3)
        }
    }
    if (x !== 0) {
        this.setDirection(x < 0 ? 4 : 6);
    }
    var y = Math.round(y || 0)
    y = y > 0 ? y : 0
    if (g == 0) {
        this._jumpVx = 0
        this._jumpVy = 0
        this._g = 0
        this._jumpCount = this._jumpCountAll = 0
        this._jumpNum = 0
    } else if (g < 0) {
        this._g = g
        this._jumpVx = x || 0
        this._jumpVy = -y * g
        this._jumpCount = this._jumpCountAll = y + y
    } else if (g > 0) {
        var t = g
        this._jumpCount = this._jumpCountAll = t + t
        this._jumpVx = (x || 0) / this._jumpCountAll
        this._jumpVy = 2 * (y || 0) / t
        this._g = ((-this._jumpVy) || (-2 / t)) / t
    }
    this.resetStopCount();
    this.straighten();
};


ww_JumpPt._Game_CharacterBase_prototype_updateJump = Game_CharacterBase.prototype.updateJump
Game_CharacterBase.prototype.updateJump = function() {
    if (this.isJumpingV()) {
        this.updateJumpV();
    } else {
        ww_JumpPt._Game_CharacterBase_prototype_updateJump.call(this)
    }
};



Game_CharacterBase.prototype.updateJumpV = function() {
    this._jumpCount--;
    var moveX = this.jumpMoveX(this._jumpCount)
    var moveY = this.jumpMoveY(this._jumpCount)

    var rx0 = this._realX
    var ry0 = this._realY

    var rx1 = this._realX = rx0 + moveX
    var ry1 = this._realY = ry0 + moveY

    var x0 = Math.round(rx0)
    var x1 = Math.round(rx1)
    var xc = moveX > 0 ? x1 != x0 || (rx0 <= x0 && rx1 >= x1) : x1 != x0 || (rx0 >= x0 && rx1 <= x1)

    var moveY2 = this.jumpMoveY(this._jumpCount - 1)
    var ry2 = ry1 + moveY2
    var y0 = Math.floor(ry0)
    var y1 = Math.floor(ry1)
    var y2 = Math.floor(ry2)

    var yc = y0 != y1
    var ye = y1 == y2

    //右跳
    var y0z = $gameMap.roundY(y0)
    if (moveX > 0) {
        if (xc || yc) {
            for (var xi = x0; xi <= x1; xi++) {
                var xiz = $gameMap.roundX(xi)
                if (this.touchJumpOnQb(xiz + 1, y0z)) {
                    this.jumpXEnd(xiz)
                    x1 = xi
                    break
                }
            }
        }
        //左跳
    } else if (moveX < 0) {
        if (xc || yc) {
            for (var xi = x0; xi >= x1; xi--) {
                var xiz = $gameMap.roundX(xi)
                if (this.touchJumpOnQb(xiz - 1, y0z)) {
                    this.jumpXEnd(xiz)
                    x1 = xi
                    break
                }
            }
        }
    }
    /**上跳 */
    if (moveY < 0) {
        if (xc || yc) {
            for (var yi = y0; yi > y1 || ye && yi == y1; yi--) {
                var yiz = $gameMap.roundY(yi)
                if (moveX > 0) {
                    for (var xi = x0; xi <= x1; xi++) {
                        var xiz = $gameMap.roundX(xi)
                        if (this.touchJump(xiz, yiz, 1)) { return }
                    }
                } else {
                    for (var xi = x0; xi >= x1; xi--) {
                        var xiz = $gameMap.roundX(xi)
                        if (this.touchJump(xiz, yiz, 1)) { return }
                    }
                }
            }
        }
    } else {
        if (xc || yc) {
            for (var yi = y0; yi < y1 || ye && yi == y1; yi++) {
                var yiz = $gameMap.roundY(yi)
                if (moveX > 0) {
                    for (var xi = x0; xi <= x1; xi++) {
                        var xiz = $gameMap.roundX(xi)
                        if (this.touchJump(xi, yi, 2)) { return }
                    }
                } else {
                    for (var xi = x0; xi >= x1; xi--) {
                        var xiz = $gameMap.roundX(xi)
                        if (this.touchJump(xiz, yiz, 2)) { return }
                    }
                }
            }
        }
    }
    if (Math.abs(moveX) > 10 || Math.abs(moveX) > 10) {
        this.jumpEnd(x0, y0)
    }
};


Game_CharacterBase.prototype.touchJump = function(x, y, type) {
    var have = this.getJumpTouchEnd(x, y)
    if (have == type || have == 3) {
        return false
    }
    this.touchEvent(x, y)
    if (this.touchJumpOnSz(x, y)) {
        return true
    }
    if (type == 2) {
        if (this.touchJumpOnBase(x, y) || this._jumpDown || this.touchJumpOnPt(x, y)) {
            return true
        }
    } else {
        if (this.touchJumpOnQb(x, y)) {
            this._jumpVy = 0
            return true
        }
    }
    this.setJumpTouchEnd(x, y, type)
    return false
}


Game_CharacterBase.prototype.touchJumpOnQb = function(x, y) {
    var e = this.isJumpOnQb(x, y)
    if (e) {
        return true
    }
    var e = this.isJumpOn(x, y, ["qb"])
    if (e) {
        return true
    }
    return false
}




Game_CharacterBase.prototype.touchJumpOnBase = function(x, y) {
    var e = this.isJumpOnEvent(x, y, ["base"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpE(e)
        return true
    }
    var e = this.isJumpOn(x, y, ["base"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpT(x, y, e)
        return true
    }
    return false
}


Game_CharacterBase.prototype.touchJumpOnPt = function(x, y) {

    var e = this.isJumpOnEvent(x, y + 1, ["pt"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpE(e, 0, 1)
        return true
    }
    var e = this.isJumpOn(x, y, ["pt"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpT(x, y, e)
        return true
    }
    return false
}


/**绳子 */
Game_CharacterBase.prototype.touchJumpOnSz = function(x, y) {
    if (this._jumpUp) { 
    //if (!this._jumpUp && x == this._x) { return false }
    //绳子判断
    var e = this.isJumpOnEvent(x, y, ["sz"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpE(e)
        return true
    }
    var e = this.isJumpOn(x, y, ["sz"])
    if (e) {
        this.jumpEnd(x, y)
        this.setJumpT(x, y, e)
        return true
    }
    return false
        }
}



Game_CharacterBase.prototype.setJumpT = function(x, y, e, xi, yi) {
    this.setJumpE(this.tileJumpE(x, y, e), xi, yi)
}





Game_CharacterBase.prototype.touchEvent = function(x, y) {}

Game_Player.prototype.touchEvent = function(x, y) {
    if (this.canStartLocalEvents()) {
        //this.startJumpMapEvent(x, y, [0, 1, 2], false);
    }
}


Game_CharacterBase.prototype.startJumpMapEvent = function(x, y, triggers, normal) {
    if (!$gameMap.isEventRunning()) {
        $gameMap.eventsXy(x, y).forEach(function(event) {
            if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                event.start();
            }
        });
    }
};



Game_CharacterBase.prototype.jumpXEnd = function(x, y) {
    this._realX = x
    this._jumpVx = 0
}

Game_CharacterBase.prototype.jumpEnd = function(x, y) {
    this._x = x
    this._y = y
    this._realX = this._realX
    this._realY = y
    this._jumpVx = 0
    this._jumpVy = 0
    this._g = 0
    this._jumpCount = 0
    this._jumpNum = 0
    if (this.getJumpEndSid()) {
        $gameSwitches.setValue(this.getJumpEndSid(), true)
    }
}



Game_CharacterBase.prototype.setJumpEndSid = function(i) {
    this._jumpEndSId = i
}
Game_CharacterBase.prototype.getJumpEndSid = function() {
    return this._jumpEndSId
}



ww_JumpPt._Game_CharacterBase_prototype_jumpHeight = Game_CharacterBase.prototype.jumpHeight
Game_CharacterBase.prototype.jumpHeight = function() {
    if (this.isJumpingV()) {
        return 0
    } else {
        return ww_JumpPt._Game_CharacterBase_prototype_jumpHeight.call(this)
    }
}



Game_CharacterBase.prototype.jumpMoveX = function(count) {
    var g = this._g
    if (g < 0) {
        return this._jumpVx;
    } else {
        return 0
    }
};

Game_CharacterBase.prototype.jumpMoveY = function(count) {
    var g = this._g
    if (g < 0) {
        var t = this._jumpCountAll - count
        return -(this._jumpVy + g * t + g / 2);
    } else {
        return 0
    }
};



ww_JumpPt._Game_Player_prototype_updateJump = Game_Player.prototype.updateJump
Game_Player.prototype.updateJump = function() {
    if (Input.dir4 == 8) {
        this.jumpUpSwitch(true)
    } else {
        this.jumpUpSwitch(false)
    }
    if (Input.dir4 == 2) {
        this.jumpDownSwitch(true)
    } else {
        this.jumpDownSwitch(false)
    }
    ww_JumpPt._Game_Player_prototype_updateJump.call(this)
};



/**设置跳跃事件 */
Game_CharacterBase.prototype.setJumpE = function(e, x, y, v) {
    //console.log(e, x, y)
    v || this.setJumpESwitch(e)
    this._jumpMoveEvent = e
    if (e) {
        this._jumpMoveEventLx = e._x
        this._jumpMoveEventLy = e._y
        this._jumpMoveEventRx = e._realX
        this._jumpMoveEventRy = e._realY
        this._jumpMoveEventOx = x || 0
        this._jumpMoveEventOy = y || 0
    }
}

/**移动跟着 */
Game_CharacterBase.prototype.moveByJumpE = function() {
    var e = this._jumpMoveEvent
    if (e && e.isJumpingE) {
        var dmx = e._x - this._jumpMoveEventLx
        var dmy = e._y - this._jumpMoveEventLy

        if (dmx || dmy) {
            this._x += dmx
            this._y += dmy
            this.touchEvent(this._x, this._y)
        }
        var rmx = e._realX - this._jumpMoveEventRx
        var rmy = e._realY - this._jumpMoveEventRy
            //console.log(dmx, dmy, rmx, rmy)
        if (rmx || rmy) {
            this._realX += rmx
            this._realY += rmy
        }
        (dmx || dmy || rmy || rmx) && this.setJumpE(e, this._jumpMoveEventOx, this._jumpMoveEventOy, 1)
    }
}

Game_CharacterBase.prototype.isJumpEMoving = function() {
    var e = this._jumpMoveEvent
    if (e) {
        var erx = e._realX - this._jumpMoveEventOx
        var ery = e._realY - this._jumpMoveEventOy
        return erx !== this._realX || ery !== this._realY
    }
}



ww_JumpPt._Game_Player_prototype_setPosition = Game_Player.prototype.setPosition
Game_Player.prototype.setPosition = function(x, y) {
    ww_JumpPt._Game_Player_prototype_setPosition.call(this, x, y)
    this.setJumpEOn()
};


Game_CharacterBase.prototype.jumpD = function(x, t) {
    if (this.isJumpingV()) {
        if (t) {
            var vx = x / t
            this._jumpVx = vx
        }

        if (vx > 0) {
            this.setDirection(6)
        } else if (vx < 0) {
            this.setDirection(4)
        }
    }
};



ww_JumpPt._Game_CharacterBase_prototype_update = Game_CharacterBase.prototype.update
Game_CharacterBase.prototype.update = function() {
    if (this.isJumpingE()) {
        this.moveByJumpE()
    }
    ww_JumpPt._Game_CharacterBase_prototype_update.call(this)
};





ww_JumpPt._Game_Player_prototype_update = Game_Player.prototype.update
Game_Player.prototype.update = function(sceneActive) {
    if (this.isJumpingE()) {
        this.moveByJumpE()
    }
    ww_JumpPt._Game_Player_prototype_update.call(this, sceneActive)
};




ww_JumpPt._Game_CharacterBase_prototype_isMoving = Game_CharacterBase.prototype.isMoving
Game_CharacterBase.prototype.isMoving = function() {
    if (this.isJumpingE()) {
        return this.isJumpEMoving()
    } else {
        return ww_JumpPt._Game_CharacterBase_prototype_isMoving.call(this)
    }
};




ww_JumpPt._Game_CharacterBase_prototype_updateMove = Game_CharacterBase.prototype.updateMove
Game_CharacterBase.prototype.updateMove = function() {
    if (this.isJumpingE()) {
        //console.log("move")
        this.updateJumpEMove()
    } else {
        return ww_JumpPt._Game_CharacterBase_prototype_updateMove.call(this)
    }
};


Game_CharacterBase.prototype.updateJumpEMove = function() {
    var e = this._jumpMoveEvent
    var erx = e._realX - this._jumpMoveEventOx
    var ery = e._realY - this._jumpMoveEventOy
    if (erx < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), erx);
    }
    if (erx > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), erx);
    }
    if (ery < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), ery);
    }
    if (ery > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), ery);
    }
    if (!this.isMoving()) {
        //刷新灌木丛深度()
        this.refreshBushDepth();
    }
};

Game_CharacterBase.prototype.setJumpEOut = function() {
    this.setJumpE(null)
}


Game_CharacterBase.prototype.setJumpEOn = function() {
    var passe = this.getXyE(this._x, this._y)
    if (passe) {
        this.moveToE(passe)
        return true
    } else {
        return false
    }
}



Game_CharacterBase.prototype.tileJumpE = function(x, y, e) {
    return { _x: x, _y: y, _realX: x, _realY: y, _ptType: e.ptType, _qyid: e.qyid }
}

Game_CharacterBase.prototype.canPassE = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    }
    return this.getXyE(x2, y2, d) //this.tileJumpE(x2, y2, "kong")
}

ww_JumpPt._Game_CharacterBase_prototype_moveStraight = Game_CharacterBase.prototype.moveStraight
Game_CharacterBase.prototype.moveStraight = function(d) {
    if (this.isJumpingE()) {
        var passe = this.canPassE(this._x, this._y, d)
        this.setMovementSuccess(!!passe);
        if (this.isMovementSucceeded()) {
            this.setDirection(d);

            this.moveToE(passe)
                //if (passe.tile) { this.setJumpE(null) }
                //否则
        } else {
            //设置方向(d)
            if (d == 4 || d == 6) { this.setDirection(d); }
            //检查正面事件触摸触发(d)
            this.checkEventTriggerTouchFront(d);
        }
    } else {
        ww_JumpPt._Game_CharacterBase_prototype_moveStraight.call(this, d)
    }
}



Game_CharacterBase.prototype.canPassDiagonallyE = function(x, y, horz, vert) {
    var x2 = $gameMap.roundXWithDirection(x, horz);
    var y2 = $gameMap.roundYWithDirection(y, vert);
    var e1 = this.canPassE(x, y, vert)
    var e2 = this.canPassE(x, y2, horz)
    if (e1 && e2) {
        return e2;
    }
    var e3 = this.canPassE(x, y, horz)
    var e4 = this.canPassE(x2, y, vert)
    if (e3 && e4) {
        return e4;
    }
    return false;
};


/**移动对角*/
ww_JumpPt._Game_CharacterBase_prototype_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    if (this.isJumpingE()) {
        var passe = this.canPassDiagonallyE(this._x, this._y, horz, vert)
        this.setMovementSuccess(!!passe);
        if (this.isMovementSucceeded()) {
            this.moveToE(passe)
        }
        if (this._direction === this.reverseDir(horz)) {
            if (horz == 4 || horz == 6) { this.setDirection(horz); }

        }
        if (this._direction === this.reverseDir(vert)) {
            if (vert == 4 || vert == 6) { this.setDirection(vert); }
        }
    } else {
        ww_JumpPt._Game_CharacterBase_prototype_moveDiagonally.call(this, horz, vert)
    }
};



Game_CharacterBase.prototype.moveToE = function(passe) {
    if (passe) {
        ///var e = this.isJumpingE()
        if (passe._ptType == "kong") {
            var x = passe._x - this._x
            var h = this._y - passe._y
            if (h > 0) {
                this.jumpV(x * 2, h, 15)
            } else {
                this.jumpV(x * 2, h, 15, [this._x, this._y, passe._x, passe._y])
            }
            this.increaseSteps();
        } else {
            if (passe.event && passe._ptType == "pt") {
                this.setJumpE(passe, 0, 1)
                this._x = passe._x
                this._y = passe._y - 1
            } else {
                this.setJumpE(passe)
                this._x = passe._x
                this._y = passe._y
            }
            this.increaseSteps();
        }
    }
}




Game_CharacterBase.prototype.getXyE = function(x, y, d) {
    if (!$gameMap || !$gameMap.isValid(x, y)) {
        return false;
    }
    var qb = ["qb"]
    if (d) {
        var qb = ["qb", "qb" + d]
    }
    if (this.isJumpOnEvent(x, y, qb)) {
        return false
    }
    if (this.isJumpOn(x, y, qb)) {
        return false
    }
    var e = this.isJumpOnEvent(x, y, ["base", "sz"])
    if (e) {
        return e
    }
    var e = this.isJumpOn(x, y, ["base", "sz"])
    if (e) {
        return this.tileJumpE(x, y, e)
    }
    var e = this.isJumpOnEvent(x, y + 1, ["pt"])
    if (e) {
        return e
    }
    var e = this.isJumpOn(x, y, ["pt"])
    if (e) {
        return this.tileJumpE(x, y, e)
    }
    var e = this.isJumpOnEvent(x, y, ["kong"])
        //console.log(e)
    if (e) {
        return e
    }
    var e = this.isJumpOn(x, y, ["kong"])
        //console.log(e)
    if (e) {
        return this.tileJumpE(x, y, e)
    }
    return false //this.tileJumpE(x, y, "kong")
}



Game_CharacterBase.prototype.setJumpESwitch = function(passe) {
    var type = passe ? passe._ptType : ""
    if (this.jumpOnType() != type) {
        this.changeJumpOnType(type)
    }
    var id = passe ? passe._qyid : 0
    if (this.jumpOnId() != id) {
        this.changeJumpOnId(id)
    }
}


Game_CharacterBase.prototype.jumpOnType = function() {
    return this._jumpOnType
}


Game_CharacterBase.prototype.jumpOnId = function() {
    return this._jumpOnId
}


Game_CharacterBase.prototype.changeJumpOnType = function(v) {
    this._jumpOnType = v
}


Game_CharacterBase.prototype.changeJumpOnId = function(v) {
    this._jumpOnId = v
}


Game_Player.prototype.changeJumpOnType = function(v) {
    if (ww_JumpPt.typeswitch) {
        var id = ww_JumpPt.typeswitch[v]
        if (id) {
            $gameSwitches.setValue(id, true)
        }
    }
    Game_CharacterBase.prototype.changeJumpOnType.call(this, v)
}


Game_Player.prototype.changeJumpOnId = function(v) {
    if (ww_JumpPt.qyswitch) {
        var id = ww_JumpPt.qyswitch[v]
        if (id) {
            $gameSwitches.setValue(id, true)
        }
    }
    Game_CharacterBase.prototype.changeJumpOnId.call(this, v)
}



Game_Player.prototype.jumpV = function(x, y, g, list) {
    this.getOnJump()
    Game_CharacterBase.prototype.jumpV.call(this, x, y, g, list)
}



/**移动直线*/
Game_Player.prototype.moveStraight = function(d) {
    //if (this.canPass(this.x, this.y, d)) { 
    this._followers.updateMove();
    //} 
    Game_Character.prototype.moveStraight.call(this, d);
};
/**移动对角*/
Game_Player.prototype.moveDiagonally = function(horz, vert) {
    //if (this.canPassDiagonally(this.x, this.y, horz, vert)) { 
    this._followers.updateMove();
    //} 
    Game_Character.prototype.moveDiagonally.call(this, horz, vert);
};





Game_Player.prototype.jumpEnd = function(x, y) {
    Game_CharacterBase.prototype.jumpEnd.call(this, x, y)
    if (ww_JumpPt.playJumpEndSId) {
        $gameSwitches.setValue(ww_JumpPt.playJumpEndSId, true)
    }
    this.getOffJump()
}



Game_Player.prototype.getOnJump = function() {
    if (!this.isJumping()) {
        this._followers.synchronize(this._realX, this._realY, this.direction())
        this._followers.jumpVall()
    }
};

Game_Player.prototype.getOffJump = function() {
    this._followers.synchronize(this._realX, this._realY, this.direction())
    this._followers.jumpVallEnd()
};


Game_Followers.prototype.jumpVall = function() {
    this.forEach(function(follower) {
        return follower.setJumpE($gamePlayer);
    }, this)
};


Game_Followers.prototype.jumpVallEnd = function() {
    this.forEach(function(follower) {
        return follower.setJumpE(false);
    }, this)
};



Game_Follower.prototype.canPass = function() {
    return true
}


Game_Follower.prototype.setJumpE = function(e, x, y) {
    if (e === false || e == $gamePlayer) {
        Game_CharacterBase.prototype.setJumpE.call(this, e, x, y)
    }
}


ww_JumpPt._Game_Follower_prototype_chaseCharacter = Game_Follower.prototype.chaseCharacter
Game_Follower.prototype.chaseCharacter = function(character) {
    if (this.isJumpingE()) {
        this.setDirection($gamePlayer.direction())
    } else {

        ww_JumpPt._Game_Follower_prototype_chaseCharacter.call(this, character)
    }

};