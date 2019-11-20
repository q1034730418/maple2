//=============================================================================
// FreeLayers.js
// Last Updated: 2015-11-3 18:29:37 (GMT+8)
//=============================================================================

/*:
 * @plugindesc 解放图层！ 2015-11-3 18:29:37 (GMT+8)
 * @help 当前版本：2015-11-3 18:29:37 (GMT+8)
 *
 * 受Taroxd在RMVA所编写的Unlimited Layers Display System脚本影响而开发本脚本。
 * 暂未做代码&效率优化。
 * 若发现BUG，请前往http://rm.66rpg.com/forum.php?mod=viewthread&tid=384742反馈给我。
 * 谢谢使用本系统XD！
 *
 * ---------------------------
 *
 * 在地图备注区按以下格式备注内容：
 * <fl=filename>
 *   z: 整数，默认40001，图像的叠加层级，决定了图像在游戏内显示的前后顺序，不可重复
 *   x: 整数，默认0，可为负，图像在地图上的X坐标偏移，以地图左上角为原点
 *   y: 整数，默认0，可为负，图像在地图上的Y坐标偏移，以地图左上角为原点
 *   cx: 整数，默认0，会从图像的(cx,cy)坐标截取宽高为(cw,ch)的内容显示到游戏内
 *   cy: 整数，默认0
 *   cw: 整数，默认为导入的图片的宽度
 *   ch: 整数，默认为导入的图片的高度
 *   ox: 整数，默认0，显示的图像的原点X坐标位置
 *   oy: 整数，默认0，显示的图像的原点Y坐标位置
 *   width: 整数，默认cw，图像在地图内的宽度
 *   height: 整数，默认ch，图像在地图内的高度
 *   scale: 实数，默认1，可为负，图像缩放倍率
 *   scalex: 实数，默认scale，可为负，图像横向缩放倍率
 *   scaley: 实数，默认scale，可为负，图像纵向缩放倍率
 *   opacity: 整数，默认255，可为0~255，不透明度，数值越高越不透明
 *   path: 字符串，默认parallaxes，图像所在的文件夹路径，位于img目录下
 *   visible: 布尔值，默认true，图像是否可见，只有值为false时才不可见
 *   loopx: 整数，默认0，可为负，图像自动横向滚动的速度
 *   loopy: 整数，默认0，可为负，图像自动纵向滚动的速度
 *   scrollx: 整数，默认为游戏地图格子的宽度，图像跟随地图横向卷动的速度
 *   scrolly: 整数，默认为游戏地图格子的高度，图像跟随地图纵向卷动的速度
 *   fill: 布尔值，默认false，图像是否自动填充满整个地图
 *   hue: 整数，默认0，可为0~360，色相环，用以调整图像的色相
 * </fl>
 *
 * ---------------------------
 *
 * 其中filename是图片文件名（无需扩展名），放入img/parallaxes文件夹内
 * 文件夹地址parallaxes可以通过添加path参数来修改
 * 另外，文件名不能包含空格，否则将会无法读取
 *
 * 在<fl=filename>和</fl>中间的数据均为选填，不填则自动设为默认值。
 * 每一个设置项只能写一行，而一行内只允许填写一个设置项。（地图备注没有单行长度限制）
 * 备注区内所有的空格将会被无视，因此你的文件名请不要包含括号。（这个问题后续会进行修复）
 * 一般情况下使用时，理论上大部分参数都不需要设置XD
 *
 * ---------------------------
 *
 * 例：
 * <fl=!Crystal>
 *   x: 384
 *   y: 216
 *   path: characters
 *   z: 1
 *   cw: 48
 *   ch: 96
 *   loopx: 48
 * </fl>
 *
 * ---------------------------
 *
 * 图层 Z 坐标详解：
 * -10000 远景
 *      0 游戏地表图层，在角色下方
 *  10000 游戏角色
 *  20000 云层等的阴影，在角色的上方
 *  30000 触碰设备上的目标提示
 *  40000 天气、云层等
 * 注意：如果你的自定义图层与上述图层用了相同的 Z 坐标，那么这些图层将会被本插件无视从而无法显示。
 * 即，你不能设置与系统默认图层相同的 Z 坐标。（至少目前版本不行）
 *
 * ---------------------------
 *
 * 脚本列表
 *
 * ---------------------------
 *
 * flSetData 立即重设任意属性
 * 参数
 *   Z坐标 - 整数
 *   属性名字 - 字符串或变量
 *   新的参数值 - {属性}所允许的数据类型或变量
 * 用法示例
 *   flSetData(-1, "fill", true) - 设置Z坐标为-1的图层的fill属性为true
 *   flSetData(-1, "fill", "%1") - 设置Z坐标为-1的图层的fill属性为【开关1】的值
 *   flSetData(-1, "loopx", 35+44) - 设置Z坐标为-1的图层的loopx属性为35+44，即79
 *   flSetData(-1, "loopy", "%2") - 设置Z坐标为-1的图层的loopx属性为【变量2】的值
 *
 * flSetContentRect 立即重设内容截取区域
 * 参数
 *   Z坐标 - 整数
 *   原图内容截取区X坐标 - 整数或变量
 *   原图内容截取区Y坐标 - 整数或变量（选填）
 *   原图内容截取区宽度 - 整数或变量（选填）
 *   原图内容截取区高度 - 整数或变量（选填）
 * 用法示例
 *   flSetContentRect(-1, 128, 128, 512, 512) - 截取原图坐标(128, 128)到(128+512, 128+512)的内容作为Z轴为-1的图层的显示内容
 *   flSetContentRect(-1, "%1", "%2", "%3", "%4") - 截取原图坐标(变量[1], 变量[2])到(变量[1]+变量[3], 变量[2]+变量[4])的内容作为Z轴为-1的图层的显示内容
 *
 * flSetShowRect 立即重设图像在游戏中的显示区域/位置
 * 参数
 *   Z坐标 - 整数
 *   图像在游戏地图中的X坐标 - 整数或变量
 *   图像在游戏地图中的Y坐标 - 整数或变量（选填）
 *   图像在游戏地图中的宽度 - 整数或变量（选填）
 *   图像在游戏地图中的高度 - 整数或变量（选填）
 * 用法示例
 *   flSetShowRect(-1, 128, 128, 512, 512) - 在游戏地图的(128, 128)到(128+512, 128+512)处显示Z轴为-1的图层的图像
 *   flSetShowRect(-1, "%1", "%2", "%3", "%4") - 在游戏地图的(变量[1], 变量[2])到(变量[1]+变量[3], 变量[2]+变量[4])处显示Z轴为-1的图层的图像
 *
 * flResetLoopX、flResetLoopY 将指定Z轴的图层将X、Y轴滚动速度在指定帧数内渐变到指定的值
 * 参数
 *   Z坐标 - 整数
 *   渐变所需帧数 - 整数或变量
 *   渐变目标值 - 整数或变量
 * 用法示例
 *   flResetLoopX(-1, 600, 96) - 将Z轴为-1的图层的X轴滚动速度在600帧内渐变为96
 *   flResetLoopY(-1, "%1", "%2") - 将Z轴为-1的图层的Y轴滚动速度在变量[1]帧内渐变为变量[2]
 *
 * flResetOpacity 将指定Z轴的图层的不透明度（可见度）在指定帧数内渐变到指定的值
 * 参数
 *   Z坐标 - 整数
 *   渐变所需帧数 - 整数或变量
 *   渐变目标值 - 整数或变量（0~255）
 * 用法示例
 *   flResetOpacity(-1, 600, 128) - 将Z轴为-1的图层的不透明度（可见度）在600帧内渐变为128
 *   flResetOpacity(-1, "%1", "%2") - 将Z轴为-1的图层的不透明度（可见度）在变量[1]帧内渐变为变量[2]
 *
 * flResetScale、flResetScaleX、flResetScaleY 将指定Z轴的图层的尺寸、X轴尺寸、Y轴尺寸在指定帧数内渐变到指定的值
 * 参数
 *   Z坐标 - 整数
 *   渐变所需帧数 - 整数或变量
 *   渐变目标值 - 数字或变量（1为标准大小）
 * 用法示例
 *   flResetScale(-1, 600, 2) - 将Z轴为-1的图层的尺寸在600帧内渐变缩放为2倍大小
 *   flResetScaleX(-1, "%1", "%2") - 将Z轴为-1的图层的X轴尺寸在变量[1]帧内渐变缩放为变量[2]
 *   flResetScaleY(-1, "%3", "%4") - 将Z轴为-1的图层的Y轴尺寸在变量[3]帧内渐变缩放为变量[4]
 *
 * flResetX、flResetY 将指定Z轴的图层的X、Y轴坐标在指定帧数内渐变到指定的值
 * 参数
 *   Z坐标 - 整数
 *   渐变所需帧数 - 整数或变量
 *   渐变目标值 - 整数或变量
 * 用法示例
 *   flResetX(-1, 600, 500) - 将Z轴为-1的图层的X坐标在600帧内渐变为500
 *   flResetY(-1, "%1", "%2") - 将Z轴为-1的图层的Y坐标在变量[1]帧内渐变为变量[2]
 *
 * flResetOriginX、flResetOriginY 将指定Z轴的图层的图像原点X、Y轴坐标在指定帧数内渐变到指定的值
 * 参数
 *   Z坐标 - 整数
 *   渐变所需帧数 - 整数或变量
 *   渐变目标值 - 整数或变量
 * 用法示例
 *   flResetOriginX(-1, 600, 200) - 将Z轴为-1的图层的图像原点X坐标在600帧内渐变为200
 *   flResetOriginY(-1, "%1", "%2") - 将Z轴为-1的图层的图像原点Y坐标在变量[1]帧内渐变为变量[2]
 *
 * flPreloadBitmap 预加载指定名字的图像，或者指定名字的图像的另一个色相的图像
 * 参数
 *   位图名字 - 字符串或变量（不带文件后缀）
 *   色相环值 - 整数或变量（0~360）（选填）
 *   位图目录路径 - 字符串或变量（位于img内）（选填）（默认为"parallaxes"）
 * 用法示例
 *   flPreloadBitmap("BlueSky", 180, "parallaxes") - 预加载色相环值为180的"img/parallaxes/BlueSky.png"
 *   flPreloadBitmap("BlueSky") - 预加载"img/parallaxes/BlueSky.png"
 *   flPreloadBitmap("%1", "%2", "%3") - 预加载色相环值为变量[2]的"img/"+变量[3]+"/"+变量[1]+".png"
 *
 * flPreloadBitmapIndex 预加载指定Z轴的图像，或者指定Z轴的图像的另一个色相的图像
 * 参数
 *   Z坐标 - 整数
 *   色相环值 - 整数或变量（0~360）（选填）
 * 用法示例
 *   flPreloadBitmapIndex(-1, 180) - 预加载Z坐标为-1的图层的色相环值为180的位图
 *   flPreloadBitmapIndex(-1, "%1") - 预加载Z坐标为-1的图层的色相环值为变量[1]的位图
 *
 */

