/**
 * Created by a4515_000 on 2015/2/3.
 */

var BackGroundLayer = cc.Layer.extend({
    backGround:[],
    xCount:null,
    yCount:null,
    topRow:null,
    bottomRow:null,
    leftCol:null,
    rightCol:null,
    winSize:null,
    ctor:function() {
        this._super();
        this.init();
    },
    init:function() {
        this.winSize = cc.director.getWinSize();
        var bg = new ForestBgSprite();
        this.xCount = Math.ceil(this.winSize.width / bg.width) + 2;
        this.yCount = Math.ceil(this.winSize.height / bg.height) + 2;
        this.topRow = this.yCount - 1;
        this.bottomRow = 0;
        this.leftCol = 0;
        this.rightCol = this.xCount - 1;
        for(var i = 0; i < this.yCount; i ++) {
            var row = [];
            for(var j = 0; j < this.xCount; j ++) {
                var bg = new ForestBgSprite();
                bg.setAnchorPoint(new cc.Point(0, 0));
                bg.setPosition(new cc.Point((j - 1) * bg.width, (i - 1) * bg.height));
                this.addChild(bg);
                row.push(bg);
            }
            this.backGround.push(row);
        }

    },
    move:function(direction) {
        var dx = 0;
        var dy = 0;
        var width = this.backGround[0][0].width;
        var height = this.backGround[0][0].height;
        var speed = ResourceManager.layers["GamePlayLayer"].mainCharacter.speed;
        switch (direction) {
            case 0:
                dx = 0;
                dy = speed;
                break;
            case 1:
                dx = speed;
                dy = 0;
                break;
            case 2:
                dx = -speed;
                dy = 0;
                break;
            case 3:
                dx = 0;
                dy = -speed;
                break;
        }

        if(this.backGround[this.topRow][0].y + dy < this.winSize.height) {
            for(var i = 0; i < this.xCount; i ++) {
                this.backGround[this.bottomRow][i].y = this.backGround[this.topRow][i].y + height;
            }
            this.topRow = this.bottomRow;
            this.bottomRow ++;
            if(this.bottomRow >= this.yCount) {
                this.bottomRow = 0;
            }
        }
        if(this.backGround[this.bottomRow][0].y + height + dy > 0) {
            for(var i = 0; i < this.xCount; i ++) {
                this.backGround[this.topRow][i].y = this.backGround[this.bottomRow][i].y - height;
            }
            this.bottomRow = this.topRow;
            this.topRow --;
            if(this.topRow < 0) {
                this.topRow = this.yCount - 1;
            }
        }
        if(this.backGround[0][this.leftCol].x + width + dx > 0) {
            for(var i = 0; i < this.yCount; i ++) {
                this.backGround[i][this.rightCol].x = this.backGround[i][this.leftCol].x - width;
            }
            this.leftCol = this.rightCol;
            this.rightCol --;
            if(this.rightCol < 0) {
                this.rightCol = this.xCount - 1;
            }
        }
        if(this.backGround[0][this.rightCol].x + dx < this.winSize.width) {
            for(var i = 0; i < this.yCount; i ++) {
                this.backGround[i][this.leftCol].x = this.backGround[i][this.rightCol].x + width;
            }
            this.rightCol = this.leftCol;
            this.leftCol ++;
            if(this.leftCol >= this.xCount) {
                this.leftCol = 0;
            }
        }

        for(var i = 0; i < this.backGround.length; i ++) {
            for(var j = 0; j < this.backGround[i].length; j ++) {
                var cx = this.backGround[i][j].x;
                var cy = this.backGround[i][j].y;
                this.backGround[i][j].setPosition(new cc.Point(cx + dx, cy + dy));
            }

        }
    }
});

var GamePlayLayer = cc.Layer.extend({
    mainCharacter:null,
    staticEntities:[],
    ctor:function() {
        this._super();
        this.init();
    },
    init:function() {
        this.loadResource();

        this.mainCharacter = new MainCharacter();
        this.addChild(this.mainCharacter);

        var tree1 = new Tree(Tree.TYPE.TREE1, new cc.Point(100, 200));
        this.addChild(tree1);
        this.staticEntities.push(tree1);
        var tree2 = new Tree(Tree.TYPE.TREE2, new cc.Point(700, 300));
        this.addChild(tree2);
        this.staticEntities.push(tree2);

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
            ResourceManager.layers["BackGroundLayer"].move(direction);
            this.moveEntities(direction);
        }
    },
    loadResource:function() {
        MainCharacter.loadResource();
        Tree.loadResource();
    },
    moveEntities:function(direction) {
        var dx = 0;
        var dy = 0;
        var speed = this.mainCharacter.speed;
        switch (direction) {
            case 0:
                dx = 0;
                dy = speed;
                break;
            case 1:
                dx = speed;
                dy = 0;
                break;
            case 2:
                dx = -speed;
                dy = 0;
                break;
            case 3:
                dx = 0;
                dy = -speed;
                break;
        }
        for(var i = 0; i < this.staticEntities.length; i ++) {
            var entity = this.staticEntities[i];
            entity.x += dx;
            entity.y += dy;
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