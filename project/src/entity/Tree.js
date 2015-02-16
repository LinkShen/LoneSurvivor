/**
 * Created by a4515_000 on 2015/2/15.
 */
var Tree = cc.Sprite.extend({
    type:null,
    ctor:function(type, position) {
        this._super(res.tree1_png);
        this.init(type, position);
    },
    init:function(type, position) {
        this.type = type;
        this.setPosition(position);
        var frame;
        switch(type) {
            case Tree.TYPE.TREE1:
                frame = cc.spriteFrameCache.getSpriteFrame("Tree1");
                break;
            case Tree.TYPE.TREE2:
                frame = cc.spriteFrameCache.getSpriteFrame("Tree2");
                break;
        }
        this.setSpriteFrame(frame);
    }
});

Tree.TYPE = {TREE1:0, TREE2:1};

Tree.loadResource = function() {
    var frame = new cc.SpriteFrame(res.tree1_png, new cc.Rect(0, 0, 416, 352));
    cc.spriteFrameCache.addSpriteFrame(frame, "Tree1");
    frame = new cc.SpriteFrame(res.tree2_png, new cc.Rect(0, 0, 256, 192));
    cc.spriteFrameCache.addSpriteFrame(frame, "Tree2");
}