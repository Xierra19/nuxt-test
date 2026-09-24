<script setup lang="ts">
const { data: user } = await useFetch('/api/me')

async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  await navigateTo('/login')
}
</script>

<template>
  <div class="auth-page flex min-h-screen items-center justify-center px-4 py-10">
    <UCard class="auth-card w-full max-w-lg border border-sky-100 bg-white/90 shadow-2xl backdrop-blur-sm">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.2em] text-sky-500">Dashboard</p>
            <h1 class="text-2xl font-bold text-slate-800">Home Page</h1>
          </div>
          <UButton color="red" variant="soft" class="bg-red-50 text-red-600 hover:bg-red-100" @click="logout">Logout</UButton>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-lg text-slate-700">
          Welcome back, <span class="font-semibold text-sky-600">{{ user?.username }}</span>!
        </p>

        <div class="flex gap-3">
          <NuxtLink v-if="user?.role === 'admin'" to="/admin">
            <UButton class="bg-gradient-to-r from-slate-800 to-slate-700 text-white">Admin Dashboard</UButton>
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>
