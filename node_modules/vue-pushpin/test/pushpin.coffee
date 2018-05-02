env = null
p = null
scroll = (x,cb) ->
  window.scrollTo(0,x)
  window.requestAnimationFrame -> window.requestAnimationFrame ->
    return cb(p.$el.getBoundingClientRect())

describe "pushpin", ->

  describe "basic env", ->

    before ->
      env = loadComp(require("../dev/basic.vue"))
      p = env.$refs.p

    after ->
      #unloadComp(env)

    it "should work", (done) ->
      scroll 0, ({top}) ->
        top.should.equal 400
        scroll 100, ({top}) ->
          top.should.equal 300
          scroll 500, ({top}) ->
            top.should.equal 300
            scroll 5000, ({top, bottom}) ->
              height = env.getViewportSize().height
              if height < 1000 + 300
                (height-top).should.equal 1000
              else
                top.should.equal 300
              done()
