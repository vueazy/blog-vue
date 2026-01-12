<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import ButtonLink from '@/components/ButtonLink.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FieldGroup from '@/components/ui/field/FieldGroup.vue'
import Field from '@/components/ui/field/Field.vue'
import FieldLabel from '@/components/ui/field/FieldLabel.vue'
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FieldError from '@/components/ui/field/FieldError.vue'
import { ref } from 'vue'
import ButtonSubmit from '@/components/ButtonSubmit.vue'
import { useTagsStore } from '@/stores/master/TagsStore'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const tagsStore = useTagsStore()
const router = useRoute()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    slug: '',
  },
})

const isLoading = ref(false)

const onSubmit = handleSubmit((data) => {
  isLoading.value = true

  try {
    tagsStore.createTags(data)

    isLoading.value = false

    resetForm({
      values: {
        name: '',
        slug: '',
      },
    })

    router.push('/admin/master/tags')

    toast('Tags created successfully')
  } catch (error) {
    console.log(error)
    toast(error.response.statusText)
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        <span>Create Tags Data</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form v-on:submit="onSubmit">
        <div class="mb-5">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="name">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="name">Name</FieldLabel>
                <Input id="name" type="text" v-bind="field" :aria-invalid="!!errors.length" />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
        </div>
        <div class="flex justify-end gap-2">
          <ButtonLink to="/admin/master/tags" variant="destructive">
            <ArrowLeft />
            Back
          </ButtonLink>
          <ButtonSubmit :is-loading="isLoading" label="Submit" />
        </div>
      </form>
    </CardContent>
  </Card>
</template>
