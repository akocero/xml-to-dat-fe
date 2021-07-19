<template>
	<Navbar></Navbar>
	<Sidebar></Sidebar>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper">
		<ContentHeader :activeRoute="activeRoute" :activeNav="activeNav" />
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
	data() {
		return {
			activeRoute: null,
			activeNav: null,
		};
	},
	methods: {
		updateContentheader() {
			let tempActiveRoute = this.$route.name;

			if (tempActiveRoute.includes("-")) {
				let arr = tempActiveRoute.split("-");
				this.activeRoute =
					arr[0].charAt(0).toUpperCase() +
					arr[0].slice(1) +
					" " +
					arr[1].charAt(0).toUpperCase() +
					arr[1].slice(1);
			} else {
				this.activeRoute =
					tempActiveRoute.charAt(0).toUpperCase() +
					tempActiveRoute.slice(1);
			}

			tempActiveRoute.includes("company")
				? (this.activeNav = "Setup")
				: (this.activeNav = "Dashboard");
		},
	},
	updated() {
		this.updateContentheader();
	},
	mounted() {
		this.updateContentheader();
	},
};
</script>
