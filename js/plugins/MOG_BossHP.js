//=============================================================================
// MOG_BossHP.js
//=============================================================================

/*:
 * @plugindesc (v2.1) Apresenta um medidor de HP para os chefes.
 * @author Moghunter
 *
 * @param Shake Effect
 * @desc Ativar o efeito tremer.
 * @default true 
 *
 * @param HP Number Visible
 * @desc Apresentar o HP em numeros.
 * @default true
 *
 * @param Show Face
 * @desc Apresentar a face do inimigo.
 * @default true
 *
 * @param Slant Animation
 * @desc Ativar a animação de Flow no medidor de HP.
 * @default true
 *
 * @param Flow Speed
 * @desc Definição da velocidade da animação.
 * @default 4
 *  
 * @param Name Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * 
 * @param Layout X-Axis
 * @desc Posição X-Axis do layout.
 * @default 150
 *
 * @param Layout Y-Axis
 * @desc Posição Y-Axis do layout.
 * @default 10
 *
 * @param BHP Name X-Axis
 * @desc Posição X-Axis do numero.
 * @default 36
 *
 * @param Name Y-Axis
 * @desc Posição Y-Axis do numero.
 * @default 23   
 *
 * @param Face X-Axis
 * @desc Posição X-Axis da face.
 * @default -50
 *
 * @param Face Y-Axis
 * @desc Posição Y-Axis da face.
 * @default 10   
 * 
 * @param Meter X-Axis
 * @desc Posição X-Axis do medidor.
 * @default 22
 *
 * @param Meter Y-Axis
 * @desc Posição Y-Axis do medidor.
 * @default 28 
 * 
 * @param Number X-Axis
 * @desc Posição X-Axis do numero.
 * @default 460
 *
 * @param Number Y-Axis
 * @desc Posição Y-Axis do numero.
 * @default 32  
 *
 * @help  
 * =============================================================================
 * +++ MOG - Boss HP Meter (v2.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta um medidor de HP para os chefes.
 *
 * Serão necessários os arquivos. (img/bosshp/)
 *
 * Boss_HP_A.png
 * Boss_HP_A.png
 * Boss_HP_C.png
 *
 * =============================================================================
 * Use a Tag abaixo na caixa de notas para definir quais os inimigos terão o
 * medidor de chefe.
 *
 * Boss HP
 *
 * =============================================================================
 * FACE NAME
 * =============================================================================
 * Nomeie as faces dos inimigos da seguinte maneira.
 *
 * Face_ + ID.png
 *
 * EG
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ....
 *
 * -----------------------------------------------------------------------------
 * Para definir a posição do medidor de HP use o seguinte comentário através do
 * comando PLUGIN COMMAND.
 * 
 * boss_hp_position : X : Y
 *
 * X - Posição X-axis.
 * Y - Posição X-axis.
 *
 * -----------------------------------------------------------------------------
 * Para ocultar ou mostrar os numeros de HP use o seguinte comentário através do
 * comando PLUGIN COMMAND.
 *
 * boss_hp_number_hide
 * boss_hp_number_show
 *
 * -----------------------------------------------------------------------------
 * HISTÓRICO
 * -----------------------------------------------------------------------------
 * v2.1 - Compatibilidade com o Chrono Engine. 
 * v2.0 - Opção de apresentar a Face do inimigo.
 *      - Adição da animação de flow.
 *
 */
	
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BossHP = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_BossHP');
	Moghunter.bosshp_flowAnimation = String(Moghunter.parameters['Slant Animation'] || "true");
	Moghunter.bosshp_flowAnimationSpeed = Number(Moghunter.parameters['Flow Speed'] || 4);
	Moghunter.bosshp_face = String(Moghunter.parameters['Show Face'] || "true");
    Moghunter.bosshp_faceX = Number(Moghunter.parameters['Face X-Axis'] || -50);
	Moghunter.bosshp_faceY = Number(Moghunter.parameters['Face Y-Axis'] || 10);
    Moghunter.bosshp_layout_x = Number(Moghunter.parameters['Layout X-Axis'] || 150);
    Moghunter.bosshp_layout_y = Number(Moghunter.parameters['Layout Y-Axis'] || 10)
    Moghunter.bosshp_meter_x = Number(Moghunter.parameters['Meter X-Axis'] || 22);
    Moghunter.bosshp_meter_y = Number(Moghunter.parameters['Meter Y-Axis'] || 28);	
    Moghunter.bosshp_number_x = Number(Moghunter.parameters['Number X-Axis'] || 460);
    Moghunter.bosshp_number_y = Number(Moghunter.parameters['Number Y-Axis'] || 32);
    Moghunter.bosshp_name_x = Number(Moghunter.parameters['Name X-Axis'] || 36);
    Moghunter.bosshp_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 23);
	Moghunter.bosshp_font_size = Number(Moghunter.parameters['Name Font Size'] || 18);
	Moghunter.bosshp_shake_effect = String(Moghunter.parameters['Shake Effect'] || true);	
	Moghunter.bosshp_hp_number_visible = String(Moghunter.parameters['HP Number Visible'] || true);


