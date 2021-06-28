<template>
	<div
		class="modal fade"
		id="create-signatory-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						New Signatory
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="row">
						<div class="form-group col-5">
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

						<div class="form-group col-7">
							<label>
								Name
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

						<div class="form-group col-md-12">
							<label for=""
								>Description
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

				<div class="modal-footer">
					<button type="button" class="btn btn-custom-success">
						Save
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CreateSignatory",
};
</script>

<style></style>
