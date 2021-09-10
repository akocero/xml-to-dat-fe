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
		updateActiveRoute() {
			let tempActiveRoute = this.$route.name;

			if (tempActiveRoute.includes("-")) {
				this.activeRoute = tempActiveRoute.replace(/-/g, " ");
			} else {
				this.activeRoute = tempActiveRoute;
			}

			if (tempActiveRoute.includes("setup")) {
				console.log(tempActiveRoute);
			}
			this.activeNav = this.$route.path
				.replace(/\//g, " / ")
				.substring(8);
		},
	},
	watch: {
		$route(to, from) {
			this.updateActiveRoute();
		},
	},
	mounted() {
		this.updateActiveRoute();
	},
};
</script>
