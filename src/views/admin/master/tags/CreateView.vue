<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import ButtonLink from '@/components/ButtonLink.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FieldGroup from '@/components/ui/field/FieldGroup.vue'
import Field from '@/components/ui/field/Field.vue'
import FieldLabel from '@/components/ui/field/FieldLabel.vue'
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FieldError from '@/components/ui/field/FieldError.vue'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    slug: '',
  },
})

const onSubmit = handleSubmit((data) => {
  console.log(data)
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
        <div class="grid grid-cols-2 gap-4 mb-5">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="name">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="name">Name</FieldLabel>
                <Input id="name" type="text" v-bind="field" :aria-invalid="!!errors.length" />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="slug">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="slug">Slug</FieldLabel>
                <Input id="slug" type="text" v-bind="field" :aria-invalid="!!errors.length" />
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
          <Button type="submit" class="cursor-pointer">Submit</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
