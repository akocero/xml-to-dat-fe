<template>
	<div class="card boiler shadow-md">
		<div class="card-body pt-4">
			<div class="row mb-4">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h4 class="h4 mb-0 text-primary">Employee Setup</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<ul
						class="nav nav-pills mb-3"
						id="pills-tab"
						role="tablist"
					>
						<li class="nav-item">
							<a
								class="nav-link active"
								:class="mainTabHasError && 'pr-4'"
								id="pills-main-tab"
								data-toggle="pill"
								href="#pills-main"
								role="tab"
								aria-controls="pills-main"
								aria-selected="true"
								>Employee Class
								<i
									v-if="mainTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								:class="connTabHasError ? 'pr-4' : ''"
								id="pills-contri-tab"
								data-toggle="pill"
								href="#pills-contri"
								role="tab"
								aria-controls="pills-contri"
								aria-selected="false"
							>
								Cost Center
								<i
									v-if="connTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-banks-tab"
								data-toggle="pill"
								href="#pills-banks"
								role="tab"
								aria-controls="pills-banks"
								aria-selected="false"
								>Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Dimension</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Frequency</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Employee Rank</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Sub Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Position</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Branch</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="row" v-if="!isPending">
				<div class="col-12">
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr class="text-secondary">
									<th class="text-center">Code</th>
									<th>Name</th>
									<th>Contact</th>
									<th>Classification</th>
									<th width="12%">Actions</th>
								</tr>
							</thead>
							<tbody v-if="!isPending && data?.data?.length">
								<tr v-for="item in data.data" :key="item.id">
									<td class="text-center">{{ item.code }}</td>
									<td>{{ item.name }}</td>
									<td>{{ item.tel_no }}</td>
									<td>{{ item.classification }}</td>
									<td>
										<router-link
											:to="{
												name: 'update-company',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
										>
											<i
												class="far fa-eye text-secondary"
											></i>
										</router-link>
										<!-- <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link> -->
										<router-link
											:to="{
												name: 'update-company',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
										>
											<i
												class="far fa-edit text-secondary"
											></i>
										</router-link>
									</td>
								</tr>
							</tbody>
							<tbody v-else>
								<tr>
									<td colspan="10" class="text-center">
										No data found!
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<Pagination :data="data" @paginate="paginate($event)" />
			</div>
			<div v-else>
				<Spinner />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Employee",
};
</script>

<style></style>
