<template>
	<BankAdditionalDetailsModal
		@addBankDetail="addBankDetail($event)"
		@updateBankDetail="updateBankDetail($event)"
		:data="forEditBankDetail"
	/>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader heading="New Bank" routeName="bank" mode="create" />

			<hr />

			<form @submit.prevent="handleSubmit" id="form_create_user">
				<div class="row">
					<BaseRowHeading
						heading="Main Info"
						para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aliquam sit quae officiis est et."
					/>

					<div class="col-md-8">
						<div class="row pr-3">
							<div class="form-group col-5">
								<BaseInputField
									id="input_code"
									label="Code"
									v-model="code"
									:error="error"
									:errorField="error?.errors?.code || null"
									placeholder="Ex. BDO"
									:required="true"
								/>
							</div>
							<div class="form-group col-md-7">
								<BaseTextAreaField
									id="input_description"
									label="Description"
									v-model="description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex. Banco De Oro"
									:required="false"
								/>
							</div>
							<div class="form-group col-6">
								<BaseInputField
									id="input_company_name"
									label="Registered Company Name"
									v-model="company_name"
									:error="error"
									:errorField="
										error?.errors?.company_name || null
									"
									placeholder="Ex. Company X"
									:required="true"
								/>
							</div>
							<div class="form-group col-6">
								<BaseInputField
									id="input_branch_code"
									label="Branch Code"
									v-model="branch_code"
									:error="error"
									:errorField="
										error?.errors?.branch_code || null
									"
									placeholder="Ex. 1234567"
									:required="false"
								/>
							</div>
							<div class="form-group col-6">
								<BaseInputField
									id="input_account_no"
									label="Account No."
									v-model="account_no"
									:error="error"
									:errorField="
										error?.errors?.account_no || null
									"
									placeholder="Ex. 1234567"
									:required="false"
								/>
							</div>
						</div>
					</div>
					<div class="col-12">
						<hr />
					</div>
					<div class="col-12">
						<div
							class="col-12 d-flex justify-content-between align-items-center"
						>
							<h5 class="h5 mb-0">
								Additional Fields
							</h5>
							<button
								type="button"
								class="btn btn-sm btn-primary"
								data-toggle="modal"
								data-target="#bank-details-modal"
								data-backdrop="static"
								data-keyboard="false"
								@click="forEditBankDetail = ''"
							>
								<i v-html="iPlus"></i>
							</button>
						</div>
					</div>
					<div class="col-12">
						<BankAdditionalDetailsList
							:additional_details="additional_details"
							@deleteBankDetail="deleteBankDetail($event)"
							@forEditBankDetail="
								forEditBankDetail = {
									...$event,
								}
							"
						/>
					</div>
				</div>
				<hr />

				<div class="row col-12">
					<input
						type="submit"
						class="btn btn-custom-success"
						v-if="!loading"
						value="Save"
					/>
					<button
						class="btn btn-custom-success"
						v-if="loading"
						disabled
					>
						Saving ...
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";

import feather from "feather-icons";

import { ref, computed } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseRowHeading from "@/components/BaseRowHeading";

import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import { useStore } from "vuex";
import endpoints from "@/utils/endpoints";
import BankAdditionalDetailsModal from "./BankAdditionalDetailsModal";
import BankAdditionalDetailsList from "./BankAdditionalDetailsList";
export default {
	name: "CreateRole",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		ThePageHeader,
		BaseTextAreaField,
		BaseRowHeading,
		BankAdditionalDetailsModal,
		BankAdditionalDetailsList,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
		iPlus: function() {
			return feather.icons["plus"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const { response, error, create, loading, unknownError } = useData();
		const { pushAlert } = useAlert();
		const router = useRouter();
		const store = useStore();

		const code = ref("");
		const description = ref("");
		const branch_code = ref("");
		const account_no = ref("");
		const company_name = ref("");
		const additional_details = ref([]);
		const forEditBankDetail = ref("");
		const bankAdded = ref(false);

		const handleSubmit = async () => {
			const data = {
				code: code.value,
				description: description.value,
				branch_code: branch_code.value,
				company_name: company_name.value,
				account_no: account_no.value,
				additional_details: additional_details.value,
			};

			console.log(data);

			await create(endpoints.setupBank, data);

			if (!error.value) {
				console.log("user created");
				bankAdded.value = true;
				router.push({
					name: "bank",
					params: { bankAdded: bankAdded.value },
				});
				pushAlert("success", "Role Added");
			} else {
				pushAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		onBeforeRouteLeave((to, from) => {
			if (!bankAdded.value) {
				const answer = window.confirm(
					"Do you really want to leave? you have unsaved changes!"
				);
				// cancel the navigation and stay on the same page
				if (!answer) return false;
			}
		});

		const deleteBankDetail = (id) => {
			console.log("this id will be deleted: ", id);
			if (additional_details.value.length > 1) {
				if (confirm("Are you sure you want to delete the bank?")) {
					additional_details.value = additional_details.value.filter(
						(bank) => bank.id !== id
					);
				}
			} else {
				pushAlert(
					"warning",
					"Bank need atleast one additional details"
				);
			}
		};

		const addBankDetail = (data) => {
			additional_details.value.push(data);
			$("#bank-details-modal").modal("hide");
			pushAlert("success", "Bank Added");
		};

		const updateBankDetail = (data) => {
			additional_details.value = additional_details.value.map((bank) => {
				let tempBank = bank;
				if (bank.id === data.id) {
					tempBank = data;
				}
				return tempBank;
			});
			$("#bank-details-modal").modal("hide");
			pushAlert("info", "Bank Updated");
		};

		return {
			handleSubmit,

			code,
			description,
			company_name,
			branch_code,
			account_no,
			additional_details,

			forEditBankDetail,

			error,
			loading,
			response,

			addBankDetail,
			updateBankDetail,
			deleteBankDetail,
		};
	},
};
</script>
