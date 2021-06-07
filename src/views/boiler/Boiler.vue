<template>
  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
          <button class="btn btn-custom-success float-right" data-toggle="modal" data-target="#exampleModal">
            Create New User
          </button>
        </div>
      </div>
      <div class="row">
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
                <tr v-for="item in data" :key="item.id">
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
      </div>

      <div class="row">
        <div class="col-12">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getData from "../../composables/getData";
// // component imports
// import PostList from '../components/PostList.vue'
import Spinner from "../../components/Spinner.vue";
export default {
  name: "Boiler",
  components: { Spinner },
  setup() {
    const { data, error, load } = getData();
    load();

    return { data, error };
  },
};
</script>