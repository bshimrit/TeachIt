env = null
mouseEvent = (name,x,y) ->
  evt = document.createEvent("MouseEvents")
  evt.initMouseEvent(
    name,
    true,
    true,
    window,
    1,
    x,
    y,
    x,
    y,
    false,
    false,
    false,
    false,
    0,
    null
    )
  return evt
describe "waves", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))

    after ->
      #unloadComp(env)

    it "should position", (done) ->
      counter = 0
      for i in [1..5]
        wave = env.$refs["wave"+i]
        box1 = wave.parentEl.getBoundingClientRect()
        ripple = wave.show(offsetX:1,offsetY:1)
        ripple.rippleDiv.remove()
        wave.ripples.splice(wave.ripples.indexOf(ripple),1)
        process = (wave,box1,i) ->
          env.$nextTick ->
            box2 = wave.$el.getBoundingClientRect()
            compare = (type) ->
              box1[type].should.be.closeTo box2[type], 1, "wave"+i+" #{type}"
            compare("top")
            compare("left")
            compare("width")
            compare("height")
            if counter < 4
              counter++
            else
              done()
        process(wave,box1,i)

    it "should ripple", (done) ->
      wave = env.$refs.wave1
      wave.$el.dispatchEvent(mouseEvent("mousedown",wave.$el.offsetLeft+10,wave.$el.offsetTop+5))
      setTimeout (->
        wave.$el.children[1].offsetLeft.should.equal 10
        wave.$el.children[1].offsetTop.should.equal 5
        document.documentElement.dispatchEvent(mouseEvent("mouseup",10,10))
        setTimeout (->
          should.not.exist wave.$el.children[1]
          done()
          ),wave.ripples[0].duration*1.05
        ),wave.ripples[0].duration
