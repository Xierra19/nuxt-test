<script setup lang="ts">
import { object, string } from 'yup'

const schema = object({
  username: string().min(4, 'Must be at least 4 characters').required('Required'),
  password: string().min(4, 'Must be at least 4 characters').required('Required')
})

const state = reactive({
  username: '',
  password: ''
})

const errorMessage = ref('')
const isSubmitting = ref(false)

async function onSubmit() {
  if (isSubmitting.value) {
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await schema.validate(state, { abortEarly: false })
    await $fetch('/api/login', {
      method: 'POST',
      body: state
    })

    await navigateTo('/home')
  } catch (error: any) {
    const message = error?.response?._data?.statusMessage
      || error?.response?._data?.message
      || error?.errors?.[0]
      || error?.message
      || 'Login failed'
    errorMessage.value = message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="auth-page flex min-h-screen items-center justify-center px-4 py-10">
    <UCard class="auth-card w-full max-w-md border border-sky-100 bg-white/90 shadow-2xl backdrop-blur-sm">
      <template #header>
        <div class="text-center">
          <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
            L
          </div>
          <h1 class="text-2xl font-bold text-slate-800">Login</h1>
          <p class="mt-1 text-sm text-slate-500">Welcome back</p>
        </div>
      </template>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <UFormGroup label="Username" name="username" class="text-slate-700">
          <UInput v-model="state.username" placeholder="admin or employee" class="!bg-slate-50 !text-slate-800" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="text-slate-700">
          <UInput v-model="state.password" type="password" placeholder="admin or employee" class="!bg-slate-50 !text-slate-800" />
        </UFormGroup>

        <p v-if="errorMessage" class="text-sm font-medium text-red-500">{{ errorMessage }}</p>

        <UButton
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-500/30 hover:from-sky-500 hover:to-indigo-500"
        >
          {{ isSubmitting ? 'Signing in...' : 'Login' }}
        </UButton>
      </form>
    </UCard>
  </div>
</template>
