import { defineStore } from 'pinia'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { Edit } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'
import apiClient from '@/services/api'

export let useTagsStore = defineStore('tags', {
  state() {
    return {
      columns: [],
      tags: [],
    }
  },

  actions: {
    async fetchTags(current_page) {
      const response = await apiClient.get('/tag', {
        params: {
          page: current_page,
        },
      })
      this.tags = response.data.data
    },

    fetchDatatableColumns() {
      this.columns = [
        {
          accessorKey: 'name',
          header: ({ column }) => {
            return h(
              Button,
              {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
              },
              () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
            )
          },
          cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name')),
        },
        {
          accessorKey: 'slug',
          header: 'Slug',
          cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('slug')),
        },
        {
          accessorKey: 'action',
          header: () => h('div', { class: 'text-right' }, 'Action'),
          cell: ({ row }) => {
            return h('div', { class: 'flex gap-2 justify-end' }, [
              h(
                Button,
                {
                  onClick: () => console.log(row.original.id),
                },
                () => [h(Edit)],
              ),
              h(
                Button,
                {
                  variant: 'destructive',
                  onClick: () => console.log(row.original.id),
                },
                () => [h(Trash2)],
              ),
            ])
          },
        },
      ]
    },
  },
})
