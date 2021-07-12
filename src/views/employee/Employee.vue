<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="handleCloseAlert"
		/>
	</transition>
	<div class="row">
		<ModalCostCenter
			v-if="showCostCenter"
			@closeCostCenterModal="showCostCenter = false"
			@costCenterAdded="costCenterAdded($event)"
		/>
	</div>
	<div class="row">
		<!-- Modal -->
		<div
			class="modal fade"
			id="employeeSetupModal"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
			data-backdrop="static"
		>
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">
							New {{ dropdownTypeTitle }}
						</h5>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
							@click="resetForm"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row" v-if="!editingDropdown">
							<div class="form-group col-12">
								<label>
									Value
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.value &&
											'is-invalid',
									]"
									id="input_value"
									aria-describedby="emailHelp"
									placeholder="Ex. 1234567"
									v-model="value"
								/>
								<small
									v-if="error && error.errors.value"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.value[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label for=""
									>Description
									<span class="text-danger text-bold">*</span>
								</label>
								<textarea
									name=""
									:class="[
										error &&
											error.errors.description &&
											'is-invalid',
									]"
									id="input_description"
									class="form-control"
									v-model="description"
								></textarea>
								<small
									v-if="error && error.errors.description"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.description[0] }}
								</small>
							</div>
						</div>
						<div class="row" v-if="editingDropdown && forEditData">
							<div class="form-group col-12">
								<label>
									Value
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.value &&
											'is-invalid',
									]"
									id="input_value"
									aria-describedby="emailHelp"
									placeholder="Ex. 1234567"
									v-model="newValue"
								/>
								<small
									v-if="error && error.errors.value"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.value[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label for=""
									>Description
									<span class="text-danger text-bold">*</span>
								</label>
								<textarea
									name=""
									:class="[
										error &&
											error.errors.description &&
											'is-invalid',
									]"
									id="input_description"
									class="form-control"
									v-model="newDescription"
								></textarea>
								<small
									v-if="error && error.errors.description"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.description[0] }}
								</small>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
						<button
							type="button"
							class="btn btn-primary"
							@click="handleCreate"
							v-if="!forEditData"
						>
							Save
						</button>
						<button
							type="button"
							class="btn btn-primary"
							v-if="editingDropdown && forEditData"
							@click="handleUpdate"
						>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
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
								id="pills-emp-class-tab"
								data-toggle="pill"
								href="#pills-emp-class"
								role="tab"
								aria-controls="pills-emp-class"
								aria-selected="true"
								>Employee Class
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-cost-center-tab"
								data-toggle="pill"
								href="#pills-cost-center"
								role="tab"
								aria-controls="pills-cost-center"
								aria-selected="false"
							>
								Cost Center
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-dep-tab"
								data-toggle="pill"
								href="#pills-dep"
								role="tab"
								aria-controls="pills-dep"
								aria-selected="false"
								>Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-dimension-tab"
								data-toggle="pill"
								href="#pills-dimension"
								role="tab"
								aria-controls="pills-dimension"
								aria-selected="false"
								>Dimension</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-frequency-tab"
								data-toggle="pill"
								href="#pills-frequency"
								role="tab"
								aria-controls="pills-frequency"
								aria-selected="false"
								>Frequency</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-emp-rank-tab"
								data-toggle="pill"
								href="#pills-emp-rank"
								role="tab"
								aria-controls="pills-emp-rank"
								aria-selected="false"
								>Employee Rank</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-sub-dep-tab"
								data-toggle="pill"
								href="#pills-sub-dep"
								role="tab"
								aria-controls="pills-sub-dep"
								aria-selected="false"
								>Sub Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-position-tab"
								data-toggle="pill"
								href="#pills-position"
								role="tab"
								aria-controls="pills-position"
								aria-selected="false"
								>Position</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-branch-tab"
								data-toggle="pill"
								href="#pills-branch"
								role="tab"
								aria-controls="pills-branch"
								aria-selected="false"
								>Branch</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="tab-content pt-3" id="pills-tabContent">
				<div
					class="tab-pane fade show active"
					id="pills-emp-class"
					role="tabpanel"
					aria-labelledby="pills-emp-class-tab"
				>
					Employee Class
				</div>
				<div
					class="tab-pane fade"
					id="pills-cost-center"
					role="tabpanel"
					aria-labelledby="pills-cost-center-tab"
				>
					<TableCostCenter
						@showCostCenterModal="showCostCenterModal"
						:costCenterData="costCenterData"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-dep"
					role="tabpanel"
					aria-labelledby="pills-dep-tab"
				>
					<Table
						type="department"
						@openModal="handleShowModal($event)"
						title="Department"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-emp-rank"
					role="tabpanel"
					aria-labelledby="pills-emp-rank-tab"
				>
					<Table
						type="employee_rank"
						@openModal="handleShowModal($event)"
						title="Employee Rank"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-sub-dep"
					role="tabpanel"
					aria-labelledby="pills-sub-dep-tab"
				>
					<Table
						type="sub_department"
						@openModal="handleShowModal($event)"
						title="Sub Department"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-branch"
					role="tabpanel"
					aria-labelledby="pills-branch-tab"
				>
					<Table
						type="branch"
						@openModal="handleShowModal($event)"
						title="Branch"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-position"
					role="tabpanel"
					aria-labelledby="pills-position-tab"
				>
					<Table
						type="position"
						@openModal="handleShowModal($event)"
						title="Position"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-frequency"
					role="tabpanel"
					aria-labelledby="pills-frequency-tab"
				>
					<Table
						type="frequency"
						@openModal="handleShowModal($event)"
						title="Frequency"
						:data="data"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-dimension"
					role="tabpanel"
					aria-labelledby="pills-dimension-tab"
				>
					<Table
						type="dimension"
						@openModal="handleShowModal($event)"
						title="Dimension"
						:data="data"
					/>
				</div>
			</div>
			<!-- <div v-else>
				<Spinner />
			</div> -->
		</div>
	</div>
