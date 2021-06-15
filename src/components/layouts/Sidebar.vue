<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="" class="brand-link text-sm">
      <span class="brand-text font-weight-light pl-2">Payroll Ent Cloud</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 d-flex">
          <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          d -->
          <div class="initial">
           {{ userInitial }}
          </div>

        <div class="info">
          <a href="#" class="d-block">{{user.full_name}}</a>
          <small class="text-white role">{{user.login_type === 'admin' ? 'administrator' : user.login_type }}</small>
        </div>
      </div>
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-header ml-2">MODULE 1</li>

          <li class="nav-item">
            <a href="#" class="nav-link active">
              <!-- <i class="nav-icon fas fa-chart-pie"></i> -->
              <i v-html="pieChart" class="nav-icon nav-icon fas pr-2"></i>
              <p>
                Home
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{name: 'dashboard'}" class="nav-link active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-cog"></i> -->
              <i v-html="settings" class="nav-icon nav-icon fas pr-2"></i>
              <p>
                Setup
                <i class="right fas fa-angle-left"></i>
                <!-- <i v-html="chevronLeft" class="right fe"></i> -->
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{name: 'boiler'}" class="nav-link">
                  <i class="nav-icon far pr-2">&#9679;</i>
                  <!-- <i class="far fa-circle nav-icon"></i> -->
                  <p>Users</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="nav-icon far pr-2">&#9679;</i>
                  <!-- <i class="far fa-circle nav-icon"></i> -->
                  <p>Companies</p>
                </router-link>
              </li>
            </ul>
          </li>
          
          <li class="nav-header ml-2 mt-2">MODULE 2</li>
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-box"></i> -->
              <i v-html="database" class="nav-icon nav-icon fas pr-2"></i>
              <p>
                Database
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="dashboard" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-folder-open"></i> -->
              <i v-html="tool" class="nav-icon fas pr-2"></i>
              <p>
                Tools
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Users</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Companies</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-header ml-2 mt-2">MODULE 3</li>
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-box"></i> -->
              <i v-html="messageCircle" class="nav-icon nav-icon fas pr-2"></i>
              <p>
                Announcement
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="dashboard" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-folder-open"></i> -->
              <i v-html="bell" class="nav-icon fas pr-2"></i>
              <p>
                Notifications
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Users</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Companies</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <!-- <i class="nav-icon fas fa-folder-open"></i> -->
              <i v-html="fileText" class="nav-icon fas pr-2"></i>
              <p>
                Reports
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Users</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="boiler" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Companies</p>
                </router-link>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import feather from 'feather-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "Sidebar",
  computed: {
    chevronLeft: function () {
      return feather.icons['chevron-left'].toSvg({
        'width' : 16
      })
    },
    tool: function () {
      return feather.icons['tool'].toSvg({
        'width' : 20
      })
    },
    pieChart: function () {
      return feather.icons['pie-chart'].toSvg({
        'width' : 20
      })
    },
    settings: function () {
      return feather.icons['settings'].toSvg({
        'width' : 20
      })
    },
    database: function () {
      return feather.icons['database'].toSvg({
        'width' : 20
      })
    },
    messageCircle: function () {
      return feather.icons['message-circle'].toSvg({
        'width' : 20
      })
    },
    bell: function () {
      return feather.icons['bell'].toSvg({
        'width' : 20
      })
    },
    fileText: function () {
      return feather.icons['file-text'].toSvg({
        'width' : 20
      })
    },
  }, 
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.getUser);
    const user_name_array = user.value.full_name.split(" ");
    //console.log(user_name_array)
    const userInitial = `${user_name_array[0].substr(0, 1)}${user_name_array[user_name_array.length -1].substr(0, 1)}`
    return {
      // access a getter in computed function
      user, userInitial
    }
  }
};
</script>
<style scoped>
.custom-initial {
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: whitesmoke;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>