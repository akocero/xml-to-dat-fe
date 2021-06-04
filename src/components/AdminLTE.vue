<template>
  <Navbar></Navbar>
  <Sidebar></Sidebar>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <ContentHeader />
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <router-view></router-view>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <ControlSidebar></ControlSidebar>
  <Footer></Footer>
</template>

<script>
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import ControlSidebar from "./layouts/ControlSidebar";
import Footer from "./layouts/Footer";
import ContentHeader from "./layouts/ContentHeader";
export default {
  name: "AdminLTE",
  components: {
    Navbar,
    Sidebar,
    ControlSidebar,
    ContentHeader,
    Footer,
  },
};
</script>
