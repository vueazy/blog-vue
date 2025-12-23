<script setup>
import Button from '@/components/ui/button/Button.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Submit',
  },
})
</script>

<template>
  <Button type="submit" class="cursor-pointer" v-if="!isLoading">{{ label }}</Button>
  <Button variant="outline" disabled v-else>
    <Spinner class="animate-spin" />
    {{ label }}
  </Button>
</template>
