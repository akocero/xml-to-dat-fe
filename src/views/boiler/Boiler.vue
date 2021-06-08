<template>
  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  <div class="card boiler shadow-md">
    <div class="card-body pt-4">

      <div class="row mb-4">
        <div
          class="col-md-12 d-flex justify-content-between align-items-center"
        >
          <h4 class="h4 mb-0">User List</h4>
          <button class="btn btn-custom-primary float-right" data-toggle="modal" data-target="#exampleModal">
            Create New User
          </button>
        </div>
      </div>

      <div class="row" v-if="data?.data?.length">
        <div class="col-12">
          <div class="table">
            <table>
              <thead>
                <tr class="table100-head">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data.data" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.full_name }}</td>
                  <td>{{ item.login_id }}</td>
                  <td>
                    <span class="custom-badge" :class="[item.login_type === 'Admin' ? 'custom-badge-success' : 'custom-badge-warning']">&#9679;  {{ item.login_type }}</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-transparent">
                      <i class="far fa-folder-open text-secondary"></i>
                    </button>
                    <button class="btn btn-sm btn-transparent">
                      <i class="far fa-edit text-secondary"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination :data="data" @paginate="paginate($event)"/>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFetch from '../../composables/useFetch'
import Spinner from "../../components/Spinner.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "Boiler",
  components: { Spinner, Pagination },
  setup() {
    const { data, error, fetch, isPending } = useFetch();

    fetch('payrolluser?page=1');

    const paginate = (url) => {
     fetch(url);
    }

    return { data, error, paginate };
  },
};
</script>