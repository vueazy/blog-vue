import { defineStore } from 'pinia'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'
import { Edit } from 'lucide-vue-next'
import { Trash2 } from 'lucide-vue-next'
import apiClient from '@/services/api'
import router from '@/router'
import { toast } from 'vue-sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export let useTagsStore = defineStore('tags', {
  state() {
    return {
      columns: [],
      tags: [],
      tag: {},
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

    async fetchTag(id) {
      const response = await apiClient.get(`/tag/${id}`)
      this.tag = response.data.data
    },

    async createTags(data) {
      try {
        await apiClient.post('/tag', data)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async editTags(id, data) {
      try {
        await apiClient.post(`/tag/${id}`, data)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async deleteTags(id) {
      try {
        await apiClient.delete(`/tag/${id}`)
      } catch (error) {
        console.log(error)
        throw error
      }
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
          cell: ({ row }) => h('div', { class: '' }, row.getValue('name')),
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
                  onClick: () =>
                    router.push({
                      name: 'admin.master.tags.edit',
                      params: { id: row.original.id },
                    }),
                  class: 'cursor-pointer',
                },
                () => [h(Edit)],
              ),
              h(
                AlertDialog,
                {},
                {
                  default: () => [
                    h(AlertDialogTrigger, { asChild: true }, () => [
                      h(
                        Button,
                        {
                          variant: 'destructive',
                          class: 'cursor-pointer',
                        },
                        () => [h(Trash2)],
                      ),
                    ]),
                    h(AlertDialogContent, {}, () => [
                      h(AlertDialogHeader, {}, () => [
                        h(AlertDialogTitle, {}, () => 'Are you absolutely sure?'),
                        h(
                          AlertDialogDescription,
                          {},
                          () =>
                            'This action cannot be undone. This will permanently delete the tag.',
                        ),
                      ]),
                      h(AlertDialogFooter, {}, () => [
                        h(AlertDialogCancel, {}, () => 'Cancel'),
                        h(
                          AlertDialogAction,
                          {
                            onClick: async () => {
                              try {
                                await this.deleteTags(row.original.id)
                                await this.fetchTags()
                                toast.success('Tag deleted successfully')
                                router.push({ name: 'admin.master.tags' })
                              } catch (error) {
                                console.error(error)
                                toast.error('Tag deleted failed')
                              }
                            },
                            class: 'cursor-pointer',
                          },
                          () => 'Continue',
                        ),
                      ]),
                    ]),
                  ],
                },
              ),
            ])
          },
        },
      ]
    },
  },
})
