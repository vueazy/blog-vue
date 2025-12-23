<script setup>
import Datatable from '@/components/Datatable.vue'
import { PlusIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { useTagsStore } from '@/stores/TagsStore'

const tagsStore = useTagsStore()
tagsStore.fetchTags()
tagsStore.fetchDatatableColumns()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>Tags Data</span>
        <Button variant="outline">
          <PlusIcon />
          Create Tags
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Datatable :data="tagsStore.tags" :columns="tagsStore.columns" />
    </CardContent>
  </Card>
</template>
