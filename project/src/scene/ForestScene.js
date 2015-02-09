/**
 * Created by a4515_000 on 2015/2/4.
 */
var ForestBgSprite = cc.Sprite.extend({
    ctor:function() {
        this._super(res.ForestBg_jpg);
        this.init();
    },
    init:function() {
        var winSize = cc.director.getWinSize();
        this.setPosition(winSize.width / 2, winSize.height / 2);
    }
});