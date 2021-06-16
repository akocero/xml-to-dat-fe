<template>
<div class="row auth-container">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
        <form class="w-75" @submit.prevent="handleSubmit">
            <h4 class="h3">Sign In</h4>
            <hr>
            <p>Welcome! Use your company email to sign in to your account.</p>
            <transition name="alert">
            <Alert v-if="error" :status="'error'" :message="'Invalid Inputs'"  @closeModal="handleCloseModal"/>
            </transition>
            <div class="form-group pt-2">
                <label for="">Email address</label>
                <input type="email" class="form-control" id=""  placeholder="Enter email" v-model="login_id" :class="[error && error.errors?.login_id && 'is-invalid']">
                <small v-if="error && error.errors?.login_id" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.login_id[0] }}
                </small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password" :class="[error && error.errors?.password && 'is-invalid']">
                <small v-if="error && error.errors?.password" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.password[0] }}
                </small>
            </div>
            <div class="mb-4">
                <a href="" class="">Forgot Password?</a>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-custom-primary" v-if="!isPending">Sing In</button>
                <button type="submit" class="btn btn-custom-primary" v-if="isPending" disabled>Loading ...</button>
            </div>
            
        </form>
    </div>
    <div class="col-md-8 bg-navy-blue auth-right">
        <div class="content">
            
            <img src="@/assets/images/Payroll-Pro-Logo-white.png" alt="" class="pec-logo">
            <p class="mssc">By Mustard Seed Systems Corporation</p>
            <h4 class="h5 pb-2">Lorem, Ipsum </h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nostrum, exercitationem necessitatibus veniam ratione deleniti expedita ipsum ducimus, iure officia aliquam architecto. Ab delectus accusantium saepe fugiat inventore ad incidunt.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nostrum, exercitationem necessitatibus veniam ratione deleniti.</p>
            
            <h4 class="h5 mt-5 pb-2">Lorem, Ipsum 2</h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur ut ducimus officiis vero rerum ipsam! Magnam accusamus ipsam sequi itaque illo. Consequatur ut ducimus officiis vero rerum ipsam! Magnam accusamus ipsam sequi itaque illo</p>
            
            <h5 class="h6 mt-auto">Version 1.0.1</h5>
        </div>
        
    </div>
</div>

</template>

<script>
import { ref } from 'vue';
import useLogin from '../../composables/useLogin'
import Alert from '../../components/Alert'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Auth',
    components: {
        Alert,
    },
    setup() {
        const login_id = ref('');
        const password = ref('');
        const router = useRouter();
        const store = useStore();
        const { response, error, login, isPending } = useLogin();

        const handleSubmit = async () => {
            error.value = null

            const data = {
                login_id: login_id.value,
                password: password.value,
            }

            await login('payrolluser/auth', data)
            if(error.value){
                console.log(error.value);
            }else{
                // console.log(response.value.login_id)
                store.commit('setUser', response.value)
                //   router.push({path: '/app/dashboard'} )
                window.location = 'http://localhost:8080/app/dashboard';
            }
        
        }

        const handleCloseModal = () => {
            error.value = null
            response.value = null
        }

        return  { handleSubmit,  login_id, password, isPending, response, error, handleCloseModal }
    }
}

</script>

<style>
    .auth-right {
        /* background-color: #04164767; */
        background-image: url('../../assets/images/Corporate.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        
        
    }

    .auth-right p {
        z-index: 1000;
        color: white;
    }

    .auth-right::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    /* background-color: rgba(49, 20, 177, 0.767); */
    background-image: linear-gradient(
    to right,
    rgba(2, 9, 27, 0.959),
    rgba(14, 80, 151, 0.922)
    
    );
}

    .auth-right .content {
        position: absolute;
        height: calc(100% - 5rem);
        z-index: 100;
        margin-top: 5rem;
        margin-left: 2rem;
        color: white;
    }

    .auth-right .content .mssc {
        margin-top: -28px;
        padding-bottom: 1.5rem;
    }
    .auth-right .content .pec-logo {
        
        width: 40%;
        margin-bottom: 2rem;

    }

    .auth-right .content p, .auth-right .content h5, .auth-right .content h4 {
        color: white;
        width: 70%;
        margin-left: 10px;
    }

    .auth-right .content h5 {
        position: absolute;
        bottom: 1rem;
    }

</style>