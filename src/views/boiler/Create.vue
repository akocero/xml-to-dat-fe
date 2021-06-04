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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>