//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Boss Hp
//==============================
ImageManager.loadBossHp = function(filename) {
    return this.loadBitmap('img/bosshp/', filename, 0, true);
};

	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bosshp_temp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_bosshp_temp_initialize.call(this);
	this._battler_bhp_temp = [null,0,false,0];
	this._battler_bhp_refresh = false;
	this._battler_bhp_remove = false;
};

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bosshp_sys_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	_alias_mog_bosshp_sys_initialize.call(this);
	this._bosshp_data = [Moghunter.bosshp_layout_x,Moghunter.bosshp_layout_y,Moghunter.bosshp_hp_number_visible];
	this._battler_bhp_oldNumber = [0,0];
	this._chronoBossEnemy = null;
	this._chronoBossMapID = 0;
}

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_bosshp_ex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_bosshp_ex_pluginCommand.call(this,command, args)
    this.setPluginCommandBossHP(command, args);
	return true;
};

//==============================
// * set Plugin Command Boss HP
//==============================
Game_Interpreter.prototype.setPluginCommandBossHP = function(command, args) {
	if (command === "boss_hp_position")  { $gameSystem._bosshp_data[0] = args[1];
	     $gameSystem._bosshp_data[1] = args[3];};
	if (command === "boss_hp_number_hide")  {$gameSystem._bosshp_data[2] = "false";};
	if (command === "boss_hp_number_show")  {$gameSystem._bosshp_data[2] = "true";};
	if (command === "boss_hp_erase")  {$gameTemp._battler_bhp_remove = "true";};
	if (Imported.MOG_ChronoEngine) {
		if (command === "boss_set_event_battler_id")  {
			for (var i = 0; i < $gameMap.allEnemiesOnMap().length; i++) {
				var ev = $gameMap.allEnemiesOnMap()[i];
				var battler = ev.battler();;
				if (battler._bosshp_meter) {
				    $gameSystem._chronoBossEnemy = battler;
					$gameTemp._battler_bhp_refresh = true;
					break
				};
			};		
		};
	};
};
 
//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * processVictory
//==============================
var _alias_mog_bosshp_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processVictory.call(this);	 
};

//==============================
// * processAbort
//==============================
var _alias_mog_bosshp_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processAbort.call(this);	 
};

//==============================
// * processDefeat
//==============================
var _alias_mog_bosshp_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processDefeat.call(this);	 
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// * Appear
//==============================
var _mog_bhp_gbat_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    _mog_bhp_gbat_appear.call(this);
	$gameTemp._battler_bhp_refresh = true;
};

//=============================================================================
// ** Game_Enemy
//=============================================================================

