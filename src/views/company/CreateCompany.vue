<template>
	<transition name="alert">
		<Alert
			v-if="response"
			:status="'success'"
			:message="'Company Added'"
			@closeModal="handleCloseModal"
		/>
	</transition>
	<transition name="alert">
		<Alert
			v-if="error && error.message"
			:status="'error'"
			:message="error.message"
			@closeModal="handleCloseModal"
		/>
	</transition>

	<div class="card boiler shadow-md">
		<div class="card-body">
			<div class="row mb-3">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h5 class="h4 mb-0">New Company</h5>
					<router-link class="btn btn-light" :to="{ name: 'company' }"
						>Cancel <i v-html="chevronRight"></i>
					</router-link>
				</div>
			</div>

			<hr />

			<form @submit.prevent="handleSubmit" id="form_create_user">
				<div class="row pr-3">
					<div class="col-md-4">
						<h5 class="h5">Company Image</h5>
						<label for="">
							You can change your avatar here or remove the
							current avatar to revert to gravatar.com
						</label>
					</div>

					<div class="col-md-2">
						<img
							src="../../assets/no-image.png"
							alt=""
							style="width: 90%;"
						/>
					</div>

					<div class="form-group col-md-6">
						<label for="">Upload Image</label>
						<input type="file" class="d-block mt-2" />
						<small>The maximum file size allowed is 200KB.</small
						><br /><br />
					</div>
				</div>

				<hr />

				<div class="row">
					<div class="col-4">
						<h5 class="h5">Main Information</h5>
						<label for="">
							You can change your avatar here or remove the
							current avatar to revert to gravatar.com
						</label>
					</div>

					<div class="row col-8">
						<div class="form-group col-4">
							<label>
								Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error && error.errors.code && 'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="code"
							/>
							<small
								v-if="error && error.errors.code"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.code[0] }}
							</small>
						</div>
						<!-- <div class="error">{{ error }}</div> -->
						<div class="form-group col-8">
							<label for=""
								>Name
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error && error.errors.name && 'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. John Doe"
								v-model="name"
							/>
							<small
								v-if="error && error.errors.name"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.name[0] }}
							</small>
						</div>

						<div class="form-group col-6">
							<label
								>Vat Registration
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.vat_reg &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="vat_reg"
							/>
							<small
								v-if="error && error.errors.vat_reg"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.vat_reg[0] }}
							</small>
						</div>

						<div class="form-group col-6">
							<label
								>Email
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="email"
								class="form-control"
								:class="[
									error && error.errors.email && 'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="email"
							/>
							<small
								v-if="error && error.errors.email"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.email[0] }}
							</small>
						</div>

						<div class="form-group col-6">
							<label
								>Classification
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.classification &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="classification"
							/>
							<small
								v-if="error && error.errors.classification"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.classification[0] }}
							</small>
						</div>

						<div class="form-group col-5">
							<label
								>Tel No.
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.tel_no &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="tel_no"
							/>
							<small
								v-if="error && error.errors.tel_no"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.tel_no[0] }}
							</small>
						</div>

						<div class="form-group col-5">
							<label>Tel No Alt.</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.tel_no_alt &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="tel_no_alt"
							/>
							<small
								v-if="error && error.errors.tel_no_alt"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.tel_no_alt[0] }}
							</small>
						</div>

						<div class="col-md-7">
							<label for=""
								>Address
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								name=""
								:class="[
									error &&
										error.errors.address &&
										'is-invalid',
								]"
								id=""
								class="form-control"
								v-model="address"
							></textarea>
							<small
								v-if="error && error.errors.address"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.address[0] }}
							</small>
						</div>
					</div>
				</div>

				<hr />

				<div class="row">
					<div class="col-4">
						<h5 class="h5">Social Media</h5>
						<label for="">
							You can change your avatar here or remove the
							current avatar to revert to gravatar.com
						</label>
					</div>

					<div class="row col-8">
						<div class="form-group col-6">
							<label>Website</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.website &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="website"
							/>
							<small
								v-if="error && error.errors.website"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.website[0] }}
							</small>
						</div>
						<!-- <div class="error">{{ error }}</div> -->
						<div class="form-group col-6">
							<label for="">Facebook</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.facebook &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. John Doe"
								v-model="facebook"
							/>
							<small
								v-if="error && error.errors.facebook"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.facebook[0] }}
							</small>
						</div>

						<div class="form-group col-6">
							<label>Twitter</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.twitter &&
										'is-invalid',
								]"
								id=""
								aria-describedby="emailHelp"
								placeholder="Ex. johndoe@example.com "
								v-model="twitter"
							/>
							<small
								v-if="error && error.errors.twitter"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.twitter[0] }}
							</small>
						</div>
					</div>
				</div>
				<hr />
				<div class="row col-12">
					<input
						type="submit"
						class="btn btn-custom-success"
						v-if="!isPending"
						value="Save"
					/>
					<button
						class="btn btn-custom-success"
						v-if="isPending"
						disabled
					>
						Loading ...
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
// import axios from 'axios';
import { ref, onUnmounted } from "vue";
import useCreate from "../../composables/useCreate";
import feather from "feather-icons";
import Alert from "../../components/Alert";
export default {
	name: "CreateCompany",
	components: {
		Alert,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	// data() {
	//   return {
	//     selectedFile: null
	//   }
	// },
	// methods: {
	//   onFileChange(e) {
	//     this.selectedFile = e.target.files[0];

	//   },
	//   onUpload() {
	//     const fd = new FormData();
	//     fd.append("code", "John");
	//     // fd.append("name", "John");
	//     fd.append("address", "John");
	//     fd.append("vat_reg", "MSSC2022");
	//     fd.append("classification", "John");
	//     fd.append("tel_no", "MSSC2022");
	//     // axios.common.headers['Accept'] = 'application/json';
	//     fd.append('image_path', this.selectedFile);
	//     axios.post('https://payroll-ent-cloud.herokuapp.com/api/setupcompany', fd)
	//     .then(res => console.log(res))
	//     .catch(err => console.log(err.response.data));

	//     console.log(fd);
	//   }
	// }
	setup() {
		const { response, error, create, isPending } = useCreate();

		const name = ref("");
		const code = ref("");
		const vat_reg = ref("");
		const tel_no = ref("");
		const tel_no_alt = ref("");
		const email = ref("");
		const website = ref("");
		const facebook = ref("");
		const twitter = ref("");
		const address = ref("");
		const classification = ref("");

		onUnmounted(() => {
			error.value = null;
			response.value = null;
		});

		const handleSubmit = async () => {
			const data = {
				name: name.value,
				code: code.value,
				facebook: facebook.value,
				twitter: twitter.value,
				vat_reg: vat_reg.value,
				tel_no: tel_no.value,
				tel_no_alt: tel_no_alt.value,
				email: email.value,
				website: website.value,
				address: address.value,
				classification: classification.value,
			};

			await create("setupcompany", data);

			if (!error.value) {
				name.value = "";
				code.value = "";
				address.value = "";
				classification.value = "";
			} else {
				window.scrollTo(0, 0);
			}
		};

		const handleCloseModal = () => {
			error.value.message = null;
			response.value = "";
		};

		return {
			handleSubmit,
			code,
			email,
			name,
			tel_no,
			tel_no_alt,
			website,
			facebook,
			twitter,
			vat_reg,
			address,
			classification,
			error,
			isPending,
			response,
			handleCloseModal,
		};
	},
};
</script>
