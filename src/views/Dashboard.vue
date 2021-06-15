<template>
  <div class="dashboard">
    <transition name="alert">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Welcome! </strong> {{ user.full_name }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.getUser);
    return {
      // access a getter in computed function
      user
    }
  },
}
</script>