//==============================
// * initMembers
//==============================
var _alias_mog_bosshp_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_alias_mog_bosshp_initMembers.call(this);
	this._bosshp_meter = false;
};

//==============================
// * Setup
//==============================
var _alias_mog_bosshp_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alias_mog_bosshp_setup.call(this,enemyId, x, y);
    this.checkBossHPnoteTag();	
};

//==============================
// * Setup
//==============================
Game_Enemy.prototype.checkBossHPnoteTag = function() {
	for (var i = 0; i < this.notetags().length; i++) {
		if (this.notetags()[i] == "Boss HP") {this._bosshp_meter = true};
	};	
};

//==============================
// * transform
//==============================
var _mog_bosshp_enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
	_mog_bosshp_enemy_transform.call(this,enemyId)
    $gameTemp._battler_bhp_refresh = true;
	this.checkBossHPnoteTag();	
};
	
//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _alias_mog_bosshp_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	 if (target.isEnemy() && target._bosshp_meter) {
		 $gameTemp._battler_bhp_temp[1] = target.hp;
	     var old_hp = target.hp; $gameTemp._battler_bhp_temp[3] = 0
	 };
	 _alias_mog_bosshp_apply.call(this,target);
	 if (target.isEnemy() && target._bosshp_meter) {
		 $gameTemp._battler_bhp_temp[0] = target;
	     if (old_hp > target.hp) {$gameTemp._battler_bhp_temp[3] = 60};
	 };
};


//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// * Terminate
//==============================
var _mog_bossHP_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	$gameSystem._chronoBossEnemy = null;
	$gameSystem._chronoBossMapID = $gameMap._mapId;
	if (this._spriteset && this._spriteset._bosshp_sprites) {
		var battler = this._spriteset._bosshp_sprites._battler;
		if (!battler.isDead()) {	
	        $gameSystem._chronoBossEnemy = battler;
			$gameSystem._battler_bhp_oldNumber[0] = this._spriteset._bosshp_sprites._hp_data[2];
			$gameSystem._battler_bhp_oldNumber[1] = this._spriteset._bosshp_sprites._hp_data[6];
		};
	};  	
    _mog_bossHP_smap_terminate.call(this);
};

//=============================================================================
// ** Spriteset_Base
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_bossHPCN_sprBase_initialize = Sprite_Base.prototype.initialize;
Sprite_Base.prototype.initialize = function() {
   _mog_bossHPCN_sprBase_initialize.call(this);
   if ($gameSystem._chronoBossMapID != $gameMap._mapId) {; 
       $gameSystem._chronoBossEnemy = null;
	   $gameSystem._chronoBossMapID = $gameMap._mapId;
   };   
};

//==============================
// * Create Boss HP Sprites
//==============================
Spriteset_Base.prototype.createBossHPGauge = function() {	
	$gameTemp._battler_bhp_refresh = false;
	var init_battler = this.checkBossHpEnemies();
	this.removeBossHPGauge();
	if (init_battler) {
		if (!this._bosshp_sprites) {
          if (Imported.MOG_ChronoEngine) {
			   this.removeBossHPGauge();
			   this._bosshp_sprites = new Sprite_BossHP(init_battler);
			   this._hudField.addChild(this._bosshp_sprites);			   
		   } else {
			   this._bosshp_sprites = new Sprite_BossHP(init_battler);
			   this.addChild(this._bosshp_sprites);
		   };
		};
	};
};

//==============================
// * Create Boss HP Sprites
//==============================
Spriteset_Base.prototype.checkBossHpEnemies = function() {
	var boss = null;
	if (Imported.MOG_ChronoEngine) {
		if ($gameSystem.isChronoMode()) {
			$gameMap.enemiesF().forEach(function(enemy) {
				 battler = enemy.battler()
				 if (battler._bosshp_meter) {boss = battler};
			},this);			
		} else if ($gameSystem._chronoBossEnemy) {
		     boss = $gameSystem._chronoBossEnemy;
	    };
	} else {
		$gameTroop.members().forEach(function(enemy) {
				if (enemy._bosshp_meter && !enemy.isHidden()) {boss = enemy};
		},this);
	};
	return boss;
};

