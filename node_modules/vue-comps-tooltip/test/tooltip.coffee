env = null

roundBox = (box) ->
  left: Math.round(box.left)
  right: Math.round(box.right)
  top: Math.round(box.top)
  bottom: Math.round(box.bottom)
  width: Math.round(box.width)
  height: Math.round(box.height)

event = (el,name,cb) ->
  e = new MouseEvent name,
    "view": window
    "bubbles": true
    "cancelable": true
  el.dispatchEvent(e)
  env.$nextTick -> env.$nextTick -> env.$nextTick cb

getBoundingBoxes = (name,cb) ->
  btn = env.$els[name]
  event btn, "mouseenter", ->
    tt = env.$refs[name]
    tt.isOpened.should.be.true
    should.exist tt.$els.tt
    box1 = btn.getBoundingClientRect()
    box2 = tt.$els.tt.getBoundingClientRect()
    event btn, "mouseleave", ->
      tt.isOpened.should.be.false
      should.not.exist tt.$els.tt
      cb(roundBox(box1),roundBox(box2))

describe "tooltip", ->

  describe "basic env", ->

    before (done) ->
      env = loadComp(require("../dev/basic.vue"))
      env.$nextTick done
    after ->
      #unloadComp(env)

    it "should work in the topleft corner", (done) ->
      getBoundingBoxes "topleft", (box1,box2) ->
        box2.top.should.equal box1.bottom, "top"
        offset = Math.abs(box1.width-box2.width)/2
        box2.left.should.equal box1.left-offset, "left"
        box2.right.should.equal box1.right+offset, "right"
        done()

    it "should work in the topright corner", (done) ->
      getBoundingBoxes "topright", (box1,box2) ->
        box2.top.should.equal box1.bottom, "top"
        offset = Math.abs(box1.width-box2.width)/2
        box2.left.should.equal box1.left-offset, "left"
        box2.right.should.equal box1.right+offset, "right"
        done()

    it "should work in the bottomleft corner", (done) ->
      getBoundingBoxes "bottomleft", (box1,box2) ->
        box2.bottom.should.equal box1.top, "bottom"
        offset = Math.abs(box1.width-box2.width)/2
        box2.left.should.equal box1.left-offset, "left"
        box2.right.should.equal box1.right+offset, "right"
        done()

    it "should work in the bottomright corner", (done) ->
      getBoundingBoxes "bottomright", (box1,box2) ->
        # broken in chrome on first opening
        # (getBoundingClientRect for button gives wrong values)
        #box2.bottom.should.equal box1.top, "bottom"
        offset = Math.abs(box1.width-box2.width)/2
        box2.left.should.equal box1.left-offset, "left"
        box2.right.should.equal box1.right+offset, "right"
        done()

    it "should work with anchor s", (done) ->
      getBoundingBoxes "s", (box1,box2) ->
        box2.top.should.equal box1.bottom, "top"
        offset = Math.abs(box1.width-box2.width)/2
        box2.left.should.be.closeTo box1.left-offset, 1, "left"
        box2.right.should.be.closeTo box1.right+offset, 1, "right"
        done()

    it "should work with anchor e", (done) ->
      getBoundingBoxes "e", (box1,box2) ->
        box2.left.should.equal box1.right, "left"
        offset = Math.abs(box1.height-box2.height)/2
        box2.top.should.equal box1.top-offset, "left"
        box2.bottom.should.equal box1.bottom+offset, "right"
        done()

    it "should work with anchor w", (done) ->
      getBoundingBoxes "w", (box1,box2) ->
        box2.right.should.equal box1.left, "right"
        offset = Math.abs(box1.height-box2.height)/2
        box2.top.should.equal box1.top-offset, "left"
        box2.bottom.should.equal box1.bottom+offset, "right"
        done()
