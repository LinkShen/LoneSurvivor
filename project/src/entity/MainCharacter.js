/**
 * Created by a4515_000 on 2015/2/5.
 */
var MainCharacter = cc.Sprite.extend({
    winSize:null,
    walkStep:[0, 0, 0, 0],
    speed:10,
    ctor:function() {
        this._super(res.MainCharacter_png, new cc.Rect(0, 0, 64, 64));
        this.init();
    },
    init:function() {
        this.winSize = cc.director.getWinSize();
        this.setPosition(new cc.p(this.winSize.width / 2, this.winSize.height / 2));
    },
    walk:function(direction) {
        var frameRate = 60 / this.speed;
        var j = Math.floor(this.walkStep[direction] / frameRate);
        var frame = cc.spriteFrameCache.getSpriteFrame("MainCharacter_Walk_" + direction + "_" + j);
        this.setSpriteFrame(frame);
        this.walkStep[direction] = this.walkStep[direction] + 1;
        if(this.walkStep[direction] >= frameRate * 3) {
            this.walkStep[direction] = 0;
        }
        /*
        var animation = cc.animationCache.getAnimation("MainCharacter_Walk_" + direction);
        this.runAction(new cc.animate(animation));
        */
    }
});

MainCharacter.loadResource = function() {
    for(var i = 0; i < 4; i ++) {
        //var animFrames = [];
        for(var j = 0; j < 3; j ++) {
            var x1 = j * 64;
            var y1 = i * 64;
            var frame = new cc.SpriteFrame(res.MainCharacter_png, new cc.Rect(x1, y1, 63, 64));
            //animFrames.push(frame);
            cc.spriteFrameCache.addSpriteFrame(frame, "MainCharacter_Walk_" + i + "_" + j);
        }
        /*
        var animation = new cc.Animation(animFrames, 0.1, 1);
        cc.animationCache.addAnimation(animation, "MainCharacter_Walk_" + i);
        */
    }
}