(function() {

    // 获取数组序列的反向序列值
    function anti(index, origin) {
        return origin - (index + 1);
    }

    // 各参数默认值
    var Z_DEFAULT = 40001;
    var X_DEFAULT = 0;
    var Y_DEFAULT = 0;
    var SCALE_DEFAULT = 1;
    var SCROLL_DEFAULT = 48;
    var OPACITY_DEFAULT = 255;
    var VISIBLE_DEFAULT = true;
    var PATH_DEFAULT = "parallaxes";
    var LOOPX_DEFAULT = 0;
    var LOOPY_DEFAULT = 0;
    var CX_DEFAULT = 0;
    var CY_DEFAULT = 0;
    //var CW_DEFAULT = lobj.bitmap.width;
    //var CH_DEFAULT = lobj.bitmap.height;
    //var WIDTH_DEFAULT = Layer.cw;
    //var HEIGHT_DEFAULT = Layer.ch;
    var FILL_DEFAULT = false;
    var HUE_DEFAULT = 0;
    var OX_DEFAULT = 0;
    var OY_DEFAULT = 0;

    // 各系统图层默认Z轴
    var Z_PARALLAX = -10000;
    var Z_TILEMAP = 0;
    var Z_CHARACTERS = 10000;
    var Z_SHADOW = 20000;
    var Z_DESTINATION = 30000;
    var Z_WEATHER = 40000;

    // 全局变量
    //FreeLayers; // 从当前地图备注区读取的图层数据
    //FreeLayersSort; // 图层序列组，根据Z轴对当前地图的图层进行排序后形成的索引数组
    FreeLayersCurrentMapId = 0; // 记录当前地图Id，如果游戏跳转后的地图Id和当前Id不同，则刷新图层数据，否则不对数据进行调整
    //FreeLayersObject; // 自由图层的对象表
    //FreeLayersObjectDoInit; // 用于判定下次场景刷新时是否重载对象
    //LastFreeLayersObjectData; // 上一个自由图层的对象数据表

    // 重定义函数：地图场景终止
    var _Scene_Map_Terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {

        // 定义新的数组，记录上次自由图层的对象数据
        LastFreeLayersObjectData = new Array();

        // 读取全局自由图层数据盒子中的数据
        for (var Z_INDEX in FreeLayersObject) { // 记录上次的所有对象的数据

            // 为新的上次自由图层的对象数据组添加子数据组
            LastFreeLayersObjectData[Z_INDEX] = new Array();

            // 遍历全局自由图层数据盒子中的对象，并将对象属性保存在上次自由图层的对象数据组的子数据组中
            for (var ATTR in FreeLayersObject[Z_INDEX]) {

                // 读取全局自由图层数据盒子中的对象的属性，保存到上次自由图层的对象数据组的子数据组中
                // 不保存parent和stage以及function数据，否则会造成数据错误
                // parent和stage数据可以在后续生成TilingSprite时自动添加
                if (ATTR == "parent" || ATTR == "stage" || typeof(FreeLayersObject[Z_INDEX][ATTR]) == "function") { continue; }
                LastFreeLayersObjectData[Z_INDEX][ATTR] = FreeLayersObject[Z_INDEX][ATTR];

            }

        }

        // 调用原始的地图场景终止处理函数
        _Scene_Map_Terminate.call(this);
    }

    // 重定义函数：地图精灵布局初始化
    var _Spriteset_Map_Initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {

        // 判定本次初始化布局的地图与上一次初始化布局的地图是否是同一个
        // 如果不是同一个地图
        if ($gameMap._mapId != FreeLayersCurrentMapId) {

            // 更新缓存，记录当前地图Id用于后续的地图切换判断
            FreeLayersCurrentMapId = $gameMap._mapId;

            // 标记本次需要初始化图层对象数据
            FreeLayersObjectDoInit = true;

            // 创建新的自由图层数据盒子
            // 这个盒子会通过this.readFreeLayer()函数来被重定义为包含了当前地图的所有自由图层数据的数组
            FreeLayers = new Array;
            FreeLayers[Z_PARALLAX] = "Parallax";
            FreeLayers[Z_TILEMAP] = "Tilemap";
            FreeLayers[Z_CHARACTERS] = "Characters";
            FreeLayers[Z_SHADOW] = "Shadow";
            FreeLayers[Z_DESTINATION] = "Destination";
            FreeLayers[Z_WEATHER] = "Weather";

            // 为全局自由图层对象组提前声明数组变量
            FreeLayersObject = new Array();

            // 为本次地图布局添加自由图层对象组
            this.FreeLayersObject = new Array();

            // 读取本地图备注区的自由图层数据并保存到FreeLayers数据组中
            this.readFreeLayer();

        // 如果本次创建布局时的地图与上一个地图是同一个
        } else {

            // 设置跳过本次对象数据重载
            FreeLayersObjectDoInit = false;

            // 为本次地图布局添加自由图层对象组
            this.FreeLayersObject = new Array();

        }

        // 回调原始的本函数
        _Spriteset_Map_Initialize.call(this);

    }

    Spriteset_Map.prototype.readFreeLayer = function() {

        // 如果是相同地图，则不进行数据重置
        if (!FreeLayersObjectDoInit) {
            return;
        }

        // 解析自由图层数据

        // 保存每个自定义图层的数据开始标记行和数据结束标记行的位置

        // 去掉空格，并根据换行符来分割字符串
        var note = $dataMap.note;
        while (note.match(" ")) {
            note = note.replace(" ", "");
        }
        var note = note.split("\n");

        // 建立临时储存开始标记行和结束标记行的数组
        var note_layerBegin = new Array;
        var note_layerEnd = new Array;

        // 遍历备注的每一行，寻找自由图层开始标记和结束标记，并记录他们的行数
        var i = note.length;
        while (i--) {
            var anti_i = anti(i, note.length);
            if (note[anti_i].match("fl=")) {
                note_layerBegin.push(anti_i);
            } else if (note[anti_i].match("\/fl")) {
                note_layerEnd.push(anti_i);
            }
        }

        // 根据开始标记和结束标记，对所有自由图层块进行打包，并保存到新的自由图层数据组中
        var layerBox = new Array();
        var i = note_layerBegin.length;
        while (i--) {
            var anti_i = anti(i, note_layerBegin.length);
            layerBox[anti_i] = "";
            var i2 = note_layerBegin[anti_i];
            for (i2; i2 <= note_layerEnd[anti_i]; i2++) {
                layerBox[anti_i] = layerBox[anti_i] + note[i2] + "\n";
            }
        }

        // 将数据按换行符来切割为多行，并重新保存到当前位置
        var outputLayer = new Array();
        var i = layerBox.length;
        while (i--) {
            var anti_i = anti(i, layerBox.length);
            var outputBoxContent = layerBox[anti_i].split("\n");
            var i2 = outputBoxContent.length;
            while (i2--) {
                anti_i2 = anti(i2, outputBoxContent.length);
                if (outputBoxContent[anti_i2] == "") {
                    outputBoxContent.splice(anti_i2, 1);
                }
            }
            outputLayer[anti_i] = outputBoxContent;
        }

        // 解析多行文本，生成系统可识别的数据
        var layerBox = new Array();
        var i = outputLayer.length;
        while (i--) {
            var anti_i = anti(i, outputLayer.length);
            layerBox[anti_i] = new Array();
            var i2 = outputLayer[anti_i].length;
            while (i2--) {
                var anti_i2 = anti(i2, outputLayer[anti_i].length);
                var currentText = outputLayer[anti_i][anti_i2];
                if (currentText.match("=")) {
                    var startPos = currentText.indexOf("=") + 1;
                    var endPos = currentText.indexOf(">");
                    layerBox[anti_i]["name"] = currentText.substring(startPos, endPos);
                } else if (currentText.match(":")) {
                    var startPos_name = 0;
                    var endPos_name = currentText.indexOf(":");
                    var startPos_value = currentText.indexOf(":") + 1;
                    var endPos_value = currentText.length;
                    layerBox[anti_i][currentText.substring(startPos_name, endPos_name)] = currentText.substring(startPos_value, endPos_value);
                }
            }

            // 识别文本数据，为缺失的数据添加默认数据
            if (layerBox[anti_i].z == null || layerBox[anti_i].z == "") {
                layerBox[anti_i].z = Z_DEFAULT;
            }
            if (layerBox[anti_i].x == null || layerBox[anti_i].x == "") {
                layerBox[anti_i].x = X_DEFAULT;
            }
            if (layerBox[anti_i].y == null || layerBox[anti_i].y == "") {
                layerBox[anti_i].y = Y_DEFAULT;
            }
            if (layerBox[anti_i].scalex == null || layerBox[anti_i].scalex == "") {
                if (layerBox[anti_i].scale == null || layerBox[anti_i].scale == "") {
                    layerBox[anti_i].scalex = SCALE_DEFAULT;
                } else {
                    layerBox[anti_i].scalex = layerBox[anti_i].scale;
                }
            }
            if (layerBox[anti_i].scaley == null || layerBox[anti_i].scaley == "") {
                if (layerBox[anti_i].scale == null || layerBox[anti_i].scale == "") {
                    layerBox[anti_i].scaley = SCALE_DEFAULT;
                } else {
                    layerBox[anti_i].scaley = layerBox[anti_i].scale;
                }
            }
            if (layerBox[anti_i].scrollx == null || layerBox[anti_i].scrollx == "") {
                if (layerBox[anti_i].scroll == null || layerBox[anti_i].scroll == "") {
                    layerBox[anti_i].scrollx = SCROLL_DEFAULT;
                } else {
                    layerBox[anti_i].scrollx = layerBox[anti_i].scroll;
                }
            }
            if (layerBox[anti_i].scrolly == null || layerBox[anti_i].scrolly == "") {
                if (layerBox[anti_i].scroll == null || layerBox[anti_i].scroll == "") {
                    layerBox[anti_i].scrolly = SCROLL_DEFAULT;
                } else {
                    layerBox[anti_i].scrolly = layerBox[anti_i].scroll;
                }
            }
            if (layerBox[anti_i].opacity == null || layerBox[anti_i].opacity == "") {
                layerBox[anti_i].opacity = OPACITY_DEFAULT;
            }
            if (layerBox[anti_i].visible == null || layerBox[anti_i].visible == "") {
                layerBox[anti_i].visible = VISIBLE_DEFAULT;
            } else {
                if (layerBox[anti_i].visible != "false") {
                    layerBox[anti_i].visible = true;
                } else {
                    layerBox[anti_i].visible = false;
                }
            }
            if (layerBox[anti_i].path == null || layerBox[anti_i].pah == "") {
                layerBox[anti_i].path = PATH_DEFAULT;
            }
            if (layerBox[anti_i].loopx == null || layerBox[anti_i].loopx == "") {
                layerBox[anti_i].loopx = LOOPX_DEFAULT;
            }
            if (layerBox[anti_i].loopy == null || layerBox[anti_i].loopy == "") {
                layerBox[anti_i].loopy = LOOPY_DEFAULT;
            }
            if (layerBox[anti_i].cx == null || layerBox[anti_i].cx == "") {
                layerBox[anti_i].cx = CX_DEFAULT;
            }
            if (layerBox[anti_i].cy == null || layerBox[anti_i].cy == "") {
                layerBox[anti_i].cy = CY_DEFAULT;
            }
            if (layerBox[anti_i].cw == null || layerBox[anti_i].cw == "") {
                layerBox[anti_i].cw = "BITMAP_WIDTH";
            }
            if (layerBox[anti_i].ch == null || layerBox[anti_i].ch == "") {
                layerBox[anti_i].ch = "BITMAP_HEIGHT";
            }
            if (layerBox[anti_i].width == null || layerBox[anti_i].width == "") {
                layerBox[anti_i].width = layerBox[anti_i].cw;
            }
            if (layerBox[anti_i].height == null || layerBox[anti_i].height == "") {
                layerBox[anti_i].height = layerBox[anti_i].ch;
            }
            if (layerBox[anti_i].fill == "true") {
                layerBox[anti_i].fill = true;
            } else {
                layerBox[anti_i].fill = FILL_DEFAULT;
            }
            if (typeof(layerBox[anti_i].hue) != "string") {
                layerBox[anti_i].hue = HUE_DEFAULT;
            }
            if (typeof(layerBox[anti_i].ox) != "string") {
                layerBox[anti_i].ox = OX_DEFAULT;
            }
            if (typeof(layerBox[anti_i].oy) != "string") {
                layerBox[anti_i].oy = OY_DEFAULT;
            }

            // 将数字类数据从文本转换为数字
            layerBox[anti_i].z = parseInt(layerBox[anti_i].z, 10);
            layerBox[anti_i].x = parseInt(layerBox[anti_i].x, 10);
            layerBox[anti_i].y = parseInt(layerBox[anti_i].y, 10);
            layerBox[anti_i].scalex = parseFloat(layerBox[anti_i].scalex);
            layerBox[anti_i].scaley = parseFloat(layerBox[anti_i].scaley);
            layerBox[anti_i].scrollx = parseInt(layerBox[anti_i].scrollx, 10);
            layerBox[anti_i].scrolly = parseInt(layerBox[anti_i].scrolly, 10);
            layerBox[anti_i].opacity = parseInt(layerBox[anti_i].opacity, 10);
            layerBox[anti_i].loopx = parseInt(layerBox[anti_i].loopx, 10);
            layerBox[anti_i].loopy = parseInt(layerBox[anti_i].loopy, 10);
            layerBox[anti_i].cx = parseInt(layerBox[anti_i].cx, 10);
            layerBox[anti_i].cy = parseInt(layerBox[anti_i].cy, 10);
            if (layerBox[anti_i].cw != "BITMAP_WIDTH") {
                layerBox[anti_i].cw = parseInt(layerBox[anti_i].cw, 10);
            }
            if (layerBox[anti_i].ch != "BITMAP_HEIGHT") {
                layerBox[anti_i].ch = parseInt(layerBox[anti_i].ch, 10);
            }
            if (layerBox[anti_i].width != "BITMAP_WIDTH") {
                layerBox[anti_i].width = parseInt(layerBox[anti_i].width, 10);
            }
            if (layerBox[anti_i].height != "BITMAP_HEIGHT") {
                layerBox[anti_i].height = parseInt(layerBox[anti_i].height, 10);
            }
            layerBox[anti_i].hue = parseInt(layerBox[anti_i].hue, 10);
            layerBox[anti_i].ox = parseInt(layerBox[anti_i].ox, 10);
            layerBox[anti_i].oy = parseInt(layerBox[anti_i].oy, 10);
        }

        // 将转换后的系统数据打包到FreeLayers全局数据组中
        var i = layerBox.length;
        var min = Z_PARALLAX;
        var max = Z_WEATHER;
        while (i--) {
            var Z_INDEX = layerBox[i].z;
            if (Z_INDEX > max) {
                max = Z_INDEX;
            }
            if (Z_INDEX < min) {
                min = Z_INDEX;
            }
            FreeLayers[Z_INDEX] = layerBox[i];
        }

        // 按照Z轴对原有数据组进行排序
        FreeLayersSort = new Array();
        FreeLayersSort.count = 0;
        var i = min - 1;
        while (++i <= max) {
            if (FreeLayers[i] || i == -10000 || i == 0 || i == 10000 || i == 20000 || i == 30000 || i == 40000) {
                FreeLayersSort[++FreeLayersSort.count] = i;
            }
        }
    }

    // 为精灵布局类添加创建自由图层功能
    Spriteset_Map.prototype.createFreeLayer = function(Z_INDEX) {

        // 如果传入的Z轴是系统的Z轴，则对应创建系统层

        if (Z_INDEX == Z_PARALLAX) {
            this.createParallax();
            return;
        }
        else if (Z_INDEX == Z_TILEMAP) {
            this.createTilemap();
            return;
        }
        else if (Z_INDEX == Z_CHARACTERS) {
            this.createCharacters();
            return;
        }
        else if (Z_INDEX == Z_SHADOW) {
            this.createShadow();
            return;
        }
        else if (Z_INDEX == Z_DESTINATION) {
            this.createDestination();
            return;
        }
        else if (Z_INDEX == Z_WEATHER) {
            this.createWeather();
            return;
        }

        // 如果传入的Z轴是自由图层，则对应创建自由图层

        // 判定本图层是否有指定初始图像名
        // 如果没有，则直接忽视所有后续逻辑
        if (FreeLayers[Z_INDEX].name == null) { return; }

        // 为当前Z轴创建一个自动填充的精灵对象
        this.FreeLayersObject[Z_INDEX] = new TilingSprite();

        // 根据Z轴所处的区域，确定其本身是否自带Z轴属性
        if (Z_INDEX < Z_PARALLAX) {
        } else if (Z_PARALLAX < Z_INDEX && Z_INDEX < Z_TILEMAP) {
        } else if (Z_TILEMAP < Z_INDEX && Z_INDEX < Z_CHARACTERS) {
            this.FreeLayersObject[Z_INDEX].z = 3;
        } else if (Z_CHARACTERS < Z_INDEX && Z_INDEX < Z_SHADOW) {
            this.FreeLayersObject[Z_INDEX].z = 5;
        } else if (Z_SHADOW < Z_INDEX && Z_INDEX < Z_DESTINATION) {
            this.FreeLayersObject[Z_INDEX].z = 7;
        } else if (Z_DESTINATION < Z_INDEX && Z_INDEX < Z_WEATHER) {
            this.FreeLayersObject[Z_INDEX].z = 10;
        } else if (Z_WEATHER < Z_INDEX) {
        }

        // 判断Z轴所处区域，确定当前对象的附属基本图层
        if (Z_INDEX < Z_PARALLAX) {
            this._baseSprite.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_PARALLAX < Z_INDEX && Z_INDEX < Z_TILEMAP) {
            this._baseSprite.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_TILEMAP < Z_INDEX && Z_INDEX < Z_CHARACTERS) {
            this._tilemap.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_CHARACTERS < Z_INDEX && Z_INDEX < Z_SHADOW) {
            this._tilemap.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_SHADOW < Z_INDEX && Z_INDEX < Z_DESTINATION) {
            this._tilemap.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_DESTINATION < Z_INDEX && Z_INDEX < Z_WEATHER) {
            this._tilemap.addChild(this.FreeLayersObject[Z_INDEX]);
        } else if (Z_WEATHER < Z_INDEX) {
            this.addChild(this.FreeLayersObject[Z_INDEX]);
        }

        // 如果本次会初始化对象数据，则为其创建一个新的位图
        if (FreeLayersObjectDoInit && FreeLayers[Z_INDEX].name) {
            this.FreeLayersObject[Z_INDEX].bitmap = ImageManager.loadBitmap("img/" + FreeLayers[Z_INDEX].path + "/", FreeLayers[Z_INDEX].name, FreeLayers[Z_INDEX].hue);
        }

        // 将当前对象同步记录到全局自由图层对象索引组中
        FreeLayersObject[Z_INDEX] = this.FreeLayersObject[Z_INDEX];

        // 设置当前对象的初始化判定值为0
        this.FreeLayersObject[Z_INDEX].inited = 0;

    }

    Spriteset_Map.prototype.updateFreeLayer = function(Z_INDEX) {

        // ###################################
        // 对原始图层的的更新逻辑
        // ###################################

        if (Z_INDEX == Z_PARALLAX) { this.updateParallax(); return; }
        else if (Z_INDEX == Z_TILEMAP) { this.updateTilemap(); return; }
        else if (Z_INDEX == Z_CHARACTERS) { return; }
        else if (Z_INDEX == Z_SHADOW) { this.updateShadow(); return; }
        else if (Z_INDEX == Z_DESTINATION) { return; }
        else if (Z_INDEX == Z_WEATHER) { this.updateWeather(); return; }

        // ###################################
        // 对自由图像的初始化逻辑
        // ###################################

        // 延迟设置位图属性，修复由于RMMV或者PIXI的机制导致的位图加载后无法立即读取属性的BUG

        // 判定本图层是否有指定初始图像名
        // 如果没有，则直接忽视所有后续逻辑
        if (FreeLayers[Z_INDEX].name == null) { return; }

        // 判定是否已初始化
        if (this.FreeLayersObject[Z_INDEX].inited <= 1) {

            // 是否已等待2帧
            if (this.FreeLayersObject[Z_INDEX].inited == 1) {

                // 判定是否执行数据初始化
                // 如果本次执行初始化
                if (FreeLayersObjectDoInit) {

                    // 判定获取默认截取内容宽度
                    if (FreeLayers[Z_INDEX].cw == "BITMAP_WIDTH") {
                        FreeLayers[Z_INDEX].cw = this.FreeLayersObject[Z_INDEX].bitmap.width;
                    }
                    // 判定获取默认截取内容高度
                    if (FreeLayers[Z_INDEX].ch == "BITMAP_HEIGHT") {
                        FreeLayers[Z_INDEX].ch = this.FreeLayersObject[Z_INDEX].bitmap.height;
                    }
                    // 判定获取默认位图宽度
                    if (FreeLayers[Z_INDEX].width == "BITMAP_WIDTH") {
                        FreeLayers[Z_INDEX].width = this.FreeLayersObject[Z_INDEX].bitmap.width;
                    }
                    // 判定获取默认位图高度
                    if (FreeLayers[Z_INDEX].height == "BITMAP_HEIGHT") {
                        FreeLayers[Z_INDEX].height = this.FreeLayersObject[Z_INDEX].bitmap.height;
                    }

                    // 获取偏移距离，这个距离用于修复画面抖动时有黑边的BUG
                    this.FreeLayersObject[Z_INDEX].offsetX = 0;
                    while (this.FreeLayersObject[Z_INDEX].offsetX < Graphics.width) {
                        this.FreeLayersObject[Z_INDEX].offsetX += FreeLayers[Z_INDEX].cw * FreeLayers[Z_INDEX].scalex;
                    }
                    this.FreeLayersObject[Z_INDEX].offsetY = 0;
                    while (this.FreeLayersObject[Z_INDEX].offsetY < Graphics.height) {
                        this.FreeLayersObject[Z_INDEX].offsetY += FreeLayers[Z_INDEX].ch * FreeLayers[Z_INDEX].scaley;
                    }

                    // 设置截取内容的框架矩形
                    this.FreeLayersObject[Z_INDEX].setFrame(FreeLayers[Z_INDEX].cx, FreeLayers[Z_INDEX].cy,
                                                            FreeLayers[Z_INDEX].cw, FreeLayers[Z_INDEX].ch);

                    // 判定是否为自动填充的图像
                    // 如果不是自动填充，则不执行黑边自动修正BUG修复数据设定
                    // 如果是，则执行
                    if (!FreeLayers[Z_INDEX].fill) {
                        this.FreeLayersObject[Z_INDEX].move(FreeLayers[Z_INDEX].x, FreeLayers[Z_INDEX].y, FreeLayers[Z_INDEX].width, FreeLayers[Z_INDEX].height);
                    } else {
                        this.FreeLayersObject[Z_INDEX].move(FreeLayers[Z_INDEX].x - this.FreeLayersObject[Z_INDEX].offsetX, FreeLayers[Z_INDEX].y - this.FreeLayersObject[Z_INDEX].offsetY, FreeLayers[Z_INDEX].width * ($gameMap.tileWidth() * $dataMap.width / FreeLayers[Z_INDEX].cw) + this.FreeLayersObject[Z_INDEX].offsetX * 2, FreeLayers[Z_INDEX].height * ($gameMap.tileHeight() * $dataMap.height / FreeLayers[Z_INDEX].ch) + this.FreeLayersObject[Z_INDEX].offsetY * 2);
                    }

                    // 设置放大尺寸、随地图卷动速度、透明度及是否可见、原始色相环属性
                    this.FreeLayersObject[Z_INDEX].scale.x  = FreeLayers[Z_INDEX].scalex;
                    this.FreeLayersObject[Z_INDEX].scale.y  = FreeLayers[Z_INDEX].scaley;
                    this.FreeLayersObject[Z_INDEX].scrollx  = FreeLayers[Z_INDEX].scrollx;
                    this.FreeLayersObject[Z_INDEX].scrolly  = FreeLayers[Z_INDEX].scrolly;
                    this.FreeLayersObject[Z_INDEX].opacity  = FreeLayers[Z_INDEX].opacity;
                    this.FreeLayersObject[Z_INDEX].visible  = FreeLayers[Z_INDEX].visible;
                    this.FreeLayersObject[Z_INDEX].hue      = FreeLayers[Z_INDEX].hue;
                    this.FreeLayersObject[Z_INDEX].origin.x = FreeLayers[Z_INDEX].ox;
                    this.FreeLayersObject[Z_INDEX].origin.y = FreeLayers[Z_INDEX].oy;
                    this.FreeLayersObject[Z_INDEX].origin.beforex = 0;
                    this.FreeLayersObject[Z_INDEX].origin.beforey = 0;

                // 如果本次不执行初始化
                } else if (!FreeLayersObjectDoInit) {

                    // 读取上一次保存的图层对象数据，并全部储存到本次图层中
                    for (ATTR in LastFreeLayersObjectData[Z_INDEX]) {
                        this.FreeLayersObject[Z_INDEX][ATTR] = LastFreeLayersObjectData[Z_INDEX][ATTR];
                    }

                    // 将图层数据保存在全局对象盒子中
                    FreeLayersObject[Z_INDEX] = this.FreeLayersObject[Z_INDEX];

                }

            }

            // 增加跳过的帧数
            this.FreeLayersObject[Z_INDEX].inited++;

            // 在完成初始化之前，不执行后续逻辑
            return;

        }

        // ###################################
        // 对自由图像的更新逻辑
        // 如果当前传递进的Z轴对应的对象有图像，则执行本段逻辑，否则跳过
        // ###################################

        if (this.FreeLayersObject[Z_INDEX].bitmap) {

            // ===================================
            // 执行数据渐变
            // ===================================

            // -----------------------------------
            // Opacity
            // -----------------------------------

            // 如果Opacity的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].opacityresetduration) {

                // 对原有Opacity的值按照渐变速度渐变
                FreeLayers[Z_INDEX].opacity += FreeLayers[Z_INDEX].opacityresetspeed;

                // 对Opacity渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].opacityresetduration) {

                    // 准确设置Opacity的值为预定的目标值
                    FreeLayers[Z_INDEX].opacity = FreeLayers[Z_INDEX].opacityresetaim;

                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].opacityresetspeed = 0;
                    FreeLayers[Z_INDEX].opacityresetaim = 0;

                }

            }

            // -----------------------------------
            // X、Y
            // -----------------------------------

            // 如果X的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].xresetduration) {
                // 对原有X的值按照渐变速度渐变
                FreeLayers[Z_INDEX].x += FreeLayers[Z_INDEX].xresetspeed;
                // 对X渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].xresetduration) {
                    // 准确设置X的值为预定的目标值
                    FreeLayers[Z_INDEX].x = FreeLayers[Z_INDEX].xresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].xresetspeed = 0;
                    FreeLayers[Z_INDEX].xresetaim = 0;
                }
            }

            // 如果Y的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].yresetduration) {
                // 对原有Y的值按照渐变速度渐变
                FreeLayers[Z_INDEX].y += FreeLayers[Z_INDEX].yresetspeed;
                // 对Y渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].yresetduration) {
                    // 准确设置Y的值为预定的目标值
                    FreeLayers[Z_INDEX].y = FreeLayers[Z_INDEX].yresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].yresetspeed = 0;
                    FreeLayers[Z_INDEX].yresetaim = 0;
                }
            }

            // -----------------------------------
            // OriginX、OriginY
            // -----------------------------------

            // 如果OriginX的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].originxresetduration) {
                // 对原有OriginX的值按照渐变速度渐变
                FreeLayers[Z_INDEX].ox += FreeLayers[Z_INDEX].originxresetspeed;
                // 对OriginX渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].originxresetduration) {
                    // 准确设置OriginX的值为预定的目标值
                    FreeLayers[Z_INDEX].ox = FreeLayers[Z_INDEX].originxresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].originxresetspeed = 0;
                    FreeLayers[Z_INDEX].originxresetaim = 0;
                }
            }

            // 如果OriginY的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].originyresetduration) {
                // 对原有OriginY的值按照渐变速度渐变
                FreeLayers[Z_INDEX].oy += FreeLayers[Z_INDEX].originyresetspeed;
                // 对OriginY渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].originyresetduration) {
                    // 准确设置OriginY的值为预定的目标值
                    FreeLayers[Z_INDEX].oy = FreeLayers[Z_INDEX].originyresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].originyresetspeed = 0;
                    FreeLayers[Z_INDEX].originyresetaim = 0;
                }
            }

            // -----------------------------------
            // LoopX、LoopY
            // -----------------------------------

            // 如果LoopX的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].loopxresetduration) {
                // 对原有LoopX的值按照渐变速度渐变
                FreeLayers[Z_INDEX].loopx += FreeLayers[Z_INDEX].loopxresetspeed;
                // 对LoopX渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].loopxresetduration) {
                    // 准确设置LoopX的值为预定的目标值
                    FreeLayers[Z_INDEX].loopx = FreeLayers[Z_INDEX].loopxresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].loopxresetspeed = 0;
                    FreeLayers[Z_INDEX].loopxresetaim = 0;
                }
            }

            // 如果LoopY的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].loopyresetduration) {
                // 对原有LoopY的值按照渐变速度渐变
                FreeLayers[Z_INDEX].loopy += FreeLayers[Z_INDEX].loopyresetspeed;
                // 对LoopY渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].loopyresetduration) {
                    // 准确设置LoopY的值为预定的目标值
                    FreeLayers[Z_INDEX].loopy = FreeLayers[Z_INDEX].loopyresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].loopyresetspeed = 0;
                    FreeLayers[Z_INDEX].loopyresetaim = 0;
                }
            }

            // -----------------------------------
            // ScaleX, ScaleY
            // -----------------------------------

            // 如果ScaleX的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].scalexresetduration) {
                // 对原有ScaleX的值按照渐变速度渐变
                FreeLayers[Z_INDEX].scalex += FreeLayers[Z_INDEX].scalexresetspeed;
                // 对ScaleX渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].scalexresetduration) {
                    // 准确设置scalex的值为预定的目标值
                    FreeLayers[Z_INDEX].scalex = FreeLayers[Z_INDEX].scalexresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].scalexresetspeed = 0;
                    FreeLayers[Z_INDEX].scalexresetaim = 0;
                }
            }

            // 如果ScaleY的速度渐变持续时间未到0
            if (FreeLayers[Z_INDEX].scaleyresetduration) {
                // 对原有ScaleY的值按照渐变速度渐变
                FreeLayers[Z_INDEX].scaley += FreeLayers[Z_INDEX].scaleyresetspeed;
                // 对ScaleY渐变持续时间执行自减，并判定是否已经到0
                if (!--FreeLayers[Z_INDEX].scaleyresetduration) {
                    // 准确设置scaleY的值为预定的目标值
                    FreeLayers[Z_INDEX].scaley = FreeLayers[Z_INDEX].scaleyresetaim;
                    // 重置渐变速度和渐变目标值
                    FreeLayers[Z_INDEX].scaleyresetspeed = 0;
                    FreeLayers[Z_INDEX].scaleyresetaim = 0;
                }
            }

            // ===================================
            // 更新对象本体数据
            // ===================================

            // -----------------------------------
            // X, Y
            // -----------------------------------

            // 如果当前Z轴对应的对象不自动填充图像
            if (!FreeLayers[Z_INDEX].fill) {
                // 按照正常位移公式进行移动计算
                this.FreeLayersObject[Z_INDEX].x = $gameMap.displayX() * FreeLayers[Z_INDEX].scrollx * -1 + FreeLayers[Z_INDEX].x;
                this.FreeLayersObject[Z_INDEX].y = $gameMap.displayY() * FreeLayers[Z_INDEX].scrolly * -1 + FreeLayers[Z_INDEX].y;
            // 如果当前Z轴对应的对象会自动填充图像
            } else {
                // 在正常位移公式的基础上减去坐标轴偏移值
                this.FreeLayersObject[Z_INDEX].x = $gameMap.displayX() * FreeLayers[Z_INDEX].scrollx * -1 + FreeLayers[Z_INDEX].x - this.FreeLayersObject[Z_INDEX].offsetX;
                this.FreeLayersObject[Z_INDEX].y = $gameMap.displayY() * FreeLayers[Z_INDEX].scrolly * -1 + FreeLayers[Z_INDEX].y - this.FreeLayersObject[Z_INDEX].offsetY;
            }

            // -----------------------------------
            // OriginX, OriginY ([LoopX][, LoopY])
            // 设置对象原点坐标，从而执行图像内容的更换
            // -----------------------------------

            // 设置图像原点坐标，执行X轴滚动
            this.FreeLayersObject[Z_INDEX].origin.beforex += FreeLayers[Z_INDEX].loopx / 48 / 2 * -1;
            this.FreeLayersObject[Z_INDEX].origin.x = this.FreeLayersObject[Z_INDEX].origin.beforex + FreeLayers[Z_INDEX].ox;
            // 设置图像原点坐标，执行Y轴滚动
            this.FreeLayersObject[Z_INDEX].origin.beforey += FreeLayers[Z_INDEX].loopy / 48 / 2 * -1;
            this.FreeLayersObject[Z_INDEX].origin.y = this.FreeLayersObject[Z_INDEX].origin.beforey + FreeLayers[Z_INDEX].oy;

            // -----------------------------------
            // ScaleX, ScaleY
            // -----------------------------------

            // 更新传入Z轴对应对象的尺寸缩放
            this.FreeLayersObject[Z_INDEX].scale.x = FreeLayers[Z_INDEX].scalex;
            this.FreeLayersObject[Z_INDEX].scale.y = FreeLayers[Z_INDEX].scaley;

            // -----------------------------------
            // Opacity
            // -----------------------------------

            // 更新传入Z轴对应对象的不透明度
            this.FreeLayersObject[Z_INDEX].opacity = FreeLayers[Z_INDEX].opacity;

            // -----------------------------------
            // Visible
            // -----------------------------------

            this.FreeLayersObject[Z_INDEX].visible = FreeLayers[Z_INDEX].visible;

        }

    }

    Spriteset_Map.prototype.createLowerLayer = function() {
        Spriteset_Base.prototype.createLowerLayer.call(this);
        for (var i = 1; i <= FreeLayersSort.count; i++) {
            this.createFreeLayer(FreeLayersSort[i]);
        }
    };

    Spriteset_Map.prototype.update = function() {
        Spriteset_Base.prototype.update.call(this);
        this.updateTileset();
        for (var i = 1; i <= FreeLayersSort.count; i++) {
            this.updateFreeLayer(FreeLayersSort[i]);
        }
    };

    // 自定义脚本公用函数块

    // 检查特殊属性，并为之执行特别的逻辑
    var flCommonCheckAttr = function(Z_INDEX, attr) {

        // 色相环与位图地址变动
        // 如果玩家修改了色相环或位图地址，则立即重载位图
        if (attr == "hue" || attr == "name" || attr == "path") {
            SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].bitmap = ImageManager.loadBitmap("img/" + FreeLayers[Z_INDEX].path + "/", FreeLayers[Z_INDEX].name, FreeLayers[Z_INDEX].hue);
            SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].hue = FreeLayers[Z_INDEX].hue;

        // 填充模式变动
        // 如果玩家修改了自动填充属性，则立即重设图像显示区域
        } else if (attr == "fill" || attr == "x" || attr == "y" || attr == "width" || attr == "height") {
            if (!FreeLayers[Z_INDEX].fill) {
                SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].move(FreeLayers[Z_INDEX].x, FreeLayers[Z_INDEX].y, FreeLayers[Z_INDEX].width, FreeLayers[Z_INDEX].height);
            } else {
                SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].move(FreeLayers[Z_INDEX].x - SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].offsetX, FreeLayers[Z_INDEX].y - SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].offsetY, FreeLayers[Z_INDEX].width * ($gameMap.tileWidth() * $dataMap.width / FreeLayers[Z_INDEX].cw) + SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].offsetX * 2, FreeLayers[Z_INDEX].height * ($gameMap.tileHeight() * $dataMap.height / FreeLayers[Z_INDEX].ch) + SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].offsetY * 2);
            }

        // 原始图的截取内容区域变动
        } else if (attr == "cx" || attr == "cy" || attr == "cw" || attr == "ch") {
            SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].bitmap = null;
            SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].bitmap = ImageManager.loadBitmap("img/" + FreeLayers[Z_INDEX].path + "/", FreeLayers[Z_INDEX].name, FreeLayers[Z_INDEX].hue);
            SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].setFrame(FreeLayers[Z_INDEX].cx, FreeLayers[Z_INDEX].cy, FreeLayers[Z_INDEX].cw, FreeLayers[Z_INDEX].ch);
        }
    }

    // 检查传入的值是否是变量
    var flCommonCheckVar = function(Z_INDEX, attr, value) {
        if (typeof(value) == "string" && value.match("%")) {
            value = value.match(/\d+/)[0];
            if (Z_INDEX != null) {
                return typeof(FreeLayers[Z_INDEX][attr]) == "boolean" ? $gameSwitches._data[value] : $gameVariables._data[value];
            } else {
                return $gameVariables._data[value];
            }
        } else {
            return value;
        }
    }

    // 插件提供的自定义脚本

    // 立即重设任意属性
    flSetData = function(Z_INDEX, attr, value) {
        // 判断传入的值是否是变量
        attr = flCommonCheckVar(Z_INDEX, "attr", attr);
        value = flCommonCheckVar(Z_INDEX, "value", value);

        // 设置自定义图层原始数据
        FreeLayers[Z_INDEX][attr] = value;

        // 检查特殊属性，并为之执行特别的逻辑
        flCommonCheckAttr(Z_INDEX, attr);
    }

    // 立即重设内容截取区域
    flSetContentRect = function(Z_INDEX, cx, cy, cw, ch) {
        // 判断传入的值是否是变量
        cx = flCommonCheckVar(Z_INDEX, "cx", cx);
        cy = flCommonCheckVar(Z_INDEX, "cy", cy);
        cw = flCommonCheckVar(Z_INDEX, "cw", cw);
        ch = flCommonCheckVar(Z_INDEX, "ch", ch);

        // 设置自定义图层原始数据
        FreeLayers[Z_INDEX].cx = cx;
        FreeLayers[Z_INDEX].cy = cy == null ? FreeLayers[Z_INDEX].cy : cy;
        FreeLayers[Z_INDEX].cw = cw == null ? FreeLayers[Z_INDEX].cw : cw;
        FreeLayers[Z_INDEX].ch = ch == null ? FreeLayers[Z_INDEX].ch : ch;

        // 重设截取的原图像的区域
        SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].bitmap = null;
        SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].bitmap = ImageManager.loadBitmap("img/" + FreeLayers[Z_INDEX].path + "/", FreeLayers[Z_INDEX].name, FreeLayers[Z_INDEX].hue);
        SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].setFrame(cx, cy, cw, ch);
    }

    // 立即重设图像在游戏中的显示区域/位置
    flSetShowRect = function(Z_INDEX, x, y, width, height) {
        // 判断传入的值是否是变量
        x = flCommonCheckVar(Z_INDEX, "x", x);
        y = flCommonCheckVar(Z_INDEX, "y", y);
        width = flCommonCheckVar(Z_INDEX, "width", width);
        height = flCommonCheckVar(Z_INDEX, "height", height);

        // 重设截取的原图像的显示区域的本体属性值
        FreeLayers[Z_INDEX].x = x;
        FreeLayers[Z_INDEX].y = y;
        FreeLayers[Z_INDEX].width = width;
        FreeLayers[Z_INDEX].height = height;

        // 重设对象值
        flCommonCheckAttr(Z_INDEX, "x");
    }

    // 将指定Z轴的图层将X轴滚动速度在指定帧数内渐变到指定的值
    flResetLoopX = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (FreeLayers[Z_INDEX].loopx != Aim) {
            FreeLayers[Z_INDEX].loopxresetaim = Aim;
            FreeLayers[Z_INDEX].loopxresetduration = FrameDuration;
            FreeLayers[Z_INDEX].loopxresetspeed = (Aim - FreeLayers[Z_INDEX].loopx) / FreeLayers[Z_INDEX].loopxresetduration;
        }
    }

    // 将指定Z轴的图层将Y轴滚动速度在指定帧数内渐变到指定的值
    flResetLoopY = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (FreeLayers[Z_INDEX].loopy != Aim) {
            FreeLayers[Z_INDEX].loopyresetaim = Aim;
            FreeLayers[Z_INDEX].loopyresetduration = FrameDuration;
            FreeLayers[Z_INDEX].loopyresetspeed = (Aim - FreeLayers[Z_INDEX].loopy) / FreeLayers[Z_INDEX].loopyresetduration;
        }
    }

    // 将指定Z轴的图层的不透明度（可见度）在指定帧数内渐变到指定的值
    flResetOpacity = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].opacity != Aim) {
            FreeLayers[Z_INDEX].opacityresetaim = Aim;
            FreeLayers[Z_INDEX].opacityresetduration = FrameDuration;
            FreeLayers[Z_INDEX].opacityresetspeed = (Aim - FreeLayers[Z_INDEX].opacity) / FreeLayers[Z_INDEX].opacityresetduration;
        }
    }

    // 将指定Z轴的图层的尺寸在指定帧数内渐变到指定的值
    flResetScale = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        flResetScaleX(Z_INDEX, FrameDuration, Aim);
        flResetScaleY(Z_INDEX, FrameDuration, Aim);
    }

    // 将指定Z轴的图层的横向尺寸在指定帧数内渐变到指定的值
    flResetScaleX = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].scale.x != Aim) {
            FreeLayers[Z_INDEX].scalexresetaim = Aim;
            FreeLayers[Z_INDEX].scalexresetduration = FrameDuration;
            FreeLayers[Z_INDEX].scalexresetspeed = (Aim - FreeLayers[Z_INDEX].scalex) / FreeLayers[Z_INDEX].scalexresetduration;
        }
    }

    // 将指定Z轴的图层的纵向尺寸在指定帧数内渐变到指定的值
    flResetScaleY = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].scale.y != Aim) {
            FreeLayers[Z_INDEX].scaleyresetaim = Aim;
            FreeLayers[Z_INDEX].scaleyresetduration = FrameDuration;
            FreeLayers[Z_INDEX].scaleyresetspeed = (Aim - FreeLayers[Z_INDEX].scaley) / FreeLayers[Z_INDEX].scaleyresetduration;
        }
    }

    // 将指定Z轴的图层的X轴坐标在指定帧数内渐变到指定的值
    flResetX = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].x != Aim) {
            FreeLayers[Z_INDEX].xresetaim = Aim;
            FreeLayers[Z_INDEX].xresetduration = FrameDuration;
            FreeLayers[Z_INDEX].xresetspeed = (Aim - FreeLayers[Z_INDEX].x) / FreeLayers[Z_INDEX].xresetduration;
        }
    }

    // 将指定Z轴的图层的Y轴坐标在指定帧数内渐变到指定的值
    flResetY = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].y != Aim) {
            FreeLayers[Z_INDEX].yresetaim = Aim;
            FreeLayers[Z_INDEX].yresetduration = FrameDuration;
            FreeLayers[Z_INDEX].yresetspeed = (Aim - FreeLayers[Z_INDEX].y) / FreeLayers[Z_INDEX].yresetduration;
        }
    }

    // 将指定Z轴的图层的图像原点X轴坐标在指定帧数内渐变到指定的值
    flResetOriginX = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].origin.x != Aim) {
            FreeLayers[Z_INDEX].originxresetaim = Aim;
            FreeLayers[Z_INDEX].originxresetduration = FrameDuration;
            FreeLayers[Z_INDEX].originxresetspeed = (Aim - FreeLayers[Z_INDEX].ox) / FreeLayers[Z_INDEX].originxresetduration;
        }
    }

    // 将指定Z轴的图层的图像原点Y轴坐标在指定帧数内渐变到指定的值
    flResetOriginY = function(Z_INDEX, FrameDuration, Aim) {
        // 判断传入的值是否是变量
        FrameDuration = flCommonCheckVar(Z_INDEX, "FrameDuration", FrameDuration);
        Aim = flCommonCheckVar(Z_INDEX, "Aim", Aim);

        if (SceneManager._scene._spriteset.FreeLayersObject[Z_INDEX].origin.y != Aim) {
            FreeLayers[Z_INDEX].originyresetaim = Aim;
            FreeLayers[Z_INDEX].originyresetduration = FrameDuration;
            FreeLayers[Z_INDEX].originyresetspeed = (Aim - FreeLayers[Z_INDEX].oy) / FreeLayers[Z_INDEX].originyresetduration;
        }
    }

    // 预加载指定名字的图像，或者指定名字的图像的另一个色相的图像
    flPreloadBitmap = function(name, hue, path) {
        // 判断传入的值是否是变量
        name = flCommonCheckVar(null, "name", name);
        hue = flCommonCheckVar(null, "hue", hue);
        path = flCommonCheckVar(null, "path", path);

        if (path == null) {
            path = PATH_DEFAULT;
        }
        ImageManager.loadBitmap("img/" + path + "/", name, hue);
    }

    // 预加载指定Z轴的图像，或者指定Z轴的图像的另一个色相的图像
    flPreloadBitmapIndex = function(Z_INDEX, hue) {
        // 判断传入的值是否是变量
        hue = flCommonCheckVar(Z_INDEX, "hue", hue);

        ImageManager.loadBitmap("img/" + FreeLayers[Z_INDEX].path + "/", FreeLayers[Z_INDEX].name, hue);
    }

})();
