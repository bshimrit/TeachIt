env = null
opener = null
closer = null
thing = null

mouseEvent = (name,x) ->
  # return new MouseEvent name,
  #   screenX: x
  #   screenY: 10
  #   clientX: x
  #   clientY: 10
  evt = document.createEvent("MouseEvents")
  evt.initMouseEvent(
    name,
    true,
    true,
    window,
    1,
    x,
    10,
    x,
    10,
    false,
    false,
    false,
    false,
    0,
    null
    )
  return evt

pan = (el,start,end,cb) ->
  el.dispatchEvent(mouseEvent("mousedown",start))
  env.$nextTick ->
    document.dispatchEvent(mouseEvent("mousemove",end))
    env.$nextTick ->
      cb (cb2) ->
        end = if end < start then end-11 else end+11
        document.dispatchEvent(mouseEvent("mouseup",end))
        env.$nextTick ->
          cb2()

startCond = (obj) ->
  obj ?= {}
  obj.active ?= true
  obj.opened ?= false
  env.active = obj.active
  env.opened = obj.opened

describe "drag-handle", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))
      opener = env.$refs.opener
      closer = env.$refs.closer
      thing = env.$els.thing

    after ->
      #unloadComp(env)

    it "should be there", (done) ->
      startCond()
      env.$nextTick ->
        should.exist opener.$els.dh
        should.not.exist closer.$els.dh
        box = opener.$els.dh.getBoundingClientRect()
        box.top.should.equal 0
        box.left.should.equal 0
        box.bottom.should.equal box.height
        done()

    it "should move and abort", (done) ->
      startCond()
      pan opener.$els.dh,10,30, (cb) ->
        box = thing.getBoundingClientRect()
        box.left.should.equal -200+20*2, "move"
        cb ->
          box = thing.getBoundingClientRect()
          box.left.should.equal -200, "abort"
          done()

    it "should open", (done) ->
      startCond()
      pan opener.$els.dh,10,110, (cb) ->
        box = thing.getBoundingClientRect()
        box.left.should.equal 0, "move"
        cb ->
          box = thing.getBoundingClientRect()
          box.left.should.equal 0, "open"
          done()

    it "should close", (done) ->
      startCond(opened:true)
      box = closer.$els.dh.getBoundingClientRect()
      pan closer.$els.dh,box.left+1,box.left-100, (cb) ->
        box = thing.getBoundingClientRect()
        box.left.should.equal -200, "move"
        cb ->
          box = thing.getBoundingClientRect()
          box.left.should.equal -200, "close"
          done()


    it "should disable", (done) ->
      startCond(active: false)
      env.$nextTick ->
        should.not.exist opener.$els.dh
        should.not.exist closer.$els.dh
        done()
