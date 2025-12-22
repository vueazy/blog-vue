<script setup lang="ts">
import AdminSidebarLayout from '@/layouts/AdminSidebarLayout.vue'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import BreadcrumbPanel from '@/components/BreadcrumbPanel.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const collectCurrentRouteName = computed(() => {
  const currentRouteName = route.name.toString()
  const routeParts = currentRouteName.split('.')

  return routeParts.map((item, index) => {
    const urlParts = routeParts.slice(0, index + 1)
    const url = '/' + urlParts.join('/')

    return {
      name:
        item.replace('admin', 'home').charAt(0).toUpperCase() +
        item.replace('admin', 'home').slice(1),
      url: url,
    }
  })
})
</script>

<template>
  <SidebarProvider>
    <AdminSidebarLayout />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <BreadcrumbPanel :items="collectCurrentRouteName" />
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
