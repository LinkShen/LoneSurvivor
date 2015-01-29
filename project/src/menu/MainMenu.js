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
    }
});