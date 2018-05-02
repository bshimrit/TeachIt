env = null
el = null
disable = null
click = (el) ->
  e = new MouseEvent("click",{
    "view": window,
    "bubbles": true,
    "cancelable": true
  })
  el.dispatchEvent(e)

describe "toggle", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))
      el = env.$refs.toggle.$el
      disable = env.$refs.disable.$el
      onSpy = chai.spy()
      offSpy = chai.spy()
      env.onOn = onSpy
      env.onOff = offSpy
    after ->
      unloadComp(env)

    it "should have defaults",  ->
      el.should.have.class("off")
      el.should.have.text("Toggle: off")

    it "should toogle on click", (done) ->
      click(el)
      env.$nextTick ->
        env.onOn.should.have.been.called.once
        env.onOff.should.not.have.been.called
        el.should.have.class("on")
        el.should.have.text("Toggle: on")
        click(el)
        env.$nextTick ->
          env.onOn.should.have.been.called.once
          env.onOff.should.have.been.called.once
          el.should.have.class("off")
          el.should.have.text("Toggle: off")
          done()

    it "should work with slots", (done) ->
      env.content = "a"
      env.contentOn = "b"
      env.contentOff = "c"
      env.$nextTick ->
        el.should.have.text("ac")
        click(el)
        env.$nextTick ->
          el.should.have.text("ab")
          done()

    it "should disable", (done) ->
      click(disable)
      env.$nextTick ->
        el.should.have.attr("disabled")
        click(disable)
        env.$nextTick ->
          el.should.not.have.attr("disabled")
          done()
