/**
 * Created by a4515_000 on 2015/2/3.
 */

var BackGroundLayer = cc.Layer.extend({
    backGround:null,
    ctor:function() {
        this._super();
        this.init();
    },
    init:function() {
        backGround = new ForestBgSprite();
        this.addChild(backGround);
    }
});

var GamePlayLayer = cc.Layer.extend({
    mainCharacter:null,
    ctor:function() {
        this._super();
        this.init();
    },
    init:function() {
        MainCharacter.loadResource();
        this.mainCharacter = new MainCharacter();
        this.addChild(this.mainCharacter);

        cc.eventManager.addListener(GamePlayLayer.keyListener, this);
        //this.schedule(this.actionListener, 0.1);
        this.scheduleUpdate();
    },
    update:function() {
        var walkKeys = [cc.KEY.s, cc.KEY.a, cc.KEY.d, cc.KEY.w];
        var direction = null;
        for(var i = 0; i < walkKeys.length; i ++) {
            var walkKey = ResourceManager.walkKey[walkKeys[i]];
            if(walkKey == null || walkKey.pressed == false) continue;
            if(walkKey.served == true) {
                //walkKey.served = false;
                continue;
            }
            //walkKey.served = true;
            direction = i;
            break;
        }
        if(direction != null) {
            this.mainCharacter.walk(direction);
        }
    }
});

GamePlayLayer.keyListener = {
    event:cc.EventListener.KEYBOARD,
    onKeyPressed:function(key, event) {
        if(key == cc.KEY.w || key == cc.KEY.s || key == cc.KEY.a || key == cc.KEY.d) {
            var walkKeys = [cc.KEY.s, cc.KEY.a, cc.KEY.d, cc.KEY.w];
            for(var i = 0; i < walkKeys.length; i ++) {
                if(ResourceManager.walkKey[walkKeys[i]] == null) continue;
                ResourceManager.walkKey[walkKeys[i]].served = true;
            }

            if(ResourceManager.walkKey[key] == null) {
                ResourceManager.walkKey[key] = {};
            }
            ResourceManager.walkKey[key].pressed = true;
            ResourceManager.walkKey[key].served = false;
        }
    },
    onKeyReleased:function(key, event) {
        if(key == cc.KEY.w || key == cc.KEY.s || key == cc.KEY.a || key == cc.KEY.d) {
            ResourceManager.walkKey[key].pressed = false;

            var walkKeys = [cc.KEY.s, cc.KEY.a, cc.KEY.d, cc.KEY.w];
            for(var i = 0; i < walkKeys.length; i ++) {
                if(ResourceManager.walkKey[walkKeys[i]] == null) continue;
                ResourceManager.walkKey[walkKeys[i]].served = false;
            }
        }
    }
}

var MainScene = {
    scene:null,
    getOrCreateMainScene:function() {
        if(this.scene != null) {
            return this.scene;
        }
        this.scene = new cc.Scene();
        var bgLayer = new BackGroundLayer();
        this.scene.addChild(bgLayer);
        ResourceManager.layers["BackGroundLayer"] = bgLayer;
        var gamePlayLayer = new GamePlayLayer();
        this.scene.addChild(gamePlayLayer);
        ResourceManager.layers["GamePlayLayer"] = gamePlayLayer;
        return this.scene;
    }

};