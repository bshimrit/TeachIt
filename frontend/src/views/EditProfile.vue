<template>
<section class="EditProfilePage">
      <div class="container">
          <h4>Edit Profile</h4>
              <div class="row">
                  <form class="col s12">
                    <div class="row">
                          <div class="input-field col s6">
                              <input  type="text" class="validate" placeholder="first Name">
                          </div>
                          <div class="input-field col s6">
                              <input  type="text" class="validate" placeholder="Last Name">
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                              <input  type="email" class="validate" placeholder="Email">
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                          <input type="password" class="validate" placeholder="Password">
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Image url">
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                            <textarea  class="materialize-textarea"  placeholder="Description"></textarea>
                            
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Education">
                          </div>
                      </div>

                      <div class="row">
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Quote">
                          </div>
                      </div>

                      <div class="row">
                        <h5 class="left-align">Links</h5>
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Facebook">
                          </div>
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Twitter">
                          </div>
                      </div>

                      <div class="row">
                        <h5 class="left-align">Classes</h5>
                         <p>topic-preview</p>
                          
                          <div class="input-field col s6">
                              <input  type="text" class="validate" placeholder="Title">
                          </div>
                           <div class="input-field col s6">
                              <input  type="text" class="validate" placeholder="Subtitle">
                          </div>
                          <div class="input-field col s12">
                               <textarea  class="materialize-textarea"  placeholder="Description"></textarea>
                          </div>
                          <div class="input-field col s12">
                             <input  type="number" class="validate" placeholder="Price/Hour">
                          </div>
                         
                          <div class="input-field col s12">
                              <input  type="text" class="validate" placeholder="Image url">
                          </div>
                            <button class="btn green accent-3">Add Class</button>
                  
                          </div>

        <button class="waves-effect waves-light btn">Save</button>
              
            </form>
        </div>
      </div>
    
  </section>
</template>

<script>

</script>


<style scopped>
.container {
  width: 50%;
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
    margin: 10px
}
</style>


