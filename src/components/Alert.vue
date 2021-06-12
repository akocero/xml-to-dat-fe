<template>
  <div :class="'alert alert-'+ alertType" class="alert-dismissible fade show" role="alert">
    <strong>{{status.charAt(0).toUpperCase() + status.slice(1)}}! </strong> {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeModal">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import {ref } from 'vue'
export default {
    name: "Alert",
    props: ["message", "status"],
    emits: ["closeModal"],
    setup(props, { emit }) {

      const alertType = ref('');

      if(props.status === 'error'){
        alertType.value = 'danger'
      }else if(props.status === 'success'){
        alertType.value = 'success'
      }else if(props.status === 'warning'){
        alertType.value = 'warning'
      }else {
        alertType.value = 'info'
      }
      

      const closeModal = () => {
        emit('closeModal');
      }

      return { closeModal, alertType }
    },
}
</script>

<style>

</style>