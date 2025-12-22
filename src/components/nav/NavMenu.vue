<script setup>
import { IconChevronRight } from '@tabler/icons-vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <SidebarMenu>
        <template v-for="item in items" :key="item.title">
          <!-- Item with children (Collapsible) -->
          <Collapsible
            v-if="item.children"
            as-child
            :default-open="item.isActive"
            class="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger as-child>
                <SidebarMenuButton :tooltip="item.title">
                  <component :is="item.icon" v-if="item.icon" />
                  <span>{{ item.title }}</span>
                  <IconChevronRight
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="subItem in item.children" :key="subItem.title">
                    <SidebarMenuSubButton as-child :is-active="subItem.isActive">
                      <router-link :to="subItem.url">
                        <component :is="subItem.icon" v-if="subItem.icon" />
                        <span>{{ subItem.title }}</span>
                      </router-link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <!-- Single Item -->
          <SidebarMenuItem v-else>
            <SidebarMenuButton as-child :tooltip="item.title" :is-active="item.isActive">
              <router-link :to="item.url">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </template>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
