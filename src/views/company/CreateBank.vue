<template>
    <div class="row">
        <div class="col-4">
            <h5 class="h5">Other Conributon Details</h5>
                <label for="">
                    You can change your avatar here or remove the
                    current avatar to revert to gravatar.com
                </label>
        </div>
        <div class="row col-8">

            <div class="form-group col-3">
                <label>Code</label>
                <input
                    type="text"
                    class="form-control"
                    :class="[
                        error &&
                            error.errors.alphalist_no &&
                            'is-invalid',
                    ]"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Ex. "
                    v-model="item.alphalist_no"
                />
                <small
                    v-if="error && error.errors.alphalist_no"
                    id="emailHelp"
                    class="form-text text-danger"
                >
                    {{ error.errors.alphalist_no[0] }}
                </small>
            </div>

            <div class="form-group col-5">
                <label>Account Name</label>
                <input
                    type="text"
                    class="form-control"
                    :class="[
                        error &&
                            error.errors.alphalist_no &&
                            'is-invalid',
                    ]"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Ex. "
                    v-model="item.alphalist_no"
                />
                <small
                    v-if="error && error.errors.alphalist_no"
                    id="emailHelp"
                    class="form-text text-danger"
                >
                    {{ error.errors.alphalist_no[0] }}
                </small>
            </div>

            <div class="form-group col-2">
                <label>Currency</label>
                <input
                    type="text"
                    class="form-control"
                    :class="[
                        error &&
                            error.errors.alphalist_no &&
                            'is-invalid',
                    ]"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Ex. "
                    v-model="item.alphalist_no"
                />
                <small
                    v-if="error && error.errors.alphalist_no"
                    id="emailHelp"
                    class="form-text text-danger"
                >
                    {{ error.errors.alphalist_no[0] }}
                </small>
            </div>

            <div class="form-group col-2">
                <label>Amount</label>
                <input
                    type="text"
                    class="form-control"
                    :class="[
                        error &&
                            error.errors.alphalist_no &&
                            'is-invalid',
                    ]"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Ex. "
                    v-model="item.alphalist_no"
                />
                <small
                    v-if="error && error.errors.alphalist_no"
                    id="emailHelp"
                    class="form-text text-danger"
                >
                    {{ error.errors.alphalist_no[0] }}
                </small>
            </div>

            <div class="form-group col-12">
                <label>Description</label>
                <input
                    type="text"
                    class="form-control"
                    :class="[
                        error &&
                            error.errors.alphalist_no &&
                            'is-invalid',
                    ]"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Ex. "
                    v-model="item.alphalist_no"
                />
                <small
                    v-if="error && error.errors.alphalist_no"
                    id="emailHelp"
                    class="form-text text-danger"
                >
                    {{ error.errors.alphalist_no[0] }}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>