<template>
  <div v-if="status === 'error'" class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error! </strong> {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeModal">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div v-if="status === 'success'" class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success! </strong> {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeModal">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div v-if="status === 'warning'" class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Success! </strong> {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeModal">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  <div v-if="status === 'info'" class="alert alert-info alert-dismissible fade show" role="alert">
    <strong>Success! </strong> {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeModal">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
    name: "Alert",
    props: ["message", "status"],
    emits: ["closeModal"],
    setup(props, { emit }) {



      const closeModal = () => {
        emit('closeModal');
      }

      return { closeModal }
    },
}
</script>

<style>

</style>