<template>
  <transition name="alert">
  <Alert v-if="error && error.message" :status="'error'" :message="error.message" @closeModal="handleCloseModal" />
  </transition>
  <transition name="alert">
    <Alert v-if="response" :status="'info'" :message="'User Updated'" @closeModal="handleCloseModal" />
  </transition>
  <div class="card boiler shadow-md">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-12 d-flex justify-content-between align-items-center">
          <h4 class="h4 mb-0">Update User</h4>
          <router-link class="btn btn-light" :to="{ name: 'boiler'}">User List <i v-html="chevronRight"></i> </router-link>
        </div>
      </div>

      <hr />

      <form action="" @submit.prevent="add">

        <div class="row" v-if="item">
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
                  v-model="item.employee_id"
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
                  v-model="item.full_name"
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
                  v-model="item.login_id"
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
                v-model="item.login_type"
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
        <div class="row" v-else>
            <Spinner />
        </div>
        <hr>
        <div class="row col-12">
          <button class="btn btn-custom-success" v-if="!isPending">Save Changes</button>
          <button class="btn btn-custom-success" v-if="isPending" disabled>Loading ...</button>

        </div>
        
      </form>

    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { onUnmounted } from 'vue';
import useUpdate from '../../composables/useUpdate'
import getItem from '../../composables/getItem'
import Alert from '../../components/Alert'
import { useRoute } from 'vue-router'
import Spinner from "../../components/Spinner.vue";
import feather from 'feather-icons'
export default {
  name: 'UpdateBoiler',
  components: {
    Alert,
    Spinner,
  },
  computed: {
    chevronRight: function () {
      return feather.icons['chevron-right'].toSvg({
        'width' : 18
      })
    }
  },
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
  //     axios.item('https://payroll-ent-cloud.herokuapp.com/api/setupcompany', fd)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err.response.data));

  //     console.log(fd);
  //   }
  // }
  setup() {

    
    const route = useRoute();
    const { response, error, update, isPending } = useUpdate();
    const { item, error: errorData, load } = getItem(route.params.id);

    onUnmounted(() => {
      error.value = null
      response.value = null
    })
    
    load()

    const add = async () => {
      const data = {
        full_name: item.value.full_name,
        login_id: item.value.login_id,
        login_type: item.value.login_type,
        employee_id: item.value.employee_id,
        active: 1,
        password: 'password',
      }
      
      await update(`payrolluser/${route.params.id}`, data);
      // this condition won't run until the await is resolve or rejected
      if(!error.value){
        window.scrollTo(0,0);
      }
    
    }

    const handleCloseModal = () => {
      response.value = null
      error.value.message = null
      
    }

    return  { add, error, isPending, response, item, handleCloseModal }
  }
};
</script>

<style>
</style>