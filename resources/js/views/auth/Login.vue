<template>
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                <div class="card-body">
                                    <form @submit.prevent="userLogedIn">
                                        <div class="form-group">
                                            <label class="small mb-1" for="inputEmailAddress">Email</label>
                                            <input class="form-control py-4" v-model="login.email" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                            <small class="text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
                                        </div>
                                        <div class="form-group">
                                            <label class="small mb-1" for="inputPassword">Password</label>
                                            <input class="form-control py-4" v-model="login.password" id="inputPassword" type="password" placeholder="Enter password" />
                                            <small class="text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input" v-model="login.remember_me" id="rememberPasswordCheck" type="checkbox" />
                                                <label class="custom-control-label"   for="rememberPasswordCheck">Remember password</label>
                                                <small class="text-danger d-block" v-if="errors.remember_me">{{ errors.remember_me[0] }}</small>
                                            </div>
                                        </div>
                                        <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <router-link class="small" to="/forgot-password">Forgot Password?</router-link>
                                            <button class="btn btn-primary">Login</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center">
                                    <div class="small"><router-link to="/register">Need an account? Sign up!</router-link></div>
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
    name: "Login",
    created() {
        document.querySelector('body').style.backgroundColor = '#253545'
    },
    data()
    {
        return {
            login: {
                email: '',
                password: '',
                remember_me: '',
            },
            errors: []
        }
    },
    methods: {
        userLogedIn:async function ()
        {
            try {
                await auth.login(this.login)
                .then(res => {
                    localStorage.setItem('authenticated',JSON.stringify(res.data))
                    this.$router.push('/admin')
                })
            }catch (error){
                if(error.response.status)
                {
                    switch (error.response.status){
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            alert(error.response.data.message)
                            break;
                        case 401:
                            alert(error.response.data.message)
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