//==============================
// ** remove Boss HP Gauge
//==============================
Spriteset_Base.prototype.removeBossHPGauge = function() {
	$gameTemp._battler_bhp_remove = false;
	$gameSystem._chronoBossEnemy = null;
	if (!this._bosshp_sprites) {return};
	if (this._hudField) {
		this._hudField.removeChild(this._bosshp_sprites);
	} else {
	    this.removeChild(this._bosshp_sprites);
	};
    this._bosshp_sprites = null;
};

//==============================
// * Update
//==============================
var _mog_bosshp_SprtBase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
	_mog_bosshp_SprtBase_update.call(this);
	if ($gameTemp._battler_bhp_refresh) {this.createBossHPGauge()};
	if (!this._bosshp_sprites && $gameSystem._chronoBossEnemy) {
	     this.createBossHPGauge();
	};
	if ($gameTemp._battler_bhp_remove) {this.removeBossHPGauge()};
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================	

//==============================
// * CreateLowerLayer
//==============================
var _alias_mog_bosshp_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
Spriteset_Battle.prototype.createLowerLayer = function() {
	_alias_mog_bosshp_createLowerLayer.call(this);
	this.createBossHPGauge();
};


//=============================================================================
// ** Sprite_BossHP
//=============================================================================	
function Sprite_BossHP() {
    this.initialize.apply(this, arguments);
}

Sprite_BossHP.prototype = Object.create(Sprite.prototype);
Sprite_BossHP.prototype.constructor = Sprite_BossHP;

//==============================
// * Initialize
//==============================
Sprite_BossHP.prototype.initialize = function(init_battler) {
    Sprite.prototype.initialize.call(this);	
	this._init = true;
	$gameTemp._battler_bhp_temp = [init_battler,init_battler.hp,false,0];
	this._flowAnimation = String(Moghunter.bosshp_flowAnimation) === "true" ? true : false;
	this._battler = init_battler;
	this._hp_data = [-1,-1,0,0,0,0,0,0,0,Number($gameSystem._bosshp_data[0]),Number($gameSystem._bosshp_data[1]),false,true];
    this.createSprites();
	if (String(Moghunter.bosshp_shake_effect) === "true") {this._hp_data[11] = true};
	if (String($gameSystem._bosshp_data[2]) != "true") {this._hp_data[12] = false};
};

//==============================
// * create Sprites
//==============================
Sprite_BossHP.prototype.createSprites = function() {
    this.createLayout();
    this.createHPMeter();
	this.createFace(); 
    this.createLayout();
    this.createHPNumber();
    this.createName();
};

//==============================
// * createLayout
//==============================
Sprite_BossHP.prototype.createLayout = function() {
	this._layout = new Sprite(ImageManager.loadBossHp("Boss_HP_A"));
	this._layout.x = this._hp_data[9];
	this._layout.y = this._hp_data[10];
	this._layout.opacity = 0;
	this.addChild(this._layout);	
};

//==============================
// * create Face
//==============================
Sprite_BossHP.prototype.createFace = function() {
     this._face = new Sprite();
	 this.addChild(this._face);
	 this.refreshFace();
	 this.updateFace();
};

//==============================
// * update Face
//==============================
Sprite_BossHP.prototype.updateFace = function() {
	 this._face.x = this._layout.x + Moghunter.bosshp_faceX;
	 this._face.y = this._layout.y + Moghunter.bosshp_faceY;
	 this._face.visible = this._layout.visible;
	 this._face.opacity = this._layout.opacity;
};

//==============================
// * refresh Face
//==============================
Sprite_BossHP.prototype.refreshFace = function() {
    this._face.bitmap = ImageManager.loadBossHp("Face_" + String(this._battler._enemyId));
};

