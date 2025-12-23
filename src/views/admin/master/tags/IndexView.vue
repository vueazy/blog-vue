<script setup>
import { PlusIcon } from 'lucide-vue-next'
import { useTagsStore } from '@/stores/TagsStore'

import Datatable from '@/components/Datatable.vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import ButtonLink from '@/components/ButtonLink.vue'

const tagsStore = useTagsStore()
tagsStore.fetchTags()
tagsStore.fetchDatatableColumns()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>Tags Data</span>
        <ButtonLink to="/admin/master/tags/create" variant="outline">
          <PlusIcon />
          Create Tags
        </ButtonLink>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Datatable :data="tagsStore.tags" :columns="tagsStore.columns" />
    </CardContent>
  </Card>
</template>
