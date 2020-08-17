<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                                <div class="card-body">
                                    <form @submit.prevent="userRegister">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputFirstName">First Name</label>
                                                    <input class="form-control py-4" v-model="register.name" id="inputFirstName" type="text" placeholder="Enter first name" />
                                                    <small class="text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Email</label>
                                                    <input class="form-control py-4" v-model="register.email" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" />
                                                    <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputPassword">Password</label>
                                                    <input class="form-control py-4" v-model="register.password" id="inputPassword" type="password" placeholder="Enter password" />
                                                    <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputConfirmPassword">Confirm Password</label>
                                                    <input class="form-control py-4" v-model="register.password_confirmation" id="inputConfirmPassword" type="password" placeholder="Confirm password" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mt-4 mb-0"><button type="submit" class="btn btn-primary btn-block">Create Account</button></div>
                                    </form>
                                </div>
                                <div class="card-footer text-center">
                                    <div class="small"><router-link to="/login">Have an account? Go to login</router-link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2020</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import * as auth from '../../apis/auth'
export default {
name: "Register",
    created() {
        document.querySelector('body').style.backgroundColor = '#253545'
    },
    data(){
        return {
            register: {
                name: '',
                password: '',
                email: '',
                password_confirmation: ''
            },
            errors: []
        }
    },
    methods: {
        userRegister: async  function()
        {
           try {
              await auth.register(this.register)
               .then(res => {
                   this.errors = []
                   this.flashMessage.success({
                       title: 'User created success',
                       time: 2000
                   });
                   this.$router.push('/login')
                   console.log(res)
               })
           }catch (error){
               if(error.response.status === 422)
               {
                   switch (error.response.status){
                       case 422:
                           this.errors = error.response.data.errors;
                           break;
                   }
               }
           }
        }
    }
}
</script>

<style scoped>

</style>
