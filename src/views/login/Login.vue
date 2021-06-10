<template>
<Alert v-if="error" :status="'error'" :message="error" />
<div class="login-wrapper d-flex justify-content-center align-items-center">
    
    <div class="container">
    
    <div class="card login-card">
        <div class="card-body login-body">
        <div class="row h-100">
            <div class="col-md-6 left-col">
            <div class="custom-img-container">
                <img
                class=""
                src="../../assets/images/Payroll-Pro-Logo-white.png"
                />
                <h6 for="" class="text-light mt-3">
                By Mustard Seed Systems Corporation
                </h6>
            </div>
            <p for="" class="text-light abs">Version 1.0.0</p>
            </div>
            <div
            v-if="forgot_password"
            class="col-md-6 p-4 right-col text-left d-flex justify-content-center align-items-center"
            >
            <form>
                <h3 for="mb-4">Welcome,</h3>
                <p for="" class="mb-4"
                >Use your company email to sign in to your account.</p
                >
                <small class="text-muted" v-if="has_error">
                   *Fields in red are required and must be filled.
                </small>
                <div class="form-group">
                <div class="custom-from-group">
                    <input
                    type="email"
                    id="input_login_email"
                    placeholder="Email"
                    v-model="login_id"
                    />
                    <i class="fas fa-envelope"></i>
                </div>
                </div>
                <div class="form-group">
                <div class="custom-from-group">
                    <input
                    type="password"
                    id="input_login_password"
                    placeholder="Password"
                    v-model="password"
                    />
                    <i class="fas fa-lock"></i>
                </div>
                </div>
                <div class="text-right">
                    <a
                    href="#"
                    @click="forgot_password = false"
                    class="btn btn-link custom-link"
                    id="link_forgot_password"
                    >Forgot Password?
                    </a>
                </div>

                <div class="text-center mt-3">
                <!-- <button 
                type="button"
                class="custom-btn"
                id="button_login"
                disabled>Loading ...</button> -->
                <button 
                @click="loginProcess"
                type="button"
                class="custom-btn"
                id="button_login">Login</button>
                </div>
            </form>
            </div>
            <div
            v-else
            class="col-md-6 mt-3 right-col text-center d-flex justify-content-center align-items-center">
                <div class="m-5">
                    <h3 class="mb-3">Forgot your password?</h3>
                    <div class="text-center mb-4">
                    <p class="custom-p">
                        Don't worry! Just fill in your email, and we'll send a link to your 
                        inbox for the password reset link.
                    </p>
                    </div>
                    <div class="form-group">
                        <div class="custom-from-group">
                            <input
                            type="email"
                            class="input-custom"
                            id="input_forgot_password_email"
                            placeholder="Email"
                            />
                            <i class="fas fa-envelope"></i>
                        </div>
                    </div>
                    <div class="text-center mt-5">
                        <button  
                        @click="SendEmail"
                        class="btn btn-primary"
                        id="button_reset_password">Reset Password</button>
                    </div>
                    <div class="text-right mt-5">
                        <a href="#" 
                        @click="forgot_password=true"  
                        class="btn btn-link custom-link-back"
                        id="button_back_to_login">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    <!-- <div v-if="$store.state.alert_triggered">
        <Alert :message="$store.state.alert_message" :type="$store.state.alert_type"/>
    </div> -->
</div>

</template>

<script>
import { ref, computed } from 'vue';
import useLogin from '../../composables/useLogin'
import Alert from '../../components/Alert'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Login',
    components: {
        Alert,
    },
    setup() {

    const { response, error, login, isPending } = useLogin();

    const login_id = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const loginProcess = async () => {
      const data = {
        LoginID: login_id.value,
        EmployeePassword: password.value,
      }

      await login('payrolluser/auth', data)
      if(error.value){
          console.log(error.value);
      }else{
        console.log(response.value.login_id)
        store.commit('setUser', response.value.login_id)
        //   router.push({path: '/app/dashboard'} )
        window.location = 'http://localhost:8080/app/dashboard';
      }
      
    }

    return  { loginProcess,  login_id, password, isPending, response, error }
  }
}

</script>


<style scoped lang="scss">
.login-wrapper {
    background: url("../../assets/images/Corporate.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
}

.login-wrapper::after {
    content: "";
    position: absolute;
    height: 100vh;
    width: 100%;
    /* background-color: rgba(49, 20, 177, 0.767); */
    background-image: linear-gradient(
    to right,
    rgba(21, 113, 213, 0.922),
    rgba(24, 63, 154, 0.922)
    );
}

.grid {
    display: grid;
    grid-auto-columns: repeat(2, 1fr);
}

.left-col {
    background-image: linear-gradient(
    to bottom right,
    rgb(28, 50, 136),
    rgb(31, 129, 230)
    );
    display: flex;
    align-items: center;
    text-align: center;
}

.left-col > p.text-light {
    position: absolute;
    bottom: 0;
    left: 1.6rem;
}

.left-col > div.custom-img-container > img {
    width: 60%;
}

.login-body {
    padding: 0 !important;
}

.login-card {
    /* outline: none !important; */
    overflow: hidden;
    border: 0;
    border-radius: 0.6rem;
    box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.5);
    z-index: 1;
    height: 70vh;
}

.right-col > form {
    width: 85%;
}

.custom-from-group {
    position: relative;
}

.custom-from-group > i {
    color: grey;
    position: absolute;
    top: 14px;
    right: 4px;
}

.custom-from-group > input,
.custom-from-group > select {
    width: 100%;
    border: 0;
    border-bottom: 1.7px solid rgb(122, 122, 122);
    border-radius: 0;
    /* border-bottom: red; */
    padding: 0.4rem;
}

.custom-from-group > select {
    color: #757575;
}

.custom-from-group > input:focus,
.custom-from-group > select:focus {
    outline: 0;
    /* border-bottom: red; */
    border-bottom: 1.7px solid rgb(51, 110, 247);
}

.left-col > div.custom-img-container > h6 {
    letter-spacing: 0.8px;
}

.custom-btn {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 5rem;
    background-color: rgb(31, 129, 230);
    color: white;
    transition: all 0.3s ease;
    letter-spacing: 0.6px;
}

.custom-btn:disabled
{
    pointer-events: none;
    background-color: rgb(96, 163, 230);
}

.custom-btn:hover,
.custom-btn:focus {
    background-color: rgb(47, 142, 236);
    transform: translate(0, -3px);
    box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.281);
}

.custom-link {
    font-size: 0.9rem;
    letter-spacing: 0.3px;
    margin-right: -8px;
}
.custom-p {
    margin: 0;
    padding: 0;
}
.custom-link-back{
    margin-bottom: -3rem;
}
</style>
