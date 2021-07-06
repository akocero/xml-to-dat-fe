<template>
	<div class="dashboard">
		<transition name="alert">
			<div
				class="alert alert-success alert-dismissible fade show"
				role="alert"
			>
				<strong>Welcome! you are logged in as </strong>
				{{ user.full_name }}
				<button
					type="button"
					class="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</transition>
	</div>
	<div class="row">
		<div class="col-lg-3 col-6">
			<!-- small box -->
			<div class="small-box bg-info">
				<div class="inner">
					<h3>150</h3>

					<p>New Orders</p>
				</div>
				<div class="icon">
					<!-- <i class="ion ion-bag"></i> -->
					<i v-html="ishoppingCart"></i>
				</div>
				<a href="#" class="small-box-footer"
					>More info <i class="fas fa-arrow-circle-right"></i
				></a>
			</div>
		</div>
		<!-- ./col -->
		<div class="col-lg-3 col-6">
			<!-- small box -->
			<div class="small-box bg-success">
				<div class="inner">
					<h3>53<sup style="font-size: 20px">%</sup></h3>

					<p>Bounce Rate</p>
				</div>
				<div class="icon">
					<i v-html="ichart"></i>
				</div>
				<a href="#" class="small-box-footer"
					>More info <i class="fas fa-arrow-circle-right"></i
				></a>
			</div>
		</div>
		<!-- ./col -->
		<div class="col-lg-3 col-6">
			<!-- small box -->
			<div class="small-box bg-warning">
				<div class="inner">
					<h3>44</h3>

					<p>User Registrations</p>
				</div>
				<div class="icon">
					<i v-html="iusers"></i>
				</div>
				<a href="#" class="small-box-footer"
					>More info <i class="fas fa-arrow-circle-right"></i
				></a>
			</div>
		</div>
		<!-- ./col -->
		<div class="col-lg-3 col-6">
			<!-- small box -->
			<div class="small-box bg-danger">
				<div class="inner">
					<h3>65</h3>

					<p>Unique Visitors</p>
				</div>
				<div class="icon">
					<i v-html="icalendar"></i>
				</div>
				<a href="#" class="small-box-footer"
					>More info <i class="fas fa-arrow-circle-right"></i
				></a>
			</div>
		</div>
		<!-- ./col -->
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import feather from "feather-icons";
export default {
	computed: {
		ishoppingCart: function() {
			return feather.icons["shopping-cart"].toSvg({
				width: 82,
				height: 82,
			});
		},
		iusers: function() {
			return feather.icons["users"].toSvg({
				width: 82,
				height: 82,
			});
		},
		ichart: function() {
			return feather.icons["pie-chart"].toSvg({
				width: 82,
				height: 82,
			});
		},
		icalendar: function() {
			return feather.icons["calendar"].toSvg({
				width: 82,
				height: 82,
			});
		},
	},
	setup() {
		const store = useStore();
		const user = computed(() => store.getters.getUser);
		return {
			// access a getter in computed function
			user,
		};
	},
};
</script>
