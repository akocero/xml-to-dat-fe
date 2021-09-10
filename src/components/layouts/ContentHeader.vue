<template>
	<div class="content-header">
		<div class="container-fluid">
			<div class="row mb-2">
				<div class="col-sm-6">
					<h5 class="m-0 h5 text-capitalize">{{ activeRoute }}</h5>
				</div>
				<!-- /.col -->
				<div class="col-sm-6">
					<span
						class="float-sm-right text-capitalize text-secondary"
						>{{ activeNav }}</span
					>

					<!-- <ol class="breadcrumb float-sm-right">
						<li class="breadcrumb-item">{{ activeNav }}</li>
						<li class="breadcrumb-item text-capitalize">
							{{ activeNav }}
						</li>
					</ol> -->
				</div>
				<!-- /.col -->
			</div>
			<!-- /.row -->
		</div>
		<!-- /.container-fluid -->
	</div>
</template>
<script>
export default {
	name: "ContentHeader",
	props: ["activeRoute", "activeNav"],
};
</script>
