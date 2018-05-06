<template>
<section>
  <div class="row">
      <ul class="collection">
        <li>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">Javascript
                <span style="font-size: 20px;">4
                  <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>
                <i style="float: right" class="fa fa-info" aria-hidden="true"></i>
              </span>
              <span style="float: unset; margin: 0px;" class="new badge" data-badge-caption="">Web Development</span>
              <br />
              <p>100$/Hour</p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">Description
                <i class="close material-icons right">close</i>
              </span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
            <div class="card-action">
              <a href="#">Edit</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
                    <div>
                      <div class="row">
                        <div class="input-field col s12">
                          <input type="text" class="validate" placeholder="Title">
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <input type="text" class="validate" placeholder="Subtitle">
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <textarea class="materialize-textarea" placeholder="Description"></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <input type="number" class="validate" placeholder="Price/Hour">
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <input type="text" class="validate" placeholder="Image url">
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-field col s12">
                          <input type="text" class="validate" placeholder="Address">
                        </div>
                      </div>
                      <button class="btn green accent-3">Add Class</button>
                    </div>
                 
     


</section>
</template>

<script>

  export default {
      data () {
          return {
             showModal: false
          }
      },
      props: {
      },
      watch: {
      },
      computed: {
      },
      methods: {
      },
      components: {
      }
  }
</script>

<style scoped>

</style>