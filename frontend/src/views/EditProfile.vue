<template>
<section class="EditProfilePage">
      <div class="container">
          <h4>Edit Profile</h4>
              <div class="row">
                  <form class="col s12" @submit.prevent="saveUser">
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
                         
                         <button class="btn" id="show-modal" @click="showModal = true">Add Class</button>
                          <transition name="modal" v-if="showModal" @close="showModal = false">
                            <div class="modal-mask">
                              <div class="modal-wrapper">
                                <div class="modal-container">
                                  <button class="modal-default-button btn" @click="showModal = false">
                                    X
                                  </button>
                                  <slot>
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
                                        
                                           <div class="input-field col s12">
                                            <input  type="text" class="validate" placeholder="Address">
                                        </div>
                                          <button class="btn green accent-3">Add Class</button>
                                  </slot>
                                </div>
                              </div>
                            </div>
                          </transition>
                  
                          </div>

               <button class="waves-effect waves-light btn">Save</button>
              
            </form>
        </div>
      </div>
    
  </section>
</template>

<script>
import UserService from '@/services/UserService.js';

export default {
  data() {
    return {
      showModal: false,
      userToUpdate: UserService.emptyUser()
    };
  },
  methods: {
    saveUser() {
      console.log(this.userToUpdate);
      UserService.register(this.userToUpdate)
      // this.$store.dispatch({type:'saveUser',user: this.userToUpdate})
      //     .then(addedUser => {
      //        console.log('added');
      //     })
      //     .catch(err => {
      //         console.log('failed');
      //     })
    }
  },
  components: {
    UserService,
  }
};
</script>


<style scopped>
.container {
  width: 50%;
  /* border: 2px solid #577594; */
  padding: 20px;
}
a {
  margin: 10px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