//==============================
// * create HP Meter
//==============================
Sprite_BossHP.prototype.createHPMeter = function() {
	this._hp_meter_red = new Sprite(ImageManager.loadBossHp("Boss_HP_B"));
	this._hp_meter_red.x = this._layout.x + Moghunter.bosshp_meter_x;
	this._hp_meter_red.y = this._layout.y + Moghunter.bosshp_meter_y;
	this._hp_meter_red.opacity = 0;
	this._hp_meter_redFlow = [-1,0,0,0];
	this._hp_meter_red.setFrame(0,0,1,1);	
	this.addChild(this._hp_meter_red);
	this._hp_meter_blue = new Sprite(ImageManager.loadBossHp("Boss_HP_B"));
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;	
	this._hp_meter_blue.opacity = 0;
	this._hp_meter_blueFlow = [-1,0,0,0];
	this._hp_meter_blue.setFrame(0,0,1,1);	
	this.addChild(this._hp_meter_blue);
};	

//==============================
// * create HP Number
//==============================
Sprite_BossHP.prototype.createHPNumber = function() {
	this._hp_number = [];
	this._hp_number_data = []
	this._hp_number_img = ImageManager.loadBossHp("Boss_HP_C");
	for (var i = 0; i < 6; i++) {
		 this._hp_number[i] = new Sprite(this._hp_number_img);
		 this._hp_number[i].visible = false;
		 this._hp_number[i].opacity = 0;
		 this._hp_number[i].x = this._layout.x + Moghunter.bosshp_number_x;
		 this._hp_number[i].y = this._layout.y + Moghunter.bosshp_number_y;
		 this._hp_number_data[i] = 0;
		 this.addChild(this._hp_number[i]);		 
	};
};

//==============================
// * create Name
//==============================
Sprite_BossHP.prototype.createName = function() {
	this._name = new Sprite(new Bitmap(300,48));
	this.addChild(this._name);
	this._name.bitmap.fontSize = Moghunter.bosshp_font_size;
	this.refresh_name();
	this._name.x = this._layout.x + Moghunter.bosshp_name_x;
	this._name.y = this._layout.y + Moghunter.bosshp_name_y;
	this._name.opacity = 0;
};

//==============================
// * get Sprite Data
//==============================
Sprite_BossHP.prototype.getSpriteData = function() {
	    this._hp_meter_blueFlow[0] = this._flowAnimation ? (this._hp_meter_blue.bitmap.width / 3) : this._hp_meter_blue.bitmap.width;
		this._hp_meter_blueFlow[1] = this._hp_meter_blue.bitmap.height;
		this._hp_meter_blueFlow[2] = this._hp_meter_blueFlow[0] * 2;
		this._hp_meter_blueFlow[3] = 0;
	    this._hp_meter_redFlow[0] = this._flowAnimation ? (this._hp_meter_red.bitmap.width / 3) : this._hp_meter_red.bitmap.width;
		this._hp_meter_redFlow[1] = this._hp_meter_red.bitmap.height;
		this._hp_meter_redFlow[2] = this._hp_meter_redFlow[0] * 2;
		this._hp_meter_redFlow[3] = 0;		
};

//==============================
// * Update
//==============================
Sprite_BossHP.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (this._hp_meter_blueFlow[0] === -1) {
	    if (this._layout.bitmap.isReady()) {
			this.getSpriteData();
		} else {
			return
		};
    };
	if (this._flowAnimation) {this.updateFlowAnimation()};
	if ($gameTemp._battler_bhp_temp[3] != 0) {this.refreshShake()};
	if (this.need_onSkillCancelites()) {this.onSkillCancelites(5)} else {this.onSkillCancelites(-5)};
	if ($gameTemp._battler_bhp_temp[0] != this._battler) {this.refresh_all();	};
	if (this._flowAnimation) {
	    this.refresh_blue_meter(); 
	} else if (this._hp_data[0] != this._battler.hp || this._hp_data[1] != this._battler.mhp) {
		this.refresh_blue_meter();
	};
	if (this._hp_data[2] != this._battler.hp) {this.refresh_red_meter();};
	if (this._hp_data[6] != this._battler.hp) {this.update_hp_number();};
	if (this._hp_data[11]) {this.update_shake_effect();};
	if (this._face) {this.updateFace()};
	this._init = false;
};

