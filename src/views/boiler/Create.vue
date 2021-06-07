<template>
  <div class="card boiler shadow-md">
    <div class="card-body">
      <div class="row mb-3">
        <div
          class="col-md-12 d-flex justify-content-between align-items-center"
        >
          <h4 class="h4 mb-0">New User</h4>
          <button class="btn btn-custom-success float-right">
            Create New User
          </button>
        </div>
      </div>
      <hr />
      <form action="">
        <div class="row">
          <div class="form-group col-6">
            <label for="exampleInputEmail1">Full Name</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>

          <div class="form-group col-6">
            <label for="exampleInputEmail1">Role</label>
            <input
              type="email"
              class="form-control is-valid"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>

          <div class="form-group col-6">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control is-invalid"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email "
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <input type="file" @change="onFileChange">
          
        </div>
      </form>
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateBoiler',
  data() {
    return {
      selectedFile: null
    }
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
      
    },
    onUpload() {
      const fd = new FormData();
      fd.append("code", "John");
      // fd.append("name", "John");
      fd.append("address", "John");
      fd.append("vat_reg", "MSSC2022");
      fd.append("classification", "John");
      fd.append("tel_no", "MSSC2022");
      // axios.common.headers['Accept'] = 'application/json';
      fd.append('image_path', this.selectedFile);
      axios.post('https://payroll-ent-cloud.herokuapp.com/api/setupcompany', fd)
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data));

      console.log(fd);
    }
  }
};
</script>

<style>
</style>