</template>

<script>
import Spinner from "@/components/Spinner";
import useFetch from "@/composables/useFetch";
import useData from "@/composables/useData";
import Table from "./Table";
import TableCostCenter from "./TableCostCenter";
import ModalCostCenter from "./ModalCostCenter";
import Alert from "@/components/Alert";
import { onBeforeMount, ref } from "vue";
import $ from "jquery";
export default {
	name: "Employee",
	components: {
		Spinner,
		Table,
		Alert,
		TableCostCenter,
		ModalCostCenter,
	},
	setup() {
		const { data, fetch } = useFetch();
		const { data: costCenterData, fetch: costCnterFetch } = useFetch();
		const { response, create, update, error, unknownError } = useData();

		// const error = ref(null);
		// const unknownError = ref(null);
		// const response = ref(null);
		// const isPending = ref(false);
		const alert = ref(null);
		const value = ref("");
		const description = ref("");

		const showModal = ref(false);
		const editingDropdown = ref(false);
		const dropdownType = ref("");
		const dropdownTypeTitle = ref("");

		const newValue = ref("");
		const newDescription = ref("");
		const forEditData = ref(null);

		onBeforeMount(async () => {
			await fetch("/setup_employee_dropdown");
			await costCnterFetch("/setup_employee_cost_center");
		});

		const handleCreate = async () => {
			alert.value = null;
			const newEmpployeeDropdown = {
				type: dropdownType.value,
				value: value.value,
				description: description.value,
			};

			await create("/setup_employee_dropdown", newEmpployeeDropdown);
			if (!error.value) {
				$("#employeeSetupModal").modal("hide");
				data.data.value = [...data.data.value, response.value]; // append reponse from api to table

				displayAlert("success", dropdownType.value + " added");
				window.scrollTo(0, 0);
				resetForm();
			}
		};

		const handleUpdate = async () => {
			alert.value = null;
			const newEmpployeeDropdown = {
				type: dropdownType.value,
				value: newValue.value,
				description: newDescription.value,
				active: 1,
			};

			console.log(newEmpployeeDropdown);

			await update(
				`/setup_employee_dropdown/${forEditData.value.id}`,
				newEmpployeeDropdown
			);
			if (!error.value) {
				updateTableData(response);
				$("#employeeSetupModal").modal("hide");
				displayAlert("info", dropdownType.value + " updated");
				resetForm();
				window.scrollTo(0, 0);
			}
		};

		const updateTableData = (response) => {
			data.data.value = data.data.value.map((item) => {
				if (item.id === response.value.id) {
					return response.value;
				}
				return item;
			});
		};

		const displayAlert = (status, message) => {
			alert.value = {
				status,
				message,
			};
		};

		const handleShowModal = (eventData) => {
			showModal.value = true;
			if (eventData.id !== 0) {
				editingDropdown.value = true;
				forEditData.value = data.value.find(
					(item) => item.id === eventData.id
				);

				newDescription.value = forEditData.value.description;
				newValue.value = forEditData.value.value;
				console.log(forEditData.value);
				dropdownType.value = eventData.type;
			} else {
				forEditData.value = null;
				editingDropdown.value = false;

				dropdownType.value = eventData.type;
				dropdownTypeTitle.value = eventData.title;
				console.log(eventData);
			}
			$("#employeeSetupModal").modal("show");
		};

		const handleCloseAlert = () => {
			alert.value = null;
		};

		const resetForm = () => {
			dropdownType.value = "";
			value.value = "";
			description.value = "";
			newValue.value = "";
			newDescription.value = "";

			// error.value = null;
			// showModal.value = false;
		};

		// COST CENTER FUNCTIONS
		const showCostCenter = ref(false);
		const costCenterAdded = (eventData) => {
			console.log("cost Center added", eventData.value);
			$("#cost-center-modal").modal("hide");
			costCenterData.value.data = [
				eventData,
				...costCenterData.value.data,
			];
			showCostCenter.value = false;
			const _alert = {
				status: "success",
				message: "cost center added",
			};

			alert.value = _alert;
		};
		const showCostCenterModal = () => {
			alert.value = null;
			showCostCenter.value = true;
			setTimeout(() => {
				$("#cost-center-modal").modal("show");
			}, 50);
		};

		return {
			data,
			error,

			editingDropdown,
			handleShowModal,
			dropdownTypeTitle,
			handleCreate,
			handleUpdate,
			value,
			description,
			showModal,

			newValue,
			newDescription,
			forEditData,
			handleCloseAlert,
			resetForm,

			alert,

			showCostCenter,
			showCostCenterModal,
			costCenterData,
			costCenterAdded,
		};
	},
};
</script>

<style></style>
