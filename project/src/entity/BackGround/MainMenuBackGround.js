/**
 * Created by slx on 15-1-29.
 */

var MainMenuBackGround = cc.Sprite.extend({
    active:true,
    ctor:function() {
        this._super(res.MainMenuBg_png);
        this.init();
    },
    init:function() {
        this.setAnchorPoint(new cc.Point(0, 0));
        this.setPosition(new cc.Point(0, -300));
    }

});

MainMenuBackGround.getOrCreateMainMenuBg = function(parent) {
    for(var i = 0; i < ResourceManager.MainMenuBg.length; i++) {
        var bg = ResourceManager.MainMenuBg[i];
        if(bg.active == false) {
            bg.active = true;
            return bg;
        }
    }
    var bg = new MainMenuBackGround();
    parent.addChild(bg, -1000);
    ResourceManager.MainMenuBg.push(bg);
    return bg;
}