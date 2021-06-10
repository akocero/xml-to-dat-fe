<template>
  <!-- Navbar -->
  <nav
    class="main-header navbar navbar-expand navbar-white navbar-light text-sm"
  >
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i v-html="sidebar"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="" >
          <i v-html="refreshCw"></i>
        </a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="dashboard" role="button">
          <i v-html="home"></i>
        </router-link>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <!-- <i class="far fa-bell"></i> -->
          <i v-html="bell"></i>
          <span class="badge badge-danger-custom navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header">Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> Notification Example
            <span class="float-right text-muted text-sm">3 mins. ago</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer"
            >See All Notifications</a
          >
        </div>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <!-- <i class="fas fa-th-large"></i> -->
          <i v-html="user"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
  <!-- /.navbar -->
</template>
<script>
import feather from 'feather-icons'
export default {
  name: "Navbar",
  computed: {
    sidebar: function () {
      return feather.icons['sidebar'].toSvg({
        'width' : 18
      })
    },
    home: function () {
      return feather.icons['home'].toSvg({
        'width' : 18
      })
    },
    refreshCw: function () {
      return feather.icons['refresh-cw'].toSvg({
        'width' : 18
      })
    },
    bell: function () {
      return feather.icons['bell'].toSvg({
        'width' : 18
      })
    },
    user: function () {
      return feather.icons['user'].toSvg({
        'width' : 18
      })
    },
  },
};
</script>