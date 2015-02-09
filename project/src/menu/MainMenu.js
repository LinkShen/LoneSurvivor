/**
 * Created by slx on 15-1-29.
 */

var MainMenuLayer = cc.Layer.extend({

    backGroundSp:null,
    backGroundSp2:null,
    winSize:null,

    ctor:function() {
        this._super();
        this.init();
    },

    init:function() {
        this.winSize = cc.director.getWinSize();

        this.backGroundSp = MainMenuBackGround.getOrCreateMainMenuBg(this);

        var title = new cc.LabelTTF("Lone Survivor", "Arial", 70);
        title.setFontFillColor(new cc.Color(255, 0, 0));
        title.setPosition(new cc.Point(this.winSize.width / 2, this.winSize.height / 2 + 200));
        this.addChild(title);

        var startMenuItem = new cc.MenuItemFont("New Game", this.onStartGame, this);
        startMenuItem.setColor(new cc.Color(0, 255, 255));
        var loadMenuItem = new cc.MenuItemFont("Load", this.onLoadGame, this);
        loadMenuItem.setColor(new cc.Color(0, 255, 255));
        var optionMenuItem = new cc.MenuItemFont("Option", this.onOption, this);
        optionMenuItem.setColor(new cc.Color(0, 255, 255));
        var mainMenu = new cc.Menu(startMenuItem, loadMenuItem, optionMenuItem);
        mainMenu.alignItemsVerticallyWithPadding(10);
        this.addChild(mainMenu);

        this.scheduleUpdate();
    },

    update:function(dt) {
        this.moveBackGround(dt);
    },

    moveBackGround:function(dt) {
        var speed = dt * 100;
        this.backGroundSp.x -= speed;
        var curEnd = this.backGroundSp.width + this.backGroundSp.x;
        if(curEnd <= this.winSize.width) {
            this.backGroundSp2 = this.backGroundSp;
            this.backGroundSp = MainMenuBackGround.getOrCreateMainMenuBg(this);
            this.backGroundSp.setPosition(new cc.Point(curEnd - speed, this.backGroundSp2.y));
        }
        if(this.backGroundSp2 != null && this.backGroundSp2.active != false) {
            this.backGroundSp2.x -= speed;
            if(this.backGroundSp2.width + this.backGroundSp2.x <= 0) {
                this.backGroundSp2.active = false;
            }
        }
    },

    onStartGame:function() {
        var scene = MainScene.getOrCreateMainScene();
        cc.director.runScene(new cc.TransitionFade(2, scene));
    }
});

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