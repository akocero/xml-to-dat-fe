<template>
  <Alert v-if="error" :status="'error'" :message="error.message" />
  <div class="card boiler shadow-md">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-12 d-flex justify-content-between align-items-center">
          <h4 class="h4 mb-0">New User</h4>
        </div>
      </div>

      <hr />

      <form action="" @submit.prevent="add">

        <div class="row">
          <div class="col-md-7">
            <div class="row pr-3">
                <div class="form-group col-5">
                <label>Employee ID</label>
                <input
                  type="text"
                  class="form-control"
                  :class="[error && error.errors.employee_id && 'is-invalid']"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="employee_id"
                />
                <small v-if="error && error.errors.employee_id" id="emailHelp" class="form-text text-danger">
                  {{ error.errors.employee_id[0] }}
                </small>
                
              </div>
                <!-- <div class="error">{{ error }}</div> -->
               <div class="form-group col-7">
                <label for="exampleInputEmail1">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  :class="[error && error.errors.full_name && 'is-invalid']"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
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
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email "
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
          <button class="btn btn-custom-success" v-if="!isPending">Save</button>
          <button class="btn btn-custom-success" v-if="isPending" disabled>Loading ...</button>

        </div>
        
      </form>

    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { ref } from 'vue';
import useCreate from '../../composables/useCreate'
import Alert from '../../components/Alert'
export default {
  name: 'CreateBoiler',
  components: {
    Alert
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

    const data = ref(null)

    const add = () => {
      data.value = {
        full_name: full_name.value,
        login_id: login_id.value,
        login_type: login_type.value,
        employee_id: employee_id.value,
        active: 1,
        password: 'password',
      }

      create('payrolluser', data.value);
    }

    return  { add, full_name, login_id, login_type, employee_id, error, isPending, response }
  }
};
</script>

<style>
</style>