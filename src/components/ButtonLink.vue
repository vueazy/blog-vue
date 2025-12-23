<script setup lang="ts">
import Button from './ui/button/Button.vue'

defineProps({
  to: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <router-link :to="to">
    <Button :variant="variant" class="cursor-pointer">
      <slot />
    </Button>
  </router-link>
</template>
