import { defineStore } from 'pinia'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { Edit } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'

export let useTagsStore = defineStore('tags', {
  state() {
    return {
      columns: [],
      tags: [],
    }
  },

  actions: {
    fetchTags() {
      this.tags = [
        { id: '1', name: 'Tag 1', slug: 'tag-1', created_at: '2025-12-08 04:20:04' },
        { id: '2', name: 'Tag 2', slug: 'tag-2', created_at: '2025-12-07 04:20:04' },
      ]
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
          accessorKey: 'created_at',
          header: 'Created At',
          cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('created_at')),
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
