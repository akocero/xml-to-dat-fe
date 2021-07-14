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
			@costCenterUpdated="costCenterUpdated($event)"
			:forEditCostCenterItem="forEditCostCenterItem"
		/>
	</div>
	<div class="row">
		<ModalEmployeeClass
			v-if="showEmployeeClass"
			@closeEmployeeClassModal="showEmployeeClass = false"
			@employeeClassAdded="employeeClassAdded($event)"
			@employeeClassUpdated="employeeClassUpdated($event)"
			:forEditEmployeeClassItem="forEditEmployeeClassItem"
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
						<h5
							class="modal-title"
							id="exampleModalLabel"
							v-if="!editingDropdown"
						>
							New {{ dropdownTypeTitle }}
						</h5>
						<h5
							class="modal-title"
							id="exampleModalLabel"
							v-if="editingDropdown && forEditData"
						>
							Update {{ forEditData.type }}
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
							@click="resetForm"
						>
							Cancel
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
					<TableEmployeeClass
						v-if="!loading"
						@showEmployeeClassModal="showEmployeeClassModal($event)"
						:employeeClassData="employeeClassData"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-cost-center"
					role="tabpanel"
					aria-labelledby="pills-cost-center-tab"
				>
					<TableCostCenter
						@showCostCenterModal="showCostCenterModal($event)"
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
						:data="data.data"
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
						:data="data.data"
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
						:data="data.data"
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
						:data="data.data"
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
						:data="data.data"
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
						:data="data.data"
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
						:data="data.data"
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
import TableEmployeeClass from "./TableEmployeeClass";
import ModalCostCenter from "./ModalCostCenter";
import ModalEmployeeClass from "./ModalEmployeeClass";
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
		TableEmployeeClass,
		ModalEmployeeClass,
	},
	setup() {
		const { data, fetch } = useFetch();
		const { data: costCenterData, fetch: costCnterFetch } = useFetch();
		const {
			data: employeeClassData,
			fetch: employeeClassFetch,
		} = useFetch();
		const { response, create, update, error, unknownError } = useData();

		const alert = ref(null);
		const value = ref("");
		const description = ref("");
		const loading = ref(false);

		const showModal = ref(false);
		const editingDropdown = ref(false);
		const dropdownType = ref("");
		const dropdownTypeTitle = ref("");

		const newValue = ref("");
		const newDescription = ref("");
		const forEditData = ref(null);

		// Fetch Data to Tables
		onBeforeMount(async () => {
			loading.value = true;
			await fetch("/setup_employee_dropdown");
			await costCnterFetch("/setup_employee_cost_center");
			await employeeClassFetch("/setup_employee_class");
			loading.value = false;
		});

		// *** REUSABLE METHODS ***
		const updateTableData = (data, response) => {
			return data.map((item) =>
				item.id === response.id ? response : item
			);
		};

		const displayAlert = (status, message) => {
			alert.value = {
				status,
				message,
			};

			window.scrollTo(0, 0);
		};

		const matchForEditData = (data, eventData) => {
			return data.find((item) => item.id === eventData.id);
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
		};

		// *** MAIN (DROPDOWN) METHODS AND VARIABLES ***
		const handleShowModal = (eventData) => {
			showModal.value = true;
			error.value = null;
			// 0 means nothing to edit then go for adding data
			if (eventData.id !== 0) {
				editingDropdown.value = true;
				forEditData.value = matchForEditData(
					data.value.data,
					eventData
				);
				newDescription.value = forEditData.value.description;
				newValue.value = forEditData.value.value;
				dropdownType.value = eventData.type;
			} else {
				forEditData.value = null;
				editingDropdown.value = false;
				dropdownType.value = eventData.type;
				dropdownTypeTitle.value = eventData.title;
			}
			$("#employeeSetupModal").modal("show");
		};

		const handleCreate = async () => {
			alert.value = null;
			error.value = null;
			const newEmpployeeDropdown = {
				type: dropdownType.value,
				value: value.value,
				description: description.value,
			};

			await create("/setup_employee_dropdown", newEmpployeeDropdown);
			if (!error.value) {
				$("#employeeSetupModal").modal("hide");
				data.value.data = [response.value, ...data.value.data]; // append reponse from api to table related to it

				displayAlert("success", dropdownType.value + " added");
				resetForm();
			}
		};

		const handleUpdate = async () => {
			alert.value = null;
			error.value = null;
			const newEmpployeeDropdown = {
				type: dropdownType.value,
				value: newValue.value,
				description: newDescription.value,
				active: 1,
			};

			await update(
				`/setup_employee_dropdown/${forEditData.value.id}`,
				newEmpployeeDropdown
			);
			if (!error.value) {
				data.value.data = updateTableData(
					data.value.data,
					response.value
				);
				$("#employeeSetupModal").modal("hide");
				displayAlert("info", dropdownType.value + " updated");
				resetForm();
			}
		};

		// *** COST CENTER METHODS AND VARIABLES ***
		const showCostCenter = ref(false);
		const forEditCostCenterItem = ref(null);

		const costCenterAdded = (eventData) => {
			$("#cost-center-modal").modal("hide");
			// append reponse from api to table related to it
			costCenterData.value.data = [
				eventData,
				...costCenterData.value.data,
			];
			showCostCenter.value = false;
			displayAlert("success", "cost center added");
		};

		const costCenterUpdated = (eventData) => {
			costCenterData.value.data = updateTableData(
				costCenterData.value.data,
				eventData
			);
			showCostCenter.value = false;
			$("#cost-center-modal").modal("hide");
			displayAlert("info", "cost center updated");
		};

		const showCostCenterModal = (id) => {
			console.log(id);
			showCostCenter.value = true;
			alert.value = null;
			forEditCostCenterItem.value = null;
			// 0 means nothing to edit then go for adding data
			if (id !== 0) {
				forEditCostCenterItem.value = matchForEditData(
					costCenterData.value.data,
					{ id }
				);
			}
			// I did timeout because it takes time to finished the showCostCenter ref Transition
			// If you have question to it feel free to fuck yourself!
			setTimeout(() => {
				$("#cost-center-modal").modal("show");
			}, 50);
		};

		// *** EMPPLOYEE CLASS METHODS AND VARIABLES ***
		const showEmployeeClass = ref(false);
		const forEditEmployeeClassItem = ref(null);

		const employeeClassAdded = (eventData) => {
			$("#employee-class-modal").modal("hide");
			// append reponse from api to table related to it
			employeeClassData.value.data = [
				eventData,
				...employeeClassData.value.data,
			];
			showEmployeeClass.value = false;
			displayAlert("success", "employee class added");
		};

		const employeeClassUpdated = (eventData) => {
			employeeClassData.value.data = updateTableData(
				employeeClassData.value.data,
				eventData
			);
			showEmployeeClass.value = false;
			$("#employee-class-modal").modal("hide");
			displayAlert("info", "employee class updated");
		};

		const showEmployeeClassModal = (id) => {
			console.log(id);
			showEmployeeClass.value = true;
			alert.value = null;
			forEditEmployeeClassItem.value = null;
			// 0 means nothing to edit then go for adding data
			if (id !== 0) {
				forEditEmployeeClassItem.value = matchForEditData(
					employeeClassData.value.data,
					{ id }
				);
			}
			// I did timeout because it takes time to finished the showEmployeeClass ref Transition
			// If you have question to it feel free to fuck yourself!
			setTimeout(() => {
				$("#employee-class-modal").modal("show");
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
			loading,

			showCostCenter,
			showCostCenterModal,
			costCenterData,
			costCenterAdded,
			costCenterUpdated,
			forEditCostCenterItem,

			showEmployeeClass,
			showEmployeeClassModal,
			employeeClassData,
			employeeClassAdded,
			employeeClassUpdated,
			forEditEmployeeClassItem,
		};
	},
};
</script>

<style></style>