//==============================
// * refresh Shake
//==============================
Sprite_BossHP.prototype.refreshShake = function() {
	this._hp_data[7] = $gameTemp._battler_bhp_temp[3];
	$gameTemp._battler_bhp_temp[3] = 0;
};

//==============================
// * Update Flow Animation
//==============================
Sprite_BossHP.prototype.updateFlowAnimation = function() {
    this._hp_meter_blueFlow[3] += Moghunter.bosshp_flowAnimationSpeed;
	if (this._hp_meter_blueFlow[3] > this._hp_meter_blueFlow[2]) {
		this._hp_meter_blueFlow[3] = 0;
	};
    this._hp_meter_redFlow[3] += Moghunter.bosshp_flowAnimationSpeed;
	if (this._hp_meter_redFlow[3] > this._hp_meter_redFlow[2]) {
		this._hp_meter_redFlow[3] = 0;
	};	
};

//==============================
// * Update Shake Effect
//==============================
Sprite_BossHP.prototype.update_shake_effect = function() {
    if (this._hp_data[7] <= 0) {return;};
	this._hp_data[7] -= 1;
	this._layout.y = -3 + this._hp_data[10] + Math.floor(Math.random() * 6);
	if (this._hp_data[7] <= 0) {this._layout.y = this._hp_data[10]};//
	
};

//==============================
// * Update HP Number
//==============================
Sprite_BossHP.prototype.update_hp_number = function() {
	  if (!this._hp_data[12]) {return};
	  if (this._init && $gameSystem._battler_bhp_oldNumber[1] != 0) {
		  this._hp_data[6] = $gameSystem._battler_bhp_oldNumber[1];
		  $gameSystem._battler_bhp_oldNumber[1] = 0;
	  };	  
      var nspd = 1 + Math.floor((Math.abs(this._hp_data[6] - this._battler.hp) / 30))
      if (this._hp_data[6] < this._battler.hp) {
		  this._hp_data[6] += nspd;
		  if (this._hp_data[6] > this._battler.hp) {this._hp_data[6] = this._battler.hp};
	  }
	  else if (this._hp_data[6] > this._battler.hp) {
		  this._hp_data[6] -= nspd;
		  if (this._hp_data[6] < this._battler.hp) {this._hp_data[6] = this._battler.hp};
	  };
	  this.refresh_hp_number();
	  $gameTemp.reserveCommonEvent(2);
};
	  
//==============================
// * Refresh HP Number
//==============================
Sprite_BossHP.prototype.refresh_hp_number = function() {
   var w = this._hp_number_img.width / 10;
   var h = this._hp_number_img.height;	
   this._hp_data[4] = Math.abs(this._hp_data[6]).toString().split("");  
   if (this._hp_data[4].length > this._hp_number.length) {return};
   if (this._hp_data[4].length != this._hp_data[5]) {
	   for (var i = 0; i < 6; i++) {this._hp_number[i].visible = false};this._hp_data[5] = this._hp_data[4].length};
   for (var i = 0; i < this._hp_data[4].length; i++) {
	   var n = Number(this._hp_data[4][i]);
	   this._hp_number[i].setFrame(n * w, 0, w, h);
	   this._hp_number[i].visible = true;	   
	   var nx = -(w * i) + (w * this._hp_data[4].length)
	   this._hp_number[i].x = (this._layout.x + Moghunter.bosshp_number_x) - nx;
   };
};

