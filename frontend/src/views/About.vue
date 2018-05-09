  <template>
    <section class="container about">
      <div class="flex">
        <div class="team-member">
            <img class="team-img" src="img/team/oz.jpg" alt="">
        </div>
        <div class="flex justify-start align-start">
            <div class="font-bold flex flex-column justify-start">
                <h4>Oz Mercer</h4>
                <p class="text-muted">Developer</p>
            </div>
            <p>Having completed my B.Sc. in Biotechnology and food engineering several years ago, 
              I had decided to change my career course and study coding. 
              I have recently finished learning how to be a Full-stack Web Developer, and now I am interested to find work in this field.
            </p>    
        </div>
      </div>
      <div class="flex">
        <div class="team-member">
            <img class="team-img" src="img/team/shimrit.jpg" alt="">
        </div>
        <div class="flex justify-start align-start">
            <div class="font-bold">
                <h4>Shimrit Snapir</h4>
                <p class="text-muted">Master of none</p>
            </div>
            <p>I am an Industrial engineer who quickly discovered my real passion is development.
                I have a 10+ year exprience in software development, implementation and product management.
                I have recently joined the web development community and looking forward to making the best of this fresh start, 
                while putting my experience to use in this new and exciting world.
            </p>    
        </div>
      </div>
    </section>
  </template>
<script>
export default {

}
</script>

<style scoped>

  img.team-img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-right: 50px;
  }

  .about {
    margin-top: 150px;
  }

  p {
    text-align: left;
    margin-left: 20px;
  }
</style>

