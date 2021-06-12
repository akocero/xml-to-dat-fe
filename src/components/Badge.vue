<template>

  <span v-if="badge === 'success'" class="custom-badge" :class="'custom-badge-' + badge"> {{ type }}</span>
  <span v-else class="custom-badge" :class="'custom-badge-' + badge"> {{ type }}</span>

  <!-- <span class="custom-badge" :class="[item.login_type === 'Admin' ? 'custom-badge-success' : 'custom-badge-warning']">  {{ item.login_type }}</span> -->
</template>

<script>
export default {
    name: 'Badge',
    props: ['type', 'badge'],
}
</script>