<template>

  <transition name="alert">
    <Alert v-if="response" :status="'success'" :message="'User Added'" @closeModal="handleCloseModal" />
  </transition>
  <transition name="alert">
    <Alert v-if="error && error.message" :status="'error'" :message="error.message" @closeModal="handleCloseModal" />
  </transition>

  <div class="card boiler shadow-md">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-12 d-flex justify-content-between align-items-center">
          <h5 class="h4 mb-0">New User</h5>
          <router-link class="btn btn-light" :to="{ name: 'boiler'}">User List <i v-html="chevronRight"></i> </router-link>
        </div>
      </div>

      <hr />

      <form @submit.prevent="handleSubmit" id="form_create_user">

        <div class="row">
          <div class="col-md-7">
            <div class="row pr-3">
                <div class="form-group col-5">
                <label>Employee ID</label>
                <input
                  type="text"
                  class="form-control"
                  :class="[error && error.errors.employee_id && 'is-invalid']"
                  id=""
                  aria-describedby="emailHelp"
                  placeholder="Ex. 1234567"
                  v-model="employee_id"
                />
                <small v-if="error && error.errors.employee_id" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.employee_id[0] }}
                </small>
                
              </div>
                <!-- <div class="error">{{ error }}</div> -->
               <div class="form-group col-7">
                <label for="">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  :class="[error && error.errors.full_name && 'is-invalid']"
                  id=""
                  aria-describedby="emailHelp"
                  placeholder="Ex. John Doe"
                  v-model="full_name"
                />
                <small v-if="error && error.errors.full_name" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.full_name[0] }}
                </small>
              </div>

              <div class="form-group col-12">
                <label>Email address</label>
                <input
                  type="email"
                  class="form-control"
                  :class="[error && error.errors.login_id && 'is-invalid']"
                  id=""
                  aria-describedby="emailHelp"
                  placeholder="Ex. johndoe@example.com "
                  v-model="login_id"
                />
                <small v-if="error && error.errors.login_id" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.login_id[0] }}
                </small>
              </div>

              <div class="form-group col-12">
                <label for="">Role</label>
                <select 
                name="" 
                id="" 
                class="form-control" 
                :class="[error && error.errors.login_type && 'is-invalid']"
                v-model="login_type"
                >
                  <option value="">Choose ...</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
                <small v-if="error && error.errors.login_type" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.login_type[0] }}
                </small>
              </div>

              
            </div>
          </div>

          <div class="col-md-5">
            <label for="">Companies</label>
            <div class="multi-select text-secondary">
              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>

              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>

              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>

              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>

              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>

              <div class="multi-select-card">
                <h5 class="h5 text-bold">Mustbuy</h5> 
                <p>MSSC - Mustard Corporation</p> 
              </div>
              
            </div>
          </div>

        </div>
        <hr>
        <div class="row col-12">
          <input type="submit" class="btn btn-custom-success" v-if="!isPending" value="Save">
          <button class="btn btn-custom-success" v-if="isPending" disabled>Loading ...</button>

        </div>
        
      </form>

    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { ref, onUnmounted } from 'vue';
import useCreate from '../../composables/useCreate'
import feather from 'feather-icons'
import Alert from '../../components/Alert'
export default {
  name: 'CreateBoiler',
  components: {
    Alert
  },
  computed: {
    chevronRight: function () {
      return feather.icons['chevron-right'].toSvg({
        'width' : 18
      })
    }
  },
  // data() {
  //   return {
  //     selectedFile: null
  //   }
  // },
  // methods: {
  //   onFileChange(e) {
  //     this.selectedFile = e.target.files[0];
      
  //   },
  //   onUpload() {
  //     const fd = new FormData();
  //     fd.append("code", "John");
  //     // fd.append("name", "John");
  //     fd.append("address", "John");
  //     fd.append("vat_reg", "MSSC2022");
  //     fd.append("classification", "John");
  //     fd.append("tel_no", "MSSC2022");
  //     // axios.common.headers['Accept'] = 'application/json';
  //     fd.append('image_path', this.selectedFile);
  //     axios.post('https://payroll-ent-cloud.herokuapp.com/api/setupcompany', fd)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err.response.data));

  //     console.log(fd);
  //   }
  // }
  setup() {

    const { response, error, create, isPending } = useCreate();

    const full_name = ref('');
    const login_id = ref('');
    const login_type = ref('');
    const employee_id = ref('');

    onUnmounted(() => {
      error.value = null
      response.value = null
    })

    const handleSubmit = async () => {
      const data = {
        full_name: full_name.value,
        login_id: login_id.value,
        login_type: login_type.value,
        employee_id: employee_id.value,
        active: 1,
        password: 'password',
      }

      await create('payrolluser', data);

      if(!error.value){
        full_name.value = ''
        login_id.value = ''
        login_type.value = ''
        employee_id.value = ''
      }else{
        window.scrollTo(0,0);
      }
    }

    const handleCloseModal = () => {
      error.value.message = null
      response.value = ""
    }

    return  { handleSubmit, full_name, login_id, login_type, employee_id, error, isPending, response, handleCloseModal }
  }
};
</script>

<style>

/* .alert-enter-from {
    opacity: 0;
    transition: transformY(-60px);
}

.alert-enter-to {
    opacity: 1;
    transition: transformY(0);
} */



</style>