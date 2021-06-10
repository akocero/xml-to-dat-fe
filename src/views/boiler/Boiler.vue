<template>
  <div class="card boiler shadow-md">
    <div class="card-body pt-4">

      <div class="row mb-4">
        <div
          class="col-md-12 d-flex justify-content-between align-items-center"
        >
          <h4 class="h4 mb-0">User List</h4>
          <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link>
        </div>
      </div>

      <div class="row" v-if="data?.data?.length">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-secondary">
                  <th class="text-center">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th class="text-center">Role</th>
                  <th width="12%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data.data" :key="item.id">
                  <td class="text-center">{{ item.id }}</td>
                  <td>{{ item.full_name }}</td>
                  <td>{{ item.login_id }}</td>
                  <td class="text-center">
                    <span class="custom-badge" :class="[item.login_type === 'Admin' ? 'custom-badge-success' : 'custom-badge-warning']">  {{ item.login_type }}</span>
                  </td>
                  <td>
                    <router-link :to="{name: 'update-boiler', params: {id: item.id }}" class="btn btn-sm btn-transparent">
                      <i class="far fa-folder-open text-secondary"></i>
                    </router-link>
                    <!-- <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link> -->
                    <router-link :to="{name: 'update-boiler', params: {id: item.id }}" class="btn btn-sm btn-transparent">
                      <i class="far fa-edit text-secondary"></i>
                    </router-link>
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
// import { router-link } from "vue-router"
import useFetch from '../../composables/useFetch'
import Spinner from "../../components/Spinner.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  name: "Boiler",
  components: { Spinner, Pagination },
  setup() {
    const { data, error, fetch, isPending } = useFetch();

    fetch('payrolluser?page=1');

    const paginate = async (url) => {
     await fetch(url);
    }

    return { data, error, paginate };
  },
};
</script>