//==============================
// * Refresh Name
//==============================
Sprite_BossHP.prototype.refresh_name = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._battler.enemy().name, 0, 0, this._name.bitmap.width, this._name.bitmap.height,0);	
};

//==============================
// * Need Fade Sprites
//==============================
Sprite_BossHP.prototype.need_onSkillCancelites = function() {
	if ($gameMessage.isBusy()) {return true} ;	
	if ($gameTemp._battler_bhp_temp[2]) {return true} ;
	if (!this._battler) {return true} ;
	if (this._battler.isDead()) {return true};
	return false;
};

//==============================
// * Fade Sprites
//==============================
Sprite_BossHP.prototype.onSkillCancelites = function(value) {
	if (this._init) {
	   this._layout.opacity = 255;
	   this._hp_meter_blue.opacity = this._layout.opacity;
	   this._hp_meter_red.opacity = this._layout.opacity;
	   this._name.opacity = this._layout.opacity;
	   for (var i = 0; i < 6; i++) {this._hp_number[i].opacity = this._layout.opacity};	
	   return	
	};
	this._layout.opacity -= value;
	this._hp_meter_blue.opacity = this._layout.opacity;
	this._hp_meter_red.opacity = this._layout.opacity;
	this._name.opacity = this._layout.opacity;
	for (var i = 0; i < 6; i++) {this._hp_number[i].opacity -= value};
};

//==============================
// * Refresh All
//==============================
Sprite_BossHP.prototype.refresh_all = function() {
	 this._battler = $gameTemp._battler_bhp_temp[0];
	 this._hp_data[2] = $gameTemp._battler_bhp_temp[1];
	 this._hp_data[6] = $gameTemp._battler_bhp_temp[1];  
	 this.refresh_hp_number();  
	 this.refresh_blue_meter();
	 this.refresh_red_meter();
	 this.refresh_name();
	 if (this._face) {this.refreshFace()};
};

//==============================
// * Refresh Blue Meter
//==============================
Sprite_BossHP.prototype.refresh_blue_meter = function() {
	 this._hp_data[0] = this._battler.hp;
	 this._hp_data[1] = this._battler.mhp;
     this._layout.y = this._hp_data[10]	 
	 var meter_rate = this._hp_meter_blueFlow[0] * this._battler.hp / this._battler.mhp;
	 this._hp_meter_blue.setFrame(this._hp_meter_blueFlow[3], 0, meter_rate, this._hp_meter_blue.bitmap.height / 2);
};

//==============================
// * Refresh Red Meter
//==============================
Sprite_BossHP.prototype.refresh_red_meter = function() {
	  if (this._init) {
		  if ($gameSystem._battler_bhp_oldNumber[0] != 0) {
		      this._hp_data[2] = $gameSystem._battler_bhp_oldNumber[0];
		      $gameSystem._battler_bhp_oldNumber[0] = 0;
		  } else {
			this._hp_data[2] = this._battler.mhp;			
		  };
	 };		
	  var dnspeed = 1 + (Math.abs(this._hp_data[2] - this._battler.hp) / 160);
	  if (this._hp_data[2] > this._battler.hp) {this._hp_data[2] -= dnspeed;
		  if (this._hp_data[2] < this._battler.hp) {this._hp_data[2] = this._battler.hp};}
	  else if (this._hp_data[2] < this._battler.hp) {this._hp_data[2]  += dnspeed;
		  if (this._hp_data[2]  > this._battler.hp) {this._hp_data[2]  = this._battler.hp};			
	  };
	 var meter_rate = this._hp_meter_redFlow[0] * this._hp_data[2] / this._battler.mhp;
	 this._hp_meter_red.setFrame(this._hp_meter_redFlow[3], this._hp_meter_red.bitmap.height / 2, meter_rate, this._hp_meter_red.bitmap.height / 2);	
};