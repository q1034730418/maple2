/*:
 * @plugindesc tab_zoom
 * @author 龙潭醉鬼
 *
 * @param id 
 * @desc 占用的的开关
 * @default 2
 *
 */
var Scene_Update_20160117=Scene_Map.prototype.update;
 
Scene_Map.prototype.update=function()
 
{
 
    Scene_Update_20160117.call(this);
 
    if(Input.isTriggered('tab'))
 
    {
 
        var id = parseInt(PluginManager.parameters("tab_zoom")["id"]);
 
        if($gameSwitches.value(id))
 
        {
 
            $gameScreen.startZoom(400,300,1,30)
            $gameSwitches.setValue(id,false) 
 
        }
 
 
        else
 
        {
 
            $gameScreen.startZoom(400,300,1.5,30)
            $gameSwitches.setValue(id,true) 
 
        }
    }